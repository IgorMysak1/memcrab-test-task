import { ID, Row } from '../../../types'

export const increaseNumberInCell = (
  table: Row[],
  rowId: ID,
  cellId: ID,
  numberToIncrease: number = 1,
) => {
  return table.map(row =>
    row.id === rowId
      ? {
          ...row,
          cells: row.cells.map(cell => {
            return cell.id === cellId && typeof cell.data === 'number'
              ? {
                  ...cell,
                  data: cell.data + numberToIncrease,
                }
              : cell
          }),
        }
      : row,
  )
}

export const highlightNearestValues = (table: Row[], nearestCellIds: string[]) => {
  return table.map(row => ({
    ...row,
    cells: row.cells.map(cell => ({
      ...cell,
      isTheNearest: nearestCellIds.includes(cell.id),
    })),
  }))
}

export const resetNearestValues = (table: Row[]) => {
  return table.map(row => ({
    ...row,
    cells: row.cells.map(cell => ({
      ...cell,
      isTheNearest: false,
    })),
  }))
}

export const changeToPercentage = (list: Row[], rowId: string) => {
  return list.map(row =>
    row.id === rowId
      ? {
          ...row,
          cells: row.cells.map(cell => ({
            ...cell,
            showInPercentage: typeof cell.data === 'number',
          })),
        }
      : row,
  )
}
export const resetPercentages = (list: Row[]) => {
  return list.map(row => ({
    ...row,
    cells: row.cells.map(cell => ({ ...cell, showInPercentage: false })),
  }))
}
