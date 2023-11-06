import { Row, TABLE_CELL } from '../../../types'
import { generateRandomNumber, generateRandomString } from '../../../utils'
import { TableSetup } from './table-setup.ts'

const TableSetupInstance = TableSetup.getInstance()

export const createRow = (columns: number): Row => {
  const cells = new Array(columns).fill('').map(() =>
    TableSetupInstance.getCell({
      id: `${TABLE_CELL.GENERATED_VALUE}_${generateRandomString()}`,
      data: generateRandomNumber(1, 1000),
    }),
  )
  return { id: generateRandomString(), cells }
}

export const generateTable = (rows: number, columns: number): Row[] => {
  return new Array(rows).fill('').map(() => createRow(columns))
}
