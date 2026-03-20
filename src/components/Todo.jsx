import { useState, useEffect, useRef } from "react";
import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import TodoInfo from "./TodoInfo";
import TodoList from "./TodoList";
import Button from "./Button";

const Todo = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        const initialTasks = [
            { id: "task-1", title: "Купить молоко", isDone: false },
            { id: "task-2", title: "Погладить кота", isDone: true },
        ];
        return JSON.parse(savedTasks) || initialTasks;
    });

    const [newTaskTitle, setNewTaskTitle] = useState('');   
    const [searchQuery, setSearchQuery] = useState('');

    const newTaskInputRef = useRef(null);
    const firstIncompleteTaskRef = useRef(null);
    const firstIncompleteTaskId = tasks.find((task) => task.isDone === false)?.id;


    const deleteAllTasks = () => {
        const isConfirmed = confirm("Вы уверены, что хотите удалить все задачи?");

        if (isConfirmed) { setTasks([]) };
    };

    const deleteTasks = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    const toggleTaskComplete = (taskId, isDone) => {
        setTasks(
            tasks.map((task) => {
                if (task.id === taskId) {
                    task.isDone = isDone;
                };
                return task;
            })
        );
    };

    const addTask = () => {
        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false
            };

            setTasks(prev => ([...prev, newTask]));
            setNewTaskTitle('');
            setSearchQuery('');

            newTaskInputRef.current.focus();
        };
    };


    useEffect(() => {
        newTaskInputRef.current.focus();
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);


    const clearSearchQuery = searchQuery.trim().toLowerCase();
    const filteredTasks = clearSearchQuery.length > 0
        ? tasks.filter((task) => task.title.toLowerCase().includes(clearSearchQuery))
        : null; 

    
    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm
                addTask={addTask}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
                newTaskInputRef={newTaskInputRef}
            />
            <SearchTaskForm
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <TodoInfo
                total={tasks.length}
                done={tasks.filter((task) => task.isDone === true).length}
                onDeleteAllButtonClick={deleteAllTasks}
            />
            <Button
                onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
                Show first incomplete task
            </Button>
            <TodoList
                tasks={tasks}
                filteredTasks={filteredTasks}
                firstIncompleteTaskRef={firstIncompleteTaskRef}
                firstIncompleteTaskId={firstIncompleteTaskId}
                onDeleteTaskButtonClick={deleteTasks}
                onTaskCopmleteChange={toggleTaskComplete}
            />
        </div>
    );
};

export default Todo;