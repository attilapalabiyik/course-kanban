import React, { useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Typography, IconButton, Collapse, Checkbox, TextField, FormGroup } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import "./Task.css"
import { timeRemaining } from '../models/dataModel.ts';

const Task = ({ task, index }) => {
    const [remaining, setTimeRemaining] = useState(task.time_remaining);
    const [open, setOpen] = useState(false);
    const [rotateChevron, setRotateChevron] = useState(false);
    const rotate = rotateChevron ? "rotate(180deg)" : "rotate(0)";
    const [subTasks, setSubTasks] = useState(task.subTasks.map(subTask => ({ name: subTask, completed: false, isNew: false})));

    const handleSubTaskToggle = () => {
        setRotateChevron(!rotateChevron);
        setOpen(!open);
    };

    const handleSubTaskChange = (index, event) => {
        const newSubTasks = [...subTasks];
        newSubTasks[index].name = event.target.value;
        setSubTasks(newSubTasks);
    };

    const handleCheckboxChange = (index) => {
      const newSubTasks = [...subTasks];
      newSubTasks[index].completed = !newSubTasks[index].completed;
      if (newSubTasks[index].completed) {
          newSubTasks[index].removing = true;
          setSubTasks(newSubTasks);
          setTimeout(() => {
              setSubTasks(current => current.filter(subTask => !subTask.completed));
          }, 300);
      } else {
          setSubTasks(newSubTasks);
      }
    };

    const handleAddSubTask = () => {
      const newSubTask = { name: '', completed: false, isNew: true };
      setSubTasks([...subTasks, newSubTask]);
      setTimeout(() => {
          const updatedSubTasks = [...subTasks, {...newSubTask, isNew: false}];
          setSubTasks(updatedSubTasks);
      }, 300);
  };

    useEffect(() => {
      const interval = setInterval(() => {
        const updatedTimeRemaining = timeRemaining(task.due_date, task.time_due);
        setTimeRemaining(updatedTimeRemaining);
        task.time_remaining = updatedTimeRemaining
      }, 1000);
      
      return () => clearInterval(interval);
    }, [task, task.time_remaining, task.due_date, task.time_due]);

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div
                  className="task"
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                  <div className='task-text'>
                      <Typography variant='body2'>
                          {task.name}
                      </Typography>
                      <Typography variant='body2' color={"grey"}>
                          {task.course_name}
                      </Typography>
                  </div>
                  <div className='task-extra'>
                    <div className='sub-tasks-button'>
                      <IconButton onClick={handleSubTaskToggle}>
                        <ExpandLessIcon style={{ transform: rotate, transition: "all 0.2s linear" }}/>
                      </IconButton>
                    </div>
                    <div className='time-remaining'>
                        <Typography variant='body2' color={"grey"}>
                            {remaining}
                        </Typography>
                        <div style={{width: "8px"}}></div>
                    </div>
                  </div>
                  <Collapse in={open}>
                    <FormGroup>
                      {subTasks.map((subTask, idx) => (
                        <div key={idx} className={subTask.isNew ? 'fade-in' : subTask.removing ? 'fade-out' : ''} style={{ display: 'flex', alignItems: 'center', paddingLeft: "16px" }}>
                          <Checkbox checked={subTask.completed} onChange={() => handleCheckboxChange(idx)} size='small' style={{color: "green"}}/>
                          <TextField
                            value={subTask.name}
                            placeholder='to-do...'
                            onChange={(event) => handleSubTaskChange(idx, event)}
                            fullWidth
                            sx={{padding: "4px"}}
                            size='small'
                          />
                        </div>
                      ))}
                    </FormGroup>
                    <div style={{display: "flex", width: "100%", justifyContent: "center", padding: "4px 0px"}}>
                      <IconButton size='small' onClick={handleAddSubTask}>
                        <AddIcon/>
                      </IconButton>
                    </div>
                  </Collapse>
                </div>
            )}
        </Draggable>
    );
};

export default Task;