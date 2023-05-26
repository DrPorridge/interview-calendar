import React, { useState, useEffect } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import CalendarContainer from './components/CalendarContainer';
import Clock from './components/Clock';
import Interview from './models/interview';

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  font-family: 'Lato', sans-serif;
  heigth:15vh;
`;

const AdvertisingHeader=styled.header`
    display:flex;
    align-items: center;
    justify-content: space-around;
    margin-top:10px;
    padding-botom:2px;
`

const Title = styled.h1`
  font-size: 24px;
`;

const AddEventButton = styled.button`
  color: red;
  border: none;
  padding: 10px 20px;
  font-size: 32px;
  cursor: pointer;
  background-color: transparent;
`;

const Footer = styled.div`
  background-color: #f1f1f1;
  height: 15vh;
  display:flex;
  justify-content: space-around;
  align-items: center;
`;

const Today=styled.div`
font-weight: bold;
color: red;
`;

const DeleteButton=styled.button`
font-size: 24px;
font-weight: bold;
color: red;
border:none;
`;

const CalendarWrapper = styled.div`
  ${props =>
    props.fullWidth
      ? css`
          width: 100%;
          height: 100%;
          min-width:348px;
        `
      : css`
          width: 740px;
          height: 100%;
          margin: 0 auto;
          min-width:348px;
        `}
`;

const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [interviews,setInterviews]=useState([])
  const [selectInterview,setSelectInterview]=useState(null)
  const [dayInfo,setDayInfo]=useState('')
  

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const theme = {
    fullWidth: windowWidth <= 740,
  };

  const selectedEvent = (interview) => {
    if (interview !== null) {
      if (selectInterview === null && interview !== null) {
        setSelectInterview(interview);
        setDayInfo(getStringDateFormat(interview.date));
      } else {
        selectInterview.isSelected = false;
        setSelectInterview(interview);
        setDayInfo(getStringDateFormat(interview.date));
      }
    } else {
      if (selectInterview !== null) {
        selectInterview.isSelected = false;
      }
      setSelectInterview(interview);
    }
  };
   

  const getStringDateFormat=(date)=>{
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const year = date.getFullYear();
  
    const formattedDate = `${month} ${day} ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${year}`;
    return formattedDate;
  }

  const addInterview=(interview)=>{
    let newList=[...interviews]
    let checkInterview = newList.findIndex(item => item.compareDate(interview.date));
    if(checkInterview!=-1){
     let res= window.confirm('interview already scheduled, re-record?')
     if(res){
      newList.splice(checkInterview,1)
     }
    }
    newList.push(interview)
    setInterviews(newList)
  }

  const deleteInterview=(deleteInterview)=>{
     let newList=interviews.filter((item)=>{return (
      deleteInterview.date.getMonth() !== item.date.getMonth()||
      deleteInterview.date.getDate() !== item.date.getDate() ||
      deleteInterview.date.getHours() !== item.date.getHours()||
      deleteInterview.date.getFullYear() !== item.date.getFullYear() 
    )})
    setInterviews(newList)
  }

  const handleAddEvent = async () => {
    const newInterview = await prompt('Enter event time: YYYY-MM-DD HH:mm');
    if (newInterview !== null && newInterview !== '') {
      try {
        const [datePart, timePart] = newInterview.split(' ');
        const [year, month, day] = datePart.split('-').map(Number);
        const [hour, minute] = timePart.split(':').map(Number);
        const date = new Date(year, month - 1, day, hour, minute);
  
        if (
          date.getFullYear() === year &&
          date.getMonth() === month - 1 &&
          date.getDate() === day &&
          date.getHours() === hour &&
          date.getMinutes() === minute
        ) {
          addInterview(new Interview(date,true));
        } else {
          alert('Error: invalid date format');
        }
      } catch (e) {
        alert('Error: invalid date format');
      }
    }
  };

  const handleDeleteEvent=()=>{
    if(selectInterview!=null){
      deleteInterview(selectInterview)
      setSelectInterview(null)
    }
  }

  return (
    <ThemeProvider theme={theme} >
     <CalendarWrapper fullWidth={theme.fullWidth}>
     <AdvertisingHeader>
            <a href='https://docporridge.ru/'>DocPorridge.ru</a>
            <a href='https://myworkshift.ru/'>MyWorkShift.ru</a>
          </AdvertisingHeader>
        <Header>
          <Title>Interview Calendar</Title>
          <AddEventButton onClick={()=>{handleAddEvent()}}>+</AddEventButton>
        </Header>
        <CalendarContainer interviews={interviews} onChangeSelectDate={selectedEvent} />
        <Footer>
          {selectInterview==null?<Clock/>:<Today>
            <p>{dayInfo}</p>
            {selectInterview?.scheduled&&<p>meeting: {selectInterview.scheduledTime}</p>}
            </Today>}
          {selectInterview?.scheduled&&<DeleteButton onClick={()=>{handleDeleteEvent()}}>Delete</DeleteButton>}
        </Footer>
        </CalendarWrapper>
    </ThemeProvider>
  );
};

export default App;
