import React from 'react';
import TaskLine from './TaskLine';
import { Droppable } from '@hello-pangea/dnd';
import { styled } from 'styled-components';

const Container = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;

  box-shadow: 0 4px 8px 0 rgba(200, 200, 200, 0.2),
    0 6px 20px 0 rgba(200, 200, 200, 0.19);
`;

const TaskList = ({ data, setData }) => {
  return (
    <Container>
      <Droppable droppableId='droppableid'>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {data.map((task) => (
              <TaskLine
                key={task.task_id}
                task={task}
                setData={setData}
                index={task.task_order}
                data={data}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Container>
  );
};

export default TaskList;

/*const TaskListOrig = ({ data, setData }) => {
  return (
    <div>
      {data ? (
        data.map((task) => (
          <TaskLine key={task.task_id} task={task} setData={setData} />
        ))
      ) : (
        <div>Loading tasks</div>
      )}
    </div>
  );
};
*/
