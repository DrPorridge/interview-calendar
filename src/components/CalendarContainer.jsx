import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import WeekSelector from './WeekSelector';
import WeekTable from './WeekTable';

const StyleCalendarContainer = styled.div`
  font-family: 'Lato', sans-serif;
  font-weight: bold;
  font-size: 20px;
  
`;

const MainPanel=styled.div`
    display: flex;
    width:100%;
`;

const TimeHeaderColumn=styled.div`
    min-width:90.25px;
    padding:0px;
    background-color: #f1f1f1;

    @media (max-width: 740px) {
     min-width:70px;
    }

    @media (max-width: 493px) {
      min-width:62px;
    }

`;

export default function CalendarContainer({interviews,onChangeSelectDate})  {
    const [selectWeek,setSelectWeek]=useState([])

    const getSelectedWeek=(week)=>{
      setSelectWeek(week)
    }

  return (
   <StyleCalendarContainer>
    <MainPanel>
        <TimeHeaderColumn></TimeHeaderColumn>
        <WeekSelector onSetWeek={getSelectedWeek}></WeekSelector>
    </MainPanel>
    <WeekTable week={selectWeek} interviews={interviews} onChangeSelectDate={onChangeSelectDate}></WeekTable>
  </StyleCalendarContainer>
  )
}
