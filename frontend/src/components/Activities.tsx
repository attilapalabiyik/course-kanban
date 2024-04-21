import * as React from 'react';
import { DataGrid, GridColDef, GridRowsProp, GridSlots } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useState } from 'react';

const AddActivity = ({handleAddActivity}) => {
    return (
        <Button onClick={handleAddActivity} style={{width: "140px"}}>
            + Add Activity
        </Button>
    )
}

export default function BasicRowEditingGrid() {
  const [rows, setRows] = useState<GridRowsProp>(initialRows);

  const handleAddActivity = () => {
    const newId = rows.length + 1;
    const newActivity = {
      id: newId,
      activity: "",
      start: null,
      end: null,
    };
    setRows([...rows, newActivity]);
  };

  return (
    <div style={{ height: 628, width: 640 }}>
      <DataGrid 
        editMode="row" 
        rows={rows} 
        columns={columns} 
        getRowId={(row) => row.id}
        slots={{
            toolbar: AddActivity as GridSlots['toolbar'],
          }}
        slotProps={{
            toolbar: { handleAddActivity },
        }}
      /> 
    </div>
  );
}

const columns: GridColDef[] = [
  { field: 'activity', headerName: 'Activity', width: 180, editable: true },
  {
    field: 'start',
    headerName: 'Start',
    type: 'dateTime',
    width: 220,
    editable: true,
  },
  {
    field: 'end',
    headerName: 'End',
    type: 'dateTime',
    width: 220,
    editable: true,
  },
];

const initialRows: GridRowsProp = [
  {
    id: 1,
    activity: "Swimming",
    start: new Date("04/30/2024 8:00 PM"),
    end: new Date("04/30/2024 10:00 PM"),
  },
];
