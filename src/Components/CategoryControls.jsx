/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import ControlBtn from "./ControlBtn";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import TaskIcon from "@mui/icons-material/Task";

const CategoryControls = ({ currentCategory, onCategoryChange }) => {
    return (
        <div className="todoCategory">
            <ControlBtn
                sx={{ 
                    color: "var(--themeColor)",
                    "&:hover": {
                        backgroundColor: "var(--themeBGColor)",
                    },
                }} 
                className={`todoBtn ${currentCategory === "toDo" ? "active" : ""}`}
                btnTitle={<AssignmentOutlinedIcon />}
                hoverTitle="Task To Do"
                onClick={() => onCategoryChange("toDo")}
            />
            <ControlBtn
                sx={{
                    color: "var(--themeColor)",
                    "&:hover": {
                        backgroundColor: "var(--themeBGColor)",
                    },
                }}
                className={`completedBtn ${currentCategory === "completed" ? "active" : ""}`}
                btnTitle={<TaskIcon />}
                hoverTitle="Task Completed"
                onClick={() => onCategoryChange("completed")}
            />
        </div>
    );
};

export default CategoryControls;
