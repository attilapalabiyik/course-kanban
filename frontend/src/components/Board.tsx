import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import "./Board.css"
import Column from './Column.tsx';

const Board = ({ data, setData, addTask, deleteTask }) => {
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    const sourceColumn = data.columns.find((column) => column.id === source.droppableId);
    const destinationColumn = data.columns.find((column) => column.id === destination.droppableId);

    if (sourceColumn === destinationColumn) {
      const newTaskIds = Array.from(sourceColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds,
      };

      const newData = {
        ...data,
        columns: data.columns.map((column) => (column.id === newColumn.id ? newColumn : column)),
      };

      setData(newData);
    }
    else {
      const sourceTaskIds = Array.from(sourceColumn.taskIds);
      sourceTaskIds.splice(source.index, 1);
      const newSourceColumn = {
        ...sourceColumn,
        taskIds: sourceTaskIds,
      };

      const destinationTaskIds = Array.from(destinationColumn.taskIds);
      destinationTaskIds.splice(destination.index, 0, draggableId);
      const newDestinationColumn = {
        ...destinationColumn,
        taskIds: destinationTaskIds,
      };

      const newData = {
        ...data,
        columns: data.columns.map((column) =>
          column.id === newSourceColumn.id
            ? newSourceColumn
            : column.id === newDestinationColumn.id
            ? newDestinationColumn
            : column
        ),
      };

      setData(newData);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        {data.columns.map((column) => {
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId] || {});
          return <Column key={column.id} column={column} tasks={tasks} addTask={addTask} deleteTask={deleteTask}/>;
        })}
      </div>
    </DragDropContext>
  );
};

export default Board;