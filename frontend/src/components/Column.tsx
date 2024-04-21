import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import "./Column.css"
import Task from './Task.tsx';
import AddTask from './AddTask.tsx';
import { Typography } from '@mui/material';

const Column = ({ column, tasks, addTask, deleteTask }) => {
  return (
    <div className="column">
      <Typography variant='h5' fontWeight={"bold"} className='column-title' style={{backgroundColor: column.color}}>
        {column.title}
      </Typography>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className={`droppable-area`}>
            {Object.keys(tasks).length 
              ? tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))
              : null
            }
            {provided.placeholder}
            {column.id === "to-do" 
              ? <AddTask addTask={addTask}/>
              : null
            }
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;