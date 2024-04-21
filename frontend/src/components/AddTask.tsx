import React, { useState, useRef } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ListItemButton, ListItemIcon, ListItemText, Dialog, DialogTitle, Grid, TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { TaskObj, timeRemaining } from '../models/dataModel.ts';
import "./AddTask.css"
import { Dayjs } from 'dayjs';

interface DialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    addTask: (newTask: TaskObj) => void;
}

const AddTaskDialog = (props: DialogProps) => {
    const { open, setOpen, addTask } = props;
    const assignmentNameRef = useRef<HTMLInputElement>(null);
    const courseNameRef = useRef<HTMLInputElement>(null);
    const priorityRef = useRef<string>("");
    const descriptionRef = useRef<HTMLInputElement>(null);
    const [dueDate, setDueDate] = useState<Dayjs | null>(null);
    const [timeDue, setTimeDue] = useState<Dayjs | null>(null);

    return (
        <Dialog onClose={() => setOpen(false)} open={open} fullWidth maxWidth="sm">
            <DialogTitle alignSelf={"center"}>Add Assignment</DialogTitle>
            <Grid container spacing={1} className='dialog-grid-container'>
                <Grid item xs={12}>
                    <TextField label="Assignment name" fullWidth inputRef={assignmentNameRef} />
                </Grid>
                <Grid item xs={8}>
                    <TextField label="Course name" fullWidth inputRef={courseNameRef} />
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel>Priority</InputLabel>
                        <Select
                            defaultValue=""
                            label="Priority"
                            onChange={(e) => priorityRef.current = e.target.value as string}
                        >
                            <MenuItem value={"High"}>High</MenuItem>
                            <MenuItem value={"Medium"}>Medium</MenuItem>
                            <MenuItem value={"Low"}>Low</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Description" fullWidth inputRef={descriptionRef} multiline rows={4}/>
                </Grid>
                <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Due date"
                            value={dueDate}
                            onChange={setDueDate}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            label="Time Due"
                            value={timeDue}
                            onChange={setTimeDue}
                            viewRenderers={{
                                hours: renderTimeViewClock,
                                minutes: renderTimeViewClock,
                                seconds: renderTimeViewClock,
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={3} marginTop={"16px"}>
                    <Button variant="outlined" fullWidth onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </Grid>
                <Grid item xs={3} marginTop={"16px"}>
                    <Button 
                        variant="contained" 
                        fullWidth 
                        onClick={() => {
                            const unique_id = Date.now().toString();
                            if (assignmentNameRef.current?.value && courseNameRef.current?.value && priorityRef.current && dueDate && timeDue) {
                                addTask({
                                    id: unique_id,
                                    name: assignmentNameRef.current?.value,
                                    description: '',
                                    course_name: courseNameRef.current?.value,
                                    priority: priorityRef.current,
                                    due_date: dueDate.format('MM/DD/YYYY'),
                                    time_due: timeDue.format('hh:mm A'),
                                    time_remaining: timeRemaining(dueDate.format('MM/DD/YYYY'), timeDue.format('hh:mm A')),
                                    subTasks: []
                                });
                                setOpen(false);
                            }
                        }}>
                        Add
                    </Button>
                </Grid>
            </Grid>
        </Dialog>
    );
}

const AddTask = ({ addTask }) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            <ListItemButton onClick={() => setDialogOpen(true)} className='add-button'>
                <ListItemIcon className='add-icon'>
                    <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Add an assignment"/>
            </ListItemButton>
            {dialogOpen && <AddTaskDialog 
                setOpen={setDialogOpen} 
                open={dialogOpen}
                addTask={addTask}
            />
            }
        </>
    )
}

export default AddTask;