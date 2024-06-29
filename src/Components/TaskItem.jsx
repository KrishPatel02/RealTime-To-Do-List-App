/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { ListItem, ListItemText } from "@mui/material";
import ListBtn from "./ListBtn";
import InputBox from "./InputBox";

const TaskItem = ({
    task,
    index,
    onDelete,
    onMarkComplete,
    onEdit,
    currentCategory,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description);

    const handleEditChange = (e, field) => {
        if (field === "title") {
            setEditTitle(e.target.value);
        } else if (field === "description") {
            setEditDescription(e.target.value);
        }
    };

    const saveEdit = () => {
        onEdit(task.id, editTitle, editDescription);
        setIsEditing(false);
    };

    const cancelEdit = () => {
        setIsEditing(false);
    };

    return (
        <ListItem className="taskList">
            {isEditing ? (
                <>
                    <InputBox
                        className="inputTitle"
                        placeholder={"Edit Title"}
                        value={editTitle}
                        onChange={(e) => handleEditChange(e, "title")}
                    />
                    <InputBox
                        className="inputDescription"
                        placeholder={"Edit Description"}
                        value={editDescription}
                        onChange={(e) => handleEditChange(e, "description")}
                    />
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                </>
            ) : (
                <>
                    <ListItemText primary={task.title} secondary={task.description} />
                    <ListBtn
                        task={task}
                        onDelete={() => onDelete(task.id)}
                        onMarkComplete={() => onMarkComplete(task)}
                        onEdit={() => setIsEditing(true)}
                        index={index}
                        currentCategory={currentCategory}
                    />
                </>
            )}
        </ListItem>
    );
};

export default TaskItem;
