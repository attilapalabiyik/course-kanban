import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import "./ContentToggle.css"

const ContentToggle = ({content, setContent}) => {

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setContent(newAlignment);
    };

    return (
        <div className="toggle">
            <ToggleButtonGroup
                color="primary"
                value={content}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
            >
                <ToggleButton value="kanban" style={{width: "110px"}}>Kanban</ToggleButton>
                <ToggleButton value="activities" style={{width: "110px"}}>Activities</ToggleButton>
            </ToggleButtonGroup>
        </div>
  );
};

export default ContentToggle;