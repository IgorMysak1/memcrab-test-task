import styled from 'styled-components'
import React, { PropsWithChildren } from 'react'

export const Table = ({ children, ...rest }: PropsWithChildren<React.ComponentProps<'table'>>) => {
  return (
    <TableWrapper>
      <StyledTable {...rest}>{children}</StyledTable>
    </TableWrapper>
  )
}

const TableWrapper = styled.div`
  overflow: auto;
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`
