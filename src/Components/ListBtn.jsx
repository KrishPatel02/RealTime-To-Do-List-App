/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Button, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const TaskListBtnAPI = [
    {
        color: "var(--themeColor)",
        bgColor: "var(--themeBGColor)",
        hoverTitle: "Edit Task",
        btnIcon: <EditIcon />,
    },
    {
        color: "var(--deleteColor)",
        bgColor: "var(--deleteBGColor)",
        hoverTitle: "Delete Task",
        btnIcon: <DeleteIcon />,
    },
    {
        color: "var(--doneColor)",
        bgColor: "var(--doneBGColor)",
        hoverTitle: "Complete Task",
        btnIcon: <TaskAltIcon />,
    },

];

const ListBtn = ({
    onDelete,
    onMarkComplete,
    onEdit,
    index,
    currentCategory,
}) => {
    return (
        <>
            {TaskListBtnAPI.map((btns, btnIndex) => {
                if (
                    (currentCategory === "toDo" &&
                        (btns.hoverTitle === "Edit Task" ||
                            btns.hoverTitle === "Complete Task" ||
                            btns.hoverTitle === "Delete Task")) ||
                    (currentCategory === "completed" &&
                        (btns.hoverTitle === "Move Back to To Do" ||
                            btns.hoverTitle === "Delete Task"))
                ) {
                    return (
                        <Tooltip title={btns.hoverTitle} key={btnIndex}>
                            <Button
                                key={btnIndex}
                                variant="text"
                                className="button"
                                sx={{
                                    color: `${btns.color} `,
                                    "&:hover": {
                                        backgroundColor: `${btns.bgColor} `,
                                    },
                                }}
                                onClick={() => {
                                    if (btns.hoverTitle === "Delete Task") {
                                        onDelete(index, currentCategory);
                                    } else if (btns.hoverTitle === "Edit Task") {
                                        onEdit(index, currentCategory);
                                    } else if (btns.hoverTitle === "Complete Task") {
                                        onMarkComplete(index);
                                    }
                                }}
                            >
                                {btns.btnIcon}
                            </Button>
                        </Tooltip>
                    );
                }
                return null;
            })}
        </>
    );
};

export default ListBtn;
