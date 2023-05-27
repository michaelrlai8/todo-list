import React from 'react';
import { styled } from 'styled-components';
import TaskContainer from './TaskContainer';
import { Draggable } from '@hello-pangea/dnd';
import DragHandle from '../images/drag-handle.svg';
import RadioButtonOn from '../images/radio_button_on.svg';
import RadioButtonOff from '../images/radio_button_off.svg';
import Trash from '../images/trash.svg';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  width: 100%;
`;

const LeftLineContainer = styled.div`
  display: flex;
  align-items: center;
  width: 30px;
  padding-bottom: 5px;
`;

const RightLineContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  padding-bottom: 3px;
`;

const Button = styled.button`
  border: none;
  background-color: rgb(0, 0, 0, 0);
  height: 22px;
  width: 22px;
`;

const DoneButton = styled.img`
  height: 100%;
  width: 100%;
  filter: invert(19%) sepia(79%) saturate(6146%) hue-rotate(335deg)
    brightness(91%) contrast(89%);

  padding-top: 3px;
`;

const DeleteButton = styled.button`
  border: none;
  height: 20px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: rgb(0, 0, 0, 0);

  /*
  border: none;
  background-color: #c06666;
  color: white;
  border-radius: 3px;
  padding: 5px 0 5px 0;
  width: 50px;
  */
`;

const TrashIcon = styled.img`
  height: 100%;
  filter: invert(93%) sepia(3%) saturate(27%) hue-rotate(314deg) brightness(90%)
    contrast(96%);
`;

const HandleContainer = styled.div``;

const Handle = styled.img`
  filter: invert(93%) sepia(3%) saturate(27%) hue-rotate(314deg) brightness(90%)
    contrast(96%);
  padding: 0 0 3px 10px;
  height: 10px;
`;

const TaskLine = ({ task, setData, index, data }) => {
  const handleComplete = async () => {
    const newData = Array.from(data);

    for (const [index, test] of data.entries()) {
      if (test.task_id === task.task_id) {
        if (test.task_completed === true) {
          newData[index].task_completed = false;
        } else {
          newData[index].task_completed = true;
        }
      }
    }

    setData(newData);

    const response = await fetch(`${process.env.REACT_APP_API_URL}/complete`, {
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

  // Handle clicking delete for a task
  const handleDelete = () => {
    /*  const index = data.findIndex((d) => d.task_id === task.task_id);
    const newData = data;
    newData.splice(index, 1);

    const updateTask = async () => {
      const response = await fetch('http://localhost:3500/', {
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
    };
    updateTask(); */

    const deleteTask = async () => {
      const newData = data;
      newData.splice(index, 1);
      setData(newData);

      const response = await fetch(process.env.REACT_APP_API_URL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
      });
      const jsonResponse = await response.json();
      jsonResponse.sort(
        (a, b) => parseFloat(a.task_order) - parseFloat(b.task_order)
      );
      setData(jsonResponse);
    };
    deleteTask();

    /* const deleteTask = async () => {
      const response = await fetch('http://localhost:3500/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
      });
      const jsonResponse = await response.json();
      setData(jsonResponse);
    };*/
  };

  return (
    <Draggable
      draggableId={'id' + task.task_order}
      index={index}
      key={task.task_order}
    >
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <LeftLineContainer>
            <Button onClick={handleComplete}>
              {task.task_completed ? (
                <DoneButton src={RadioButtonOn} />
              ) : (
                <DoneButton src={RadioButtonOff} />
              )}
            </Button>
          </LeftLineContainer>
          <TaskContainer task={task} />
          <RightLineContainer>
            <DeleteButton onClick={() => handleDelete()}>
              <TrashIcon src={Trash} />
            </DeleteButton>

            <HandleContainer>
              <Handle {...provided.dragHandleProps} src={DragHandle} />
            </HandleContainer>
          </RightLineContainer>
        </Container>
      )}
    </Draggable>
  );
};

export default TaskLine;

/*
    <Container>
      <TaskContainer task={task} />
      <ButtonContainer>
        <Button onClick={() => handleDelete(task)}>delete</Button>
        <Button>up</Button>
        <Button>down</Button>
      </ButtonContainer>
    </Container>

    */
