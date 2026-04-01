import { createContext, useMemo } from "react";
import useTasks from "./useTasks";
import useIncompleteTasksScroll from "./useIncompleteTasksScroll";

export const TasksContext = createContext({});

export const TasksProvider = (props) => {
    const { children } = props;

    const {
        tasks,
        filteredTasks,
        deleteTasks,
        deleteAllTasks,
        toggleTaskComplete,
        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
        disappearingTaskId,
        appearingTaskId
    } = useTasks();

    const {
        firstIncompleteTaskRef,
        firstIncompleteTaskId
    } = useIncompleteTasksScroll(tasks);

    const value = useMemo(() => ({
        tasks,
        filteredTasks,
        deleteTasks,
        deleteAllTasks,
        toggleTaskComplete,
        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
        disappearingTaskId,
        appearingTaskId,
        firstIncompleteTaskRef,
        firstIncompleteTaskId
    }), [
        tasks,
        filteredTasks,
        deleteTasks,
        deleteAllTasks,
        toggleTaskComplete,
        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
        disappearingTaskId,
        appearingTaskId,
        firstIncompleteTaskRef,
        firstIncompleteTaskId
    ]);


    return (
        <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>
    );
};
