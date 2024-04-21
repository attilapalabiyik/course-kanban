import React, { useState } from 'react';
import { FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import "./SortColumn.css"

const SortColumn = ({ handleSort }) => {
    const [criterion, setCriterion] = useState("");
    const [rotateArrow, setRotateArrow] = useState(true);
    const rotate = rotateArrow ? "rotate(180deg)" : "rotate(0)";
    return (
        <div className="sort">
            <FormControl className='sort-select' size='small' style={{width: "115px"}}>
                <InputLabel>Sort by</InputLabel>
                <Select
                    label="Sort by"
                    defaultValue={""}
                    onChange={(e) => {setCriterion(e.target.value as string);handleSort(e.target.value as string, rotateArrow);}}
                >
                    <MenuItem value={"Time left"}>Time left</MenuItem>
                    <MenuItem value={"Priority"}>Priority</MenuItem>
                </Select>
            </FormControl>
            <IconButton onClick={() => {setRotateArrow(!rotateArrow);handleSort(criterion, rotateArrow);}}>
                <ArrowUpwardIcon style={{ transform: rotate, transition: "all 0.2s linear" }}/>
            </IconButton>
        </div>
    );
};

export default SortColumn;