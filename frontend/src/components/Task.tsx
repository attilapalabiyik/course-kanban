import React, { useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Typography, IconButton, Collapse, Checkbox, TextField, FormGroup } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { timeRemaining } from '../models/dataModel.ts';
import "./Task.css"
import TaskDescription from './TaskDescription.tsx';

const Task = ({ task, columnId, index, deleteTask }) => {
    const [remaining, setTimeRemaining] = useState(task.time_remaining);
    const [open, setOpen] = useState(false);
    const [rotateChevron, setRotateChevron] = useState(false);
    const rotate = rotateChevron ? "rotate(180deg)" : "rotate(0)";
    const [subTasks, setSubTasks] = useState(task.subTasks.map(subTask => ({
      id: subTask.id,
      text: subTask.text,
      completed: false,
      isNew: false,
      isEditing: false
    })));

    const handleSubTaskToggle = () => {
        setRotateChevron(!rotateChevron);
        setOpen(!open);
    };

    const handleSubTaskChange = (index, event) => {
        const newSubTasks = [...subTasks];
        newSubTasks[index].text = event.target.value;
        task.subTasks[index].text = event.target.value;
        setSubTasks(newSubTasks);
    };

    const handleCheckboxChange = (index) => {
      const newSubTasks = [...subTasks];
      newSubTasks[index].completed = !newSubTasks[index].completed;
      if (newSubTasks[index].completed) {
          newSubTasks[index].removing = true;
          setSubTasks(newSubTasks);
          setTimeout(() => {
              setSubTasks(current => current.filter(subTask => {
                if (!subTask.completed) {
                  return true;
                } else {
                  task.subTasks = task.subTasks.filter(sub_task => sub_task.id !== subTask.id);
                  return false;
                }
              }));
          }, 300);
      } else {
          setSubTasks(newSubTasks);
      }
    };

    const handleAddSubTask = () => {
      if (subTasks.reduce((acc, e) => !e.isEditing && acc, true)) {
        const unique_id = Date.now().toString();
        const newSubTask = { id: unique_id, text: '', completed: false, isNew: true, isEditing: true };
        setSubTasks(subTasks.map(sub => ({ ...sub, isEditing: false })));
        setSubTasks([...subTasks, newSubTask]);
        task.subTasks.push({id: unique_id, text: ''});
        setTimeout(() => {
            const updatedSubTasks = [...subTasks, {...newSubTask, isNew: false}];
            setSubTasks(updatedSubTasks);
        }, 300);
      }
    };

    const toggleEdit = (index) => {
      setSubTasks(subTasks.map((subTask, idx) => ({
          ...subTask,
          isEditing: idx === index ? !subTask.isEditing : false
      })));
    };

    const handleEnter = (index, event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        toggleEdit(index);
      }
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
                  <div className='task-body'>
                    <div>
                      <Typography variant='body2'>
                          {task.name}
                      </Typography>
                      <Typography variant='body2' color={"grey"}>
                          {task.course_name}
                      </Typography>
                    </div>
                    <div className='task-tags'>
                      {columnId !== 'done' ?
                      <Typography 
                        fontSize={"13px"} 
                        fontWeight={"bold"} 
                        textAlign={"center"} 
                        style={{
                          borderStyle: "solid", 
                          borderWidth: "2px", 
                          borderRadius: "4px", 
                          width: "20px", 
                          height: "20px", 
                          backgroundColor: (task.priority === "High" 
                            ? "#ff5d52" 
                            : task.priority === "Medium"
                              ? "orange"
                              : "yellow"
                          ),
                        }}>
                        {task.priority === "High" 
                          ? "!!!" 
                          : task.priority === "Medium"
                            ? "!!"
                            : "!"}
                      </Typography>
                      :
                      <CheckCircleOutlinedIcon style={{fill: "green"}}/>
                      }
                    </div>
                  </div>
                  <div className='task-extra'>
                    <div className='sub-tasks-button'>
                      <IconButton onClick={handleSubTaskToggle}>
                        <ExpandLessIcon style={{ transform: rotate, transition: "all 0.2s linear" }}/>
                      </IconButton>
                      <TaskDescription task={task}/>
                      <IconButton onClick={() => deleteTask(task.id)}>
                        <DeleteOutlineIcon />
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
                      {subTasks.map((subTask, index) => (
                        <div key={index} className={subTask.isNew ? 'fade-in' : subTask.removing ? 'fade-out' : ''} style={{ display: 'flex', alignItems: 'center', paddingLeft: "16px" }}>
                          <Checkbox checked={subTask.completed} onChange={() => handleCheckboxChange(index)} size='small' style={{color: "green"}}/>
                          <TextField
                            value={subTask.text}
                            placeholder='to-do...'
                            variant={subTask.isEditing ? "outlined" : "standard"}
                            onChange={(event) => handleSubTaskChange(index, event)}
                            onDoubleClick={() => toggleEdit(index)}
                            onBlur={() => toggleEdit(index)}
                            onKeyDown={(event) => handleEnter(index, event)}
                            fullWidth
                            sx={{padding: "4px"}}
                            InputProps={{
                              readOnly: !subTask.isEditing,
                              disableUnderline: true,
                            }}
                            size='small'
                          />
                        </div>
                      ))}
                    </FormGroup>
                    <div style={{display: "flex", width: "100%", justifyContent: "center"}}>
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