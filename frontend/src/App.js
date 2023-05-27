import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import TaskList from './components/TaskList';
import { styled } from 'styled-components';
import { DragDropContext } from '@hello-pangea/dnd';
import Header from './components/Header';

const Container = styled.div`
  padding: 20px;
`;

const InnerContainer = styled.div`
  margin: auto;
  margin-top: 20px;
  max-width: 650px;
`;

const NoTasksContainer = styled.div`
  margin: 50px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoTasks = styled.div`
  padding: 15px 30px;
  border-radius: 50px;
  background-color: #0bb780;
  color: white;
  box-shadow: 0 4px 8px 0 rgba(100, 100, 100, 0.2),
    0 6px 20px 0 rgba(100, 100, 100, 0.19);
`;

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(process.env.REACT_APP_API_URL);
      const jsonResponse = await response.json();
      jsonResponse.sort(
        (a, b) => parseFloat(a.task_order) - parseFloat(b.task_order)
      );
      setData(jsonResponse);
    };
    getData();
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }

    const newData = Array.from(data);
    const [reorderedItem] = newData.splice(result.source.index, 1);
    newData.splice(result.destination.index, 0, reorderedItem);

    setData(newData);

    const updateTasks = async (newData) => {
      const response = await fetch(process.env.REACT_APP_API_URL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      const jsonResponse = await response.json();
      jsonResponse.sort(
        (a, b) => parseFloat(a.task_order) - parseFloat(b.task_order)
      );
      setData(jsonResponse);
      console.log(jsonResponse);
    };

    updateTasks(newData);
  };

  return (
    <Container className='App'>
      <InnerContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          <Header />
          {data.length >= 1 ? (
            <TaskList data={data} setData={setData} />
          ) : (
            <NoTasksContainer>
              <NoTasks>All tasks complete!</NoTasks>
            </NoTasksContainer>
          )}
          <Form data={data} setData={setData} />
        </DragDropContext>
      </InnerContainer>
    </Container>
  );
};

export default App;
