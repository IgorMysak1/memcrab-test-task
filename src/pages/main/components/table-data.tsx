import { Button, Table, TableBody, TableHead } from '../../../UI'
import { ID, Row, TABLE_ATTRIBUTES, TABLE_CELL, TABLE_FIELDS } from '../../../types'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { SettingsData } from '../types.ts'
import {
  generateHeader,
  generateTable,
  createRow,
  increaseNumberInCell,
  highlightNearestValues,
  resetNearestValues,
  changeToPercentage,
  resetPercentages,
} from '../utils'
import { getListOfIdsNearestValue } from '../utils/table-events.ts'
import { useDebounce } from '../../../hook'
import { buildTable } from '../utils/build-table.ts'

interface TableDataProps {
  tableSettings: SettingsData
}

export const TableData = ({ tableSettings }: TableDataProps) => {
  const [header, setHeader] = useState<string[]>([])
  // In table state is saved generated numbers cells without sum/remove columns and label/average row columns
  const [table, setTable] = useState<Row[]>([])

  useEffect(() => {
    const { row, column } = tableSettings
    const newTable = generateTable(row, column)
    setTable(newTable)
    setHeader(generateHeader(column))
  }, [tableSettings])
  const addRow = () => {
    const newRow = createRow(tableSettings.column)
    setTable([...table, newRow])
  }
  const handleMouseMove = (value: number, cellId: TABLE_CELL, rowId: TABLE_FIELDS) => {
    setTable(prevState => resetPercentages(prevState))
    setTable(prevState => resetNearestValues(prevState))
    if (cellId && cellId.includes(TABLE_CELL.SUM)) {
      setTable(prevState => changeToPercentage(prevState, rowId))
      return
    }
    if (!tableSettings.amountOfNearestNumber) return
    if (cellId && cellId.includes(TABLE_CELL.GENERATED_VALUE)) {
      const nearestCellIds = getListOfIdsNearestValue(
        value,
        table,
        // Plus 1 in order to highlight hovered cell as well
        tableSettings.amountOfNearestNumber + 1,
      )
      setTable(prevState => highlightNearestValues(prevState, nearestCellIds))
    }
  }
  const debouncedMove = useDebounce(handleMouseMove, 250)
  const handleTableClick = (rowId: ID, cellId: ID) => {
    if (cellId && cellId.includes(TABLE_CELL.REMOVE)) {
      if (table.length <= 1) return
      const newTable = table.filter(row => row.id !== rowId)
      setTable(newTable)
    }
    if (rowId && cellId) {
      setTable(prevData => increaseNumberInCell(prevData, rowId, cellId))
    }
  }

  const tableEvents = (event: React.MouseEvent<HTMLTableElement>) => {
    const target = event.target as HTMLElement
    const value = +(target?.textContent ?? 0)
    const rowId = target.getAttribute(TABLE_ATTRIBUTES.DATA_ROW_ID) as TABLE_FIELDS
    const cellId = target.getAttribute(TABLE_ATTRIBUTES.DATA_CELL_ID) as TABLE_CELL
    if (event.type === 'mousemove') {
      debouncedMove(value, cellId, rowId)
      return
    }
    if (event.type === 'click') {
      handleTableClick(rowId, cellId)
    }
  }

  return (
    <Container>
      <Button style={{ width: 'fit-content' }} onClick={addRow}>
        Add a row
      </Button>
      <Table onClick={tableEvents} onMouseMove={tableEvents}>
        <TableHead cells={header} />
        <TableBody rows={buildTable(table, tableSettings.column)} />
      </Table>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
