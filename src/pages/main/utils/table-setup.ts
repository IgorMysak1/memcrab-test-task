import { generateRandomString } from '../../../utils'
import { Cell, Row, TABLE_CELL, TABLE_FIELDS } from '../../../types'

// Use Singleton pattern
export class TableSetup {
  private static instance: TableSetup

  defaultValuesForCell: Cell = {
    id: generateRandomString(),
    data: '',
    isTheNearest: false,
    showInPercentage: false,
    percentage: null,
  }
  private constructor() {}
  public static getInstance(): TableSetup {
    if (!TableSetup.instance) {
      TableSetup.instance = new TableSetup()
    }
    return TableSetup.instance
  }
  getCell(cell: Partial<Cell>) {
    return {
      ...this.defaultValuesForCell,
      ...cell,
    }
  }
  getBlankCell(): Cell {
    return {
      ...this.defaultValuesForCell,
      id: TABLE_CELL.BLANK,
      data: '',
    }
  }
  getAverageValueLabelCell(): Cell {
    return {
      ...this.defaultValuesForCell,
      id: TABLE_FIELDS.AVERAGE_VALUE,
      data: TABLE_FIELDS.AVERAGE_VALUE,
    }
  }
  getRemoveButtonCell(): Cell {
    return {
      ...this.defaultValuesForCell,
      id: `${TABLE_CELL.REMOVE}_${generateRandomString()}`,
      data: 'Remove',
    }
  }
  addColumnsBeforeTable(table: Row[], cellsInColumn: Cell[]) {
    return table.map((row, index) => ({
      ...row,
      cells: [cellsInColumn[index], ...row.cells],
    }))
  }
  addColumnsAfterTable(table: Row[], cellColumns: Cell[]) {
    return table.map((row, index) => ({
      ...row,
      cells: [...row.cells, cellColumns[index]],
    }))
  }
}
