import {
    createContext
} from "react";
import useTasks from "../hooks/useTasks";
import useIncompleteTasksScroll from "../hooks/useIncompleteTasksScroll";

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


    return (
        <TasksContext.Provider
            value={{
                tasks,
                filteredTasks,
                firstIncompleteTaskRef,
                firstIncompleteTaskId,
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
            }}
        >
            {children}
        </TasksContext.Provider>
    );
};
