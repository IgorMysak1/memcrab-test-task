import { TableSetup } from './table-setup.ts'
import { Row, TABLE_CELL, TABLE_FIELDS } from '../../../types'
import { generateRandomString } from '../../../utils'

const TableSetupInstance = TableSetup.getInstance()

const addAverageRow = (table: Row[], columns: number) => {
  const rows = table.length
  const sumOfColumns = new Array(columns).fill(0)
  table.forEach(row => {
    row.cells.forEach((cell, columnIndex) => {
      if (typeof cell.data === 'number') {
        sumOfColumns[columnIndex] += cell.data
      }
    })
  })
  const sumOfAverageRows = sumOfColumns.reduce((acc, sumOfColumn) => acc + sumOfColumn / rows, 0)

  const averageRow = {
    id: TABLE_CELL.AVERAGE_VALUE,
    cells: [
      ...sumOfColumns.map(sumOfColumn =>
        TableSetupInstance.getCell({
          id: `${TABLE_CELL.AVERAGE_VALUE}_${generateRandomString()}`,
          data: Number.isNaN(sumOfColumn / rows) ? '' : sumOfColumn / rows,
          percentage: ((sumOfColumn / rows) * 100) / sumOfAverageRows,
        }),
      ),
    ],
  }

  return [...table, averageRow]
}

const addSumColumnInRow = (table: Row[]) => {
  return table.map(row => {
    const sumOfRow = row.cells.reduce(
      (acc, { data }) => (typeof data === 'number' ? acc + data : acc),
      0,
    )
    return {
      ...row,
      cells: [
        ...row.cells.map(cell => ({
          ...cell,
          percentage: typeof cell.data === 'number' ? (cell.data * 100) / sumOfRow : null,
        })),
        TableSetupInstance.getCell({
          id: `${TABLE_CELL.SUM}_${generateRandomString()}`,
          data: sumOfRow,
          percentage: 100,
        }),
      ],
    }
  })
}

export const buildTable = (table: Row[], columns: number): Row[] => {
  // To clean table, add sum column => add avg row => add remove column => add first column

  const emptyArray = new Array(table.length)

  const withSumColumn = addSumColumnInRow(table)

  const withAvgsAndSums = addAverageRow(withSumColumn, columns + 1) // Plus 1 in order to count sum

  const withFirstSumsAndRemoveColumns = TableSetupInstance.addColumnsAfterTable(withAvgsAndSums, [
    ...emptyArray.fill(TableSetupInstance.getCell(TableSetupInstance.getRemoveButtonCell())),
    TableSetupInstance.getBlankCell(),
  ])

  return TableSetupInstance.addColumnsBeforeTable(withFirstSumsAndRemoveColumns, [
    ...emptyArray.fill('').map((_, index) =>
      TableSetupInstance.getCell({
        id: generateRandomString(),
        data: `${TABLE_FIELDS.ROW} ${index + 1}`,
      }),
    ),
    TableSetupInstance.getAverageValueLabelCell(),
  ])
}
