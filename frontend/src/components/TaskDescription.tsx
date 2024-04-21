import React, { useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Button, Dialog, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { TaskObj, timeRemaining } from '../models/dataModel.ts';
import "./AddTask.css"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import dayjs from 'dayjs';

interface DialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    task: TaskObj;
}

const AddTaskDialog = (props: DialogProps) => {
    const { open, setOpen, task } = props;

    return (
        <Dialog onClose={() => setOpen(false)} open={open} fullWidth maxWidth="sm">
            <DialogTitle alignSelf={"center"}>Task Info</DialogTitle>
            <Grid container spacing={1} className='dialog-grid-container'>
                <Grid item xs={12}>
                    <TextField 
                        label="Assignment name" 
                        fullWidth 
                        value={task.name} 
                        InputProps={{readOnly: true}}
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField 
                        label="Course name" 
                        fullWidth 
                        value={task.course_name} 
                        InputProps={{readOnly: true}}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField 
                        label="Priority" 
                        fullWidth 
                        value={task.priority} 
                        InputProps={{readOnly: true}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        label="Description" 
                        fullWidth 
                        value={task.description} 
                        multiline
                        rows={4}
                        InputProps={{readOnly: true}}
                    />
                </Grid>
                <Grid item xs={3.5}>
                    <TextField 
                        label="Due date" 
                        fullWidth 
                        value={task.due_date} 
                        InputProps={{readOnly: true}}
                    />
                </Grid>
                <Grid item xs={3.5}>
                    <TextField 
                        label="Time due" 
                        fullWidth 
                        value={task.time_due} 
                        InputProps={{readOnly: true}}
                    />
                </Grid>
                <Grid item xs={5}>
                    <TextField 
                        label="Time Remaining" 
                        fullWidth 
                        value={task.time_remaining} 
                        InputProps={{readOnly: true}}
                    />
                </Grid>
                <Grid item xs={9}></Grid>
                <Grid item xs={3} marginTop={"16px"}>
                    <Button variant="outlined" fullWidth onClick={() => setOpen(false)}>
                        Close
                    </Button>
                </Grid>
            </Grid>
        </Dialog>
    );
}

const TaskDescription = ({ task }) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            <IconButton onClick={() => setDialogOpen(true)}>
                <InfoOutlinedIcon />
            </IconButton>
            {dialogOpen && <AddTaskDialog 
                    setOpen={setDialogOpen} 
                    open={dialogOpen}
                    task={task}
                />
            }
        </>
    )
}

export default TaskDescription;