/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import TaskItem from "./TaskItem";
import { List } from "@mui/material";
import "../ComponentsCSS/TaskListBox.css";

const TaskListBox = ({
    tasks,
    onDelete,
    onMarkComplete,
    onEdit,
    currentCategory,
}) => {
    // Ensure tasks is not undefined before filtering
    const filteredTasks = tasks ? tasks.filter((task) =>
        currentCategory === "toDo" ? !task.completed : task.completed
    ) : [];

    const renderTasks = (tasks) =>
        tasks.map((task, index) => (
            <TaskItem
                key={task.id}
                task={task}
                index={index}
                onDelete={onDelete}
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
                    {renderTasks(filteredTasks)}
                </List>
            ) : (
                <List className="taskListBox">
                    <h2>Completed Tasks</h2>
                    {renderTasks(filteredTasks)}
                </List>
            )}
        </>
    );
};

export default TaskListBox;
