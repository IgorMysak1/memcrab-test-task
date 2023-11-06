import { Cell, Row } from '../../../types'

export const getListOfIdsNearestValue = (
  value: number,
  table: Row[],
  amountOfNearestNumber: number,
) => {
  const rows = table.map(row => nearestNumberInRow([...row.cells], value))

  return rows
    .flat()
    .filter(obj => typeof obj.data === 'number')
    .sort((a, b) => Math.abs((a.data as number) - value) - Math.abs((b.data as number) - value))
    .slice(0, amountOfNearestNumber)
    .map(({ id }) => id)
}

const nearestNumberInRow = (list: Cell[], target: number) =>
  list.sort((a, b) => Math.abs((a.data as number) - target) - Math.abs((b.data as number) - target))
