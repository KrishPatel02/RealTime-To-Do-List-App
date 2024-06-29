// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./App.css";
import InputBox from "./Components/InputBox";
import ControlBtn from "./Components/ControlBtn";
import TaskListBox from "./Components/TaskListBox";
import CategoryControls from "./Components/CategoryControls";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { db } from "./firebase"; // Import Firestore database
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import Auth from './Auth';

const App = () => {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [toDoTasks, setToDoTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("toDo");

 
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const toDoTasksSnapshot = await getDocs(collection(db, "toDoTasks"));
                const completedTasksSnapshot = await getDocs(collection(db, "completedTasks"));

                const toDoTasksList = toDoTasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                const completedTasksList = completedTasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                setToDoTasks(toDoTasksList);
                setCompletedTasks(completedTasksList);

                console.log("Fetched to-do tasks:", toDoTasksList);
                console.log("Fetched completed tasks:", completedTasksList);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);


    // Add New Task Function
    const addTask = async () => {
        const newTask = {
            title: taskTitle,
            description: taskDescription,
            completed: false,
        };

        const docRef = await addDoc(collection(db, "toDoTasks"), newTask);
        setToDoTasks([...toDoTasks, { id: docRef.id, ...newTask }]);
        setTaskTitle("");
        setTaskDescription("");
    };

    // Delete Task Function
    const deleteTask = async (id, category) => {
        if (category === "toDo") {
            await deleteDoc(doc(db, "toDoTasks", id));
            setToDoTasks(toDoTasks.filter(task => task.id !== id));
        } else if (category === "completed") {
            await deleteDoc(doc(db, "completedTasks", id));
            setCompletedTasks(completedTasks.filter(task => task.id !== id));
        }
    };

    // Mark Complete Function
    const markComplete = async (index) => {
        let updatedToDoTasks = [...toDoTasks];
        let updatedCompletedTasks = [...completedTasks];
        let task = {};

        if (currentCategory === "toDo") {
            task = { ...updatedToDoTasks[index], completed: true };
            await addDoc(collection(db, "completedTasks"), task);
            await deleteDoc(doc(db, "toDoTasks", updatedToDoTasks[index].id));
            updatedCompletedTasks.push(task);
            updatedToDoTasks.splice(index, 1);
        } else if (currentCategory === "completed") {
            task = { ...updatedCompletedTasks[index], completed: false };
            await addDoc(collection(db, "toDoTasks"), task);
            await deleteDoc(doc(db, "completedTasks", updatedCompletedTasks[index].id));
            updatedToDoTasks.push(task);
            updatedCompletedTasks.splice(index, 1);
        }

        setToDoTasks(updatedToDoTasks);
        setCompletedTasks(updatedCompletedTasks);
    };

    // Edit Task Function
    const editTask = async (index, newTitle, newDescription, category) => {
        if (category === "toDo") {
            const taskRef = doc(db, "toDoTasks", toDoTasks[index].id);
            await updateDoc(taskRef, { title: newTitle, description: newDescription });
            const updatedToDoTasks = [...toDoTasks];
            updatedToDoTasks[index] = { ...updatedToDoTasks[index], title: newTitle, description: newDescription };
            setToDoTasks(updatedToDoTasks);
        } else if (category === "completed") {
            const taskRef = doc(db, "completedTasks", completedTasks[index].id);
            await updateDoc(taskRef, { title: newTitle, description: newDescription });
            const updatedCompletedTasks = [...completedTasks];
            updatedCompletedTasks[index] = { ...updatedCompletedTasks[index], title: newTitle, description: newDescription };
            setCompletedTasks(updatedCompletedTasks);
        }
    };

    const handleCategoryChange = (category) => {
        setCurrentCategory(category);
    };

    return (
        <>
            <Auth />
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
                    onCategoryChange={handleCategoryChange}
                />
                <TaskListBox
                    toDoTasks={toDoTasks}
                    completedTasks={completedTasks}
                    onDelete={deleteTask}
                    onMarkComplete={markComplete}
                    onEdit={editTask}
                    currentCategory={currentCategory}
                />
            </div>

        </>
    );
};

export default App;
