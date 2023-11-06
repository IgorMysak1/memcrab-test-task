import styled from 'styled-components'
import { breakpoints } from '../../constants'

export const Wrapper = styled.div`
  min-height: 100vh;
  max-width: 1170px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: ${breakpoints.sm}px) {
    padding: 0 16px;
  }
`
