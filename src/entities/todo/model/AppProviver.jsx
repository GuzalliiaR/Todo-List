import { useMemo } from "react";
import { TasksContext, SearchContext } from "@/entities/todo";
import useTasks from "./useTasks";
import useIncompleteTasksScroll from "./useIncompleteTasksScroll";
import { UIStateContext } from "./UIStateContext";

export const AppProvider = ({ children }) => {
    const {
        tasks,
        deleteTasks,
        deleteAllTasks,
        toggleTaskComplete,
        searchQuery,
        setSearchQuery,
        filteredTasks,
        newTaskInputRef,
        addTask,
        disappearingTaskId,
        appearingTaskId
    } = useTasks();

    const {
        firstIncompleteTaskRef,
        firstIncompleteTaskId
    } = useIncompleteTasksScroll(tasks);
    

    const tasksValue = useMemo(() => ({
        tasks,
        deleteTasks,
        deleteAllTasks,
        toggleTaskComplete,
        addTask
    }), [
        tasks,
        deleteTasks,
        deleteAllTasks,
        toggleTaskComplete,
        addTask
    ]);

    const searchValue = useMemo(() => ({
        searchQuery,
        setSearchQuery,
        filteredTasks
    }), [
        searchQuery,
        setSearchQuery,
        filteredTasks
    ]);

    const uiValue = useMemo(() => ({
        newTaskInputRef,
        disappearingTaskId,
        appearingTaskId,
        firstIncompleteTaskRef,
        firstIncompleteTaskId
    }), [
        newTaskInputRef,
        disappearingTaskId,
        appearingTaskId,
        firstIncompleteTaskRef,
        firstIncompleteTaskId
    ]);

    return (
        <TasksContext.Provider value={tasksValue}>
            <SearchContext.Provider value={searchValue}>
                <UIStateContext value={uiValue}>
                    {children}
                </UIStateContext>
            </SearchContext.Provider>
        </TasksContext.Provider>
    );
}