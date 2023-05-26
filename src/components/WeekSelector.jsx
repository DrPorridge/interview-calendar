import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #f1f1f1;
`;

const WeekDays = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 50px;
  margin-top: 10px;
  border-radius: 50%; 
`;

const Day = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  text-align: center;
  border-radius: 50%; 
  width:12.7%;
  @media (max-width: 740px) {
    font-size: 15px;
  }

  @media (max-width: 493px) {
    font-size: 11px;
  }

  @media (max-width: 247px) {
    font-size: 8px;
  }
`;

const Dates = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30px;
`;

const DateItem = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align:center;
  cursor: pointer;
  width:12.5%;

  > div {
    display: flex;
  align-items: center;
  justify-content: center;
    padding:3px;
    border-radius: 50%; 
    @media (max-width: 740px) {
      font-size: 15px;
    }
  
    @media (max-width: 493px) {
      font-size: 11px;
    }
  
    @media (max-width: 247px) {
      font-size: 7px;
    }

  }

  ${({ active }) =>
    active &&
    `
    
  `}
  ${({ today }) =>
    today &&
    `
    > div {
      background-color: red;
      color: white;
    }
  `}
`;

const MonthSelector = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 40px;
  height: 40px;
`;

const MonthTitle=styled.div`
display: flex;
justify-content: center;
align-items: center;
text-align: center;
`;

const ArrowButton = styled.button`
border: none;
cursor: pointer;
color: red;
font-size: 24px;
font-weight: bold;
width:90px;
text-align:center;
`;

export default function WeekSelector({onSetWeek}) {
  const getWeekDates = (date) => {
    const weekDates = [];
    const currentDate = new Date(date);
    const currentDayIndex = currentDate.getDay(); 
    const firstDayOfWeek = new Date(currentDate); 
    firstDayOfWeek.setDate(currentDate.getDate() - currentDayIndex);
    for (let i = 0; i < 7; i++) {
    const day = new Date(firstDayOfWeek);
    day.setDate(firstDayOfWeek.getDate() + i);
    weekDates.push(day);
  }
  return weekDates;
  };
  
  const [currentMonth, setCurrentMonth] = useState();
  const [Week, setWeek] = useState([]);
  const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const today = new Date();

  useEffect(()=>{
    let currentDay=new Date()
    let currentWeek= getWeekDates(currentDay)
    setWeek(currentWeek)
    setCurrentMonth(currentWeek[6])
    onSetWeek(currentWeek)
  },[])

  const handlePrevWeek = () => {
    const previousDate = new Date(Week[0])
    previousDate.setDate(Week[0].getDate() - 1)
    let prevWeek=getWeekDates(previousDate)
    setWeek(prevWeek);
    setCurrentMonth(prevWeek[6])
    onSetWeek(prevWeek)
  };

  const handleNextWeek = () => {
    const nextDate = new Date(Week[6])
    nextDate.setDate(Week[6].getDate() + 1)
    let nextWeek=getWeekDates(nextDate)
    setWeek(nextWeek);
    setCurrentMonth(nextWeek[6])
    onSetWeek(nextWeek)
  };

  return (
    <SliderContainer>
      <WeekDays>
        {weekdays.map(day => (
          <Day key={day}>{day}</Day>
        ))}
      </WeekDays>
      <Dates>
        {Week.map((date) => (
          <DateItem
          key={date.getDay()}
          active={date.getDay() === 1 && date.getDate() === today}
          today={
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
          }
        >
          <div>{date.getDate()}</div>
        </DateItem>
        ))}
      </Dates>
      <MonthSelector>
        <ArrowButton onClick={handlePrevWeek}>{'<'}</ArrowButton>
        <MonthTitle>{currentMonth?.toLocaleString('en-US', { month: 'long' })} {currentMonth?.getFullYear()}</MonthTitle>
        <ArrowButton onClick={handleNextWeek}>{'>'}</ArrowButton>
      </MonthSelector>
    </SliderContainer>
  );
}