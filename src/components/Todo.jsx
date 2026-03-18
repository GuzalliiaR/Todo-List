import { useState } from "react";
import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import TodoInfo from "./TodoInfo";
import TodoList from "./TodoList";

const Todo = () => {
    const [tasks, setTasks] = useState([
        { id: "task-1", title: "Купить молоко", isDone: false },
        { id: "task-2", title: "Погладить кота", isDone: true },
    ]);

    const [newTaskTitle, setNewTaskTitle] = useState('');

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

    const filterTasks = (query) => {
        console.log(`Поиск ${query}`);
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
        };
    };

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm
                addTask={addTask}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
            />
            <SearchTaskForm
                onSearchInput={filterTasks}
            />
            <TodoInfo
                total={tasks.length}
                done={tasks.filter((task) => task.isDone === true).length}
                onDeleteAllButtonClick={deleteAllTasks}
            />
            <TodoList
                tasks={tasks}
                onDeleteTaskButtonClick={deleteTasks}
                onTaskCopmleteChange={toggleTaskComplete}
            />
        </div>
    );
};

export default Todo;