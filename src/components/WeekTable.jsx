import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TableRowData from './TableRowData';
import Interview from '../models/interview';

const TableContainer = styled.div`
  display: inline-block;
  width: 100%;
  height: 50vh;
  overflow-y: scroll;
  
  border-collapse: collapse;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Table = styled.table`
  width: 100%;
`;
const generateTimeSlots = () => {
  const timeSlots = [];
  for (let i = 8; i <= 20; i++) {
    timeSlots.push(`${i}:00`);
  }
  return timeSlots;
};

const timeSlots = generateTimeSlots();

const generateTableData = (weekDates, interviews) => {
  const newTableRowsData = [];
  for (let i = 0; i < timeSlots.length; i++) {
    const newRowsData = [];
    let timeString = timeSlots[i];
    for (let j = 0; j < weekDates.length; j++) {
      let date = new Date(weekDates[j]);
      let newInterview = new Interview(date, false);
      newInterview.setTime(timeString);
      const meetingInterview = interviews.find(item =>
        newInterview.compareDate(item.date)
      );
      if (meetingInterview != null) {
        newInterview.setScheduled(meetingInterview.date);
      }
      let rowData = {
        time: timeString,
        interview: newInterview,
        row: i,
        column: j
      };
      newRowsData.push(rowData);
    }
    newTableRowsData.push(newRowsData);
  }
  return newTableRowsData;
};


export default function WeekTable({ week, interviews, onChangeSelectDate }) {
  
  const [tableRowsData, setTableRowsData] = useState(() => {
    return generateTableData(week, interviews);
  });

  useEffect(()=>{ 
    const newTableData = generateTableData(week, interviews);
    setTableRowsData(newTableData)
  },[week,interviews])

  return (
    <TableContainer>
      <Table>
        <tbody>
          {tableRowsData.map((item,index)=>{return <TableRowData key={item.key} first={index === 0} rowData={item} onSelect={onChangeSelectDate} interviews={interviews}></TableRowData>})}
        </tbody>
      </Table>
    </TableContainer>
  );
}