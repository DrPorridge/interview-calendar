import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

const TableDataTd = styled.td`
  position: relative;
  padding: 0px;
  text-align: center;
  cursor: pointer;
  background-color: ${({ hasInterview }) => (hasInterview ? 'rgba(106, 90, 205, 0.34)' : 'transparent')};
  border-bottom: 2px solid rgba(128, 128, 128, 0.5);
  border-right: 2px solid rgba(128, 128, 128, 0.5);
  width: 12.5%;
  height: 60px;
  ${({ isSelected }) => isSelected && 'border: 1px solid red;'}
  ${({ isSelected }) => isSelected && 'background-color: rgba(156, 140, 255, 0.9);'} 
  box-sizing: border-box;
`;

export default function TableData({ interviewCell, onSelect}) {
  const [interview,setInterview]=useState(interviewCell)

  useEffect(()=>{
    setInterview(interviewCell)
  },[interviewCell])

  const handleClickTableData = (e) => {
    e.stopPropagation();
    if(interview.scheduled==true){
      const newInterview = {
        ...interview,
        isSelected: !interview.isSelected
      };
      setInterview(newInterview);
      if (newInterview.isSelected) {
        onSelect(newInterview);
      }
    }
    else{
      onSelect(null)
    }
  };

  return (
    <TableDataTd key={`${interview}`} onClick={handleClickTableData} isSelected={interview.isSelected} hasInterview={interviewCell.scheduled}>
    </TableDataTd>
  );
}
