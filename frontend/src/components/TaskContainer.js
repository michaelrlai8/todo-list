import React from 'react';
import { styled } from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px 0 10px;
  margin: 5px;
`;

const Task = styled.div`
  font-size: 16px;
  border-bottom: 1px solid #d3d3d3;
  width: 100%;
`;

const IncompletedTask = styled(Task)``;

const CompletedTask = styled(Task)`
  color: #f6f6f6;
`;

const TaskContainer = ({ task }) => {
  return (
    <Container>
      {task.task_completed ? (
        <CompletedTask>{task.task_description}</CompletedTask>
      ) : (
        <IncompletedTask>{task.task_description}</IncompletedTask>
      )}
    </Container>
  );
};

export default TaskContainer;
