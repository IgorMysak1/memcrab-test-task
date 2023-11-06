import { TABLE_FIELDS } from '../../../types'

export const generateHeader = (columns: number) => {
  const generateColumns = new Array(columns)
    .fill('')
    .map((_, index) => `${TABLE_FIELDS.COLUMN} ${index + 1}`)
  return ['', ...generateColumns, TABLE_FIELDS.SUM_VALUES, TABLE_FIELDS.REMOVE]
}
