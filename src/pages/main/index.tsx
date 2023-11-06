import styled from 'styled-components'
import { TableSettings, TableData } from './components'
import { SettingsData } from './types.ts'
import { useState } from 'react'
import { breakpoints } from '../../constants'

export const MainPage = () => {
  const [tableSettings, setTableSettings] = useState<SettingsData | null>(null)

  return (
    <>
      <MobileScreens>This website does not support mobile screens</MobileScreens>
      <DesktopPage>
        <Title>
          Choose the rows and columns of the table, along with the number of closest values to the
          chosen number.
        </Title>
        <TableSettings onGenerate={setTableSettings} />
        {tableSettings ? (
          <TableData tableSettings={tableSettings} />
        ) : (
          'Select values in ranges and generate a table'
        )}
      </DesktopPage>
    </>
  )
}

const DesktopPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 50px 0;
  @media (max-width: ${breakpoints.md}px) {
    display: none;
  }
`

const MobileScreens = styled.p`
  font-size: 24px;
  text-align: center;
  padding-top: 400px;
  @media (min-width: ${breakpoints.md}px) {
    display: none;
  }
`

const Title = styled.h1`
  width: 70%;
  margin: 0 auto;
  text-align: center;
`
