import React from 'react'
import styled from 'styled-components'

interface RangeProps extends React.ComponentProps<'input'> {
  label?: string
}

export const RangeInput = ({ label, value, ...rest }: RangeProps) => {
  return (
    <Container>
      {Label && <Label>{label}</Label>}
      <StyledRangeInput type="range" value={value} {...rest} />
      <Value>Value: {value}</Value>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Label = styled.span`
  padding-bottom: 10px;
`

const Value = styled.span`
  padding-top: 5px;
`

const StyledRangeInput = styled.input`
  width: 100%;
  :disabled {
    opacity: 0.8;
  }
`
