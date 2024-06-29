/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import TaskItem from "./TaskItem";
import { List } from "@mui/material";
import "../ComponentsCSS/TaskListBox.css";

const TaskListBox = ({
    toDoTasks,
    completedTasks,
    onDelete,
    onMarkComplete,
    onEdit,
    currentCategory,
}) => {
    const renderTasks = (tasks) =>
        tasks.map((task, index) => (
            <TaskItem
                key={task.id}  // Ensure each task has a unique identifier
                task={task}
                index={index}  // Pass the index to maintain uniqueness
                onDelete={onDelete}  // Pass deleteTask function
                onMarkComplete={onMarkComplete}
                onEdit={onEdit}
                currentCategory={currentCategory}
            />
        ));


    return (
        <>
            {currentCategory === "toDo" ? (
                <List className="taskListBox">
                    <h2>To Do Tasks</h2>
                    {renderTasks(toDoTasks)}
                </List>
            ) : (
                <List className="taskListBox">
                    <h2>Completed Tasks</h2>
                    {renderTasks(completedTasks)}
                </List>
            )}
        </>
    );
};

export default TaskListBox;
