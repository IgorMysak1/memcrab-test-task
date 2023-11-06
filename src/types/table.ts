export type ID = string
export interface Cell {
  id: ID
  data: string | number
  isTheNearest: boolean
  percentage: number | null
  showInPercentage: boolean
}

export interface Row {
  id: ID
  cells: Cell[]
}
