import styled from 'styled-components'

interface TableHeadProps {
  cells: string[]
}

export const TableHead = ({ cells }: TableHeadProps) => {
  return (
    <StyledTableHead>
      <tr>
        {cells.map(cell => (
          <th key={cell}>{cell}</th>
        ))}
      </tr>
    </StyledTableHead>
  )
}

const StyledTableHead = styled.thead`
  background-color: #f4f4f4;
  th {
    min-width: 100px;
    padding: 8px 12px;
    border: 1px solid #e1e1e1;
  }
`
