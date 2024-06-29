// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./App.css";
import InputBox from "./Components/InputBox";
import ControlBtn from "./Components/ControlBtn";
import TaskListBox from "./Components/TaskListBox";
import CategoryControls from "./Components/CategoryControls";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Auth from "./Auth";
import { db } from "./firebase";
import {
    collection,
    addDoc,
    onSnapshot,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";

const App = () => {
    const [user, setUser] = useState(null);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [tasks, setTasks] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("toDo");

    useEffect(() => {
        if (user) {
            const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
                const tasksData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTasks(tasksData);
            });
            return () => unsubscribe();
        }
    }, [user]);

    const addTask = async () => {
        try {
            await addDoc(collection(db, "tasks"), {
                title: taskTitle,
                description: taskDescription,
                completed: false,
                uid: user.uid,
            });
            setTaskTitle("");
            setTaskDescription("");
        } catch (error) {
            console.error("Error adding task: ", error.message);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await deleteDoc(doc(db, "tasks", taskId));
        } catch (error) {
            console.error("Error deleting task: ", error.message);
        }
    };

    const markComplete = async (task) => {
        try {
            await updateDoc(doc(db, "tasks", task.id), {
                completed: !task.completed,
            });
        } catch (error) {
            console.error("Error updating task: ", error.message);
        }
    };

    const editTask = async (taskId, newTitle, newDescription) => {
        try {
            await updateDoc(doc(db, "tasks", taskId), {
                title: newTitle,
                description: newDescription,
            });
        } catch (error) {
            console.error("Error editing task: ", error.message);
        }
    };

    return (
        <>
            <Auth user={user} setUser={setUser} />
            {user && (
                <div>
                    <h1 className="mainTitle">To Do App</h1>
                    <div className="todoApp">
                        <div className="todoControl">
                            <div className="inputControl">
                                <InputBox
                                    className="inputTitle"
                                    placeholder={"Add Title of New Task"}
                                    value={taskTitle}
                                    onChange={(e) => setTaskTitle(e.target.value)}
                                />
                                <InputBox
                                    className="inputDescription"
                                    placeholder={"Add Description of New Task"}
                                    value={taskDescription}
                                    onChange={(e) => setTaskDescription(e.target.value)}
                                />
                            </div>
                            <ControlBtn
                                sx={{
                                    color: "var(--themeColor)",
                                    "&:hover": {
                                        backgroundColor: "var(--themeBGColor)",
                                    },
                                }}
                                className="addBtn"
                                btnTitle={<AddTaskIcon />}
                                hoverTitle="Add Task"
                                onClick={addTask}
                            />
                        </div>
                        <CategoryControls
                            currentCategory={currentCategory}
                            onCategoryChange={setCurrentCategory}
                        />
                        <TaskListBox
                            tasks={tasks}
                            onDelete={deleteTask}
                            onMarkComplete={markComplete}
                            onEdit={editTask}
                            currentCategory={currentCategory}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default App;
