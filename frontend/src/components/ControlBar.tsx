import React from 'react';
import "./ControlBar.css"
import SortColumn from './SortColumn.tsx';

const priorityLevels = {
    'High': 3,
    'Medium': 2,
    'Low': 1
};

const getEpoch = (dueDate, timeDue) => {
    const dateTime = dueDate + " " + timeDue;
    return Date.parse(dateTime);
};
  
const createSortFunction = (criterion, direction) => {
    if (criterion === "Priority") {
        return (a, b) => direction ? priorityLevels[b.priority] - priorityLevels[a.priority] : priorityLevels[a.priority] - priorityLevels[b.priority];
    } else if (criterion === "Time left") {
        return (a, b) => direction ? getEpoch(a.due_date, a.time_due) - getEpoch(b.due_date, b.time_due) : getEpoch(b.due_date, b.time_due) - getEpoch(a.due_date, a.time_due);
    } else {
        return () => 0;
    }
};
  
const createHandleSort = (data, setData, columnId) => (criterion, direction) => {
    const sortFunction = createSortFunction(criterion, direction);
    const newColumns = data.columns.map(column => {
        if (column.id === columnId) {
            const sortedTaskIds = [...column.taskIds].sort((a, b) => {
                const taskA = data.tasks[a];
                const taskB = data.tasks[b];
                return sortFunction(taskA, taskB);
            });
            return {...column, taskIds: sortedTaskIds};
        }
        return column;
    });
    setData({...data, columns: newColumns});
};
  
const ControlBar = ({ data, setData }) => {
  return (
    <div className="control-bar">
        <SortColumn handleSort={createHandleSort(data, setData, "to-do")}/>
        <SortColumn handleSort={createHandleSort(data, setData, "progress")}/>
        <SortColumn handleSort={createHandleSort(data, setData, "done")}/>
    </div>
  );
};

export default ControlBar;