import { Button, RangeInput } from '../../../UI'
import styled from 'styled-components'
import React, { useState } from 'react'
import { SettingsData, TableSettingsValues } from '../types.ts'
import { initialTableSettings } from '../constsnts.ts'
import { breakpoints } from '../../../constants'

interface TableSettingsProps {
  onGenerate: (settings: SettingsData) => void
}

export const TableSettings = ({ onGenerate }: TableSettingsProps) => {
  const [tableSettings, setTableSettings] = useState<SettingsData>(initialTableSettings)

  const changeTableSettings = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: TableSettingsValues,
  ) => {
    const value = +event.target.value
    setTableSettings(prevState => {
      const ifResetNearestNumber = field !== 'amountOfNearestNumber' && !value
      return {
        ...prevState,
        // set amountOfNearestNumber to zero if column or row is became a zero
        amountOfNearestNumber: ifResetNearestNumber ? 0 : prevState.amountOfNearestNumber,
        [field]: value,
      }
    })
  }

  const columnAndRowIsInitial = !(tableSettings.column && tableSettings.row)
  return (
    <Container>
      <RangeWrapper>
        <RangeInput
          min={0}
          max={100}
          value={tableSettings.column}
          onChange={value => changeTableSettings(value, 'column')}
          label={'Choose the number of columns'}
        />
        <RangeInput
          min={0}
          max={100}
          value={tableSettings.row}
          onChange={value => changeTableSettings(value, 'row')}
          label={'Choose the number of rows'}
        />
        <RangeInput
          min={0}
          max={tableSettings.row * tableSettings.column}
          disabled={columnAndRowIsInitial}
          value={tableSettings.amountOfNearestNumber}
          onChange={value => changeTableSettings(value, 'amountOfNearestNumber')}
          label={'Choose the number of nearest number by hovering'}
        />
      </RangeWrapper>
      <Button disabled={columnAndRowIsInitial} onClick={() => onGenerate(tableSettings)}>
        Generate a table
      </Button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const RangeWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  padding: 50px 0;
  &.last {
    background: red;
  }
  @media (max-width: ${breakpoints.lg}px) {
    grid-template-columns: 1fr 1fr;
  }
`
