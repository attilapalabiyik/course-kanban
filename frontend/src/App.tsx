import React, { useState } from 'react';
import Board from "./components/Board.tsx";
import {Data, TaskObj} from "./models/dataModel.ts"

const initialData: Data = {
  columns: [
    {
      id: 'to-do',
      title: 'To Do',
      taskIds: ['task-1'],
      color: "#3498db"
    },
    {
      id: 'progress',
      title: 'In Progress',
      taskIds: [],
      color: "#e67e22"
    },
    {
      id: 'done',
      title: 'Done',
      taskIds: [],
      color: "#2ecc71"
    },
  ],
  tasks: {
    'task-1': {
      id: 'task-1',
      name: 'PLACEHOLDER TASK',
      description: 'This is a placeholder task',
      course_name: 'CS 101',
      priority: 'low',
      due_date: '04/30/2024',
      time_due: '11:59 PM',
      time_remaining: '10 days left',
      subTasks: [
        "do this",
        "do that",
        "and that"
      ]
    },
  },
};

const App = () => {
  const [data, setData] = useState<Data>(initialData);

  const addTask = (newTask: TaskObj) => {
    const newTasks = {...data.tasks, [newTask.id]: newTask};
    const newColumns = data.columns.map(column => {
      if (column.id === "to-do") {
        return {...column, taskIds: [...column.taskIds, newTask.id]};
      }
      return column;
    });
    setData({tasks: newTasks, columns: newColumns});
  };

  const deleteTask = (taskId: string) => {
    const {[taskId]: deletedTask, ...restTasks} = data.tasks;
    const newColumns = data.columns.map(column => {
      return {...column, taskIds: column.taskIds.filter(id => id !== taskId)};
    });
    setData({tasks: restTasks, columns: newColumns});
  };

  return (
    <div className="app">
      <h1 style={{textAlign: "center"}}>Course Kanban</h1>
      <Board data={data} setData={setData} addTask={addTask} deleteTask={deleteTask}/>
    </div>
  );
};

export default App;