import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import TableData from './TableData';

const TableRow=styled.tr`
  width:100%;
`
const TimeColumn = styled.td`
  text-align: center;
  border-top: none;
  position: relative;
  width:90.25px;
  @media (max-width: 740px) {
    min-width:60px;
  }

  @media (max-width: 400px) {
    width:50px;
  }
`;

const TimeText = styled.p`
  position: absolute;
  font-size:19px;
  top: -32px;
  left: 32px;
  z-index: 2;
  color: rgba(128, 128, 128, 0.5);
  @media (max-width: 740px) {
    font-size: 20px;
    top: -32px;
    left: 14px;
  }

  @media (max-width: 493px) {
    font-size: 14px;
    top: -25px;
    left: 19px;
  }

`;

export default function TableRowData({rowData,onSelect,interviews,first}) {
  return (
    <TableRow key={`row-${rowData[0]?.row}`}>
      <TimeColumn>
      <TimeText>{!first && rowData[0]?.time}</TimeText>
      </TimeColumn>
      {rowData.map((item,index)=>{return <TableData
        key={`cell-${item.row}-${item.column}`}
        interviewCell={item.interview}
        interviews={interviews}
        onSelect={onSelect}
      />
      })
      }
    </TableRow>
  );
}
