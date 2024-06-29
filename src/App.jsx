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
import Auth from "./Auth";

const App = () => {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [tasks, setTasks] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("toDo");
    const [user, setUser] = useState(null);

    // Fetch tasks from Firestore on component mount
    useEffect(() => {
        const fetchTasks = async () => {
            const tasksSnapshot = await getDocs(collection(db, "tasks"));
            const tasksList = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTasks(tasksList);
        };

        fetchTasks();
    }, []);

    // Add New Task Function
    const addTask = async () => {
        if (taskTitle.trim() === "" || taskDescription.trim() === "") return;

        const newTask = {
            title: taskTitle,
            description: taskDescription,
            completed: false,
        };

        try {
            const docRef = await addDoc(collection(db, "tasks"), newTask);
            setTasks([...tasks, { id: docRef.id, ...newTask }]);
            setTaskTitle("");
            setTaskDescription("");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    // Delete Task Function
    const deleteTask = async (id) => {
        await deleteDoc(doc(db, "tasks", id));
        setTasks(tasks.filter(task => task.id !== id));
    };

    // Mark Complete Function
    const markComplete = async (index) => {
        const taskToUpdate = tasks[index];
        const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
        await updateDoc(doc(db, "tasks", taskToUpdate.id), updatedTask);

        const updatedTasks = [...tasks];
        updatedTasks[index] = updatedTask;
        setTasks(updatedTasks);
    };

    // Edit Task Function
    const editTask = async (index, newTitle, newDescription) => {
        const taskToUpdate = tasks[index];
        const updatedTask = { ...taskToUpdate, title: newTitle, description: newDescription };
        await updateDoc(doc(db, "tasks", taskToUpdate.id), updatedTask);

        const updatedTasks = [...tasks];
        updatedTasks[index] = updatedTask;
        setTasks(updatedTasks);
    };

    const handleCategoryChange = (category) => {
        setCurrentCategory(category);
    };

    return (
        <Auth user={user} setUser={setUser}>
            <h1 className="mainTitle">To Do App</h1>
            <div className="todoApp">
                <div className="todoControl">
                    <div className="inputControl">
                        <InputBox
                            className="inputTitle"
                            placeholder="Add Title of New Task"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                        />
                        <InputBox
                            className="inputDescription"
                            placeholder="Add Description of New Task"
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
                    tasks={tasks}
                    onDelete={deleteTask}
                    onMarkComplete={markComplete}
                    onEdit={editTask}
                    currentCategory={currentCategory}
                />
            </div>
        </Auth>
    );
};

export default App;
