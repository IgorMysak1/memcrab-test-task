import styled from 'styled-components'
import React from 'react'

type ButtonProps = React.ComponentProps<'button'>

export const Button = ({ children, ...rest }: ButtonProps) => (
  <StyledButton {...rest}>{children}</StyledButton>
)

const StyledButton = styled.button`
  background-color: #f47c48;
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d26c40;
  }

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
    &:hover {
      background-color: #f47c48;
    }
  }
`
