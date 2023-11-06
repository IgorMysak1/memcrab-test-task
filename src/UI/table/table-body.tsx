import { Cell, Row } from '../../types'
import styled from 'styled-components'
import { roundNumber } from '../../utils'

interface TableBodyProps {
  rows: Row[]
}

export const TableBody = ({ rows }: TableBodyProps) => {
  const contentCell = ({ showInPercentage, percentage, data }: Cell) => {
    if (percentage && showInPercentage) {
      return roundNumber(percentage) + '%'
    }
    if (typeof data === 'number') {
      return roundNumber(data)
    }
    return data
  }

  return (
    <tbody>
      {rows.map(({ id: rowId, cells }) => (
        <tr key={rowId}>
          {cells.map(cell => (
            <TD
              nearest={cell.isTheNearest.toString()} // Styled components specific
              key={cell.id}
              data-row-id={rowId}
              data-cell-id={cell.id}
            >
              {contentCell(cell)}
            </TD>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

const TD = styled.td<{ nearest: string }>`
  padding: 8px 12px;
  border: 1px solid #e1e1e1;
  text-align: center;
  cursor: pointer;
  background: ${({ nearest }) => (nearest === 'true' ? '#f47c48' : 'transparent')};
  color: ${({ nearest }) => (nearest === 'true ' ? '#fff' : '#000')};

  overflow: hidden;
  text-overflow: ellipsis;
`
