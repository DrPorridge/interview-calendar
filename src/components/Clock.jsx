import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TimeContainer = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: red;
`;

export default function Clock() {
    const [currentTime, setCurrentTime] = useState('');
  
    useEffect(() => {
      const updateTime = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const formattedTime = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
        setCurrentTime(formattedTime);
      };

      const intervalId = setInterval(updateTime, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }, []);
  
    return (
      <TimeContainer >
        Today: {currentTime}
      </TimeContainer>
    );
  }
