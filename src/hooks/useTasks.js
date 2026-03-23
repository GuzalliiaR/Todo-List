import {
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo,
} from "react";
import useTasksLocalStorage from "./useTasksLocalStorage";

const useTasks = () => {
    const {
        savedTasks,
        saveTasks
    } = useTasksLocalStorage();

    const [tasks, setTasks] = useState(savedTasks || [
        { id: "task-1", title: "Купить молоко", isDone: false },
        { id: "task-2", title: "Погладить кота", isDone: true },
    ]);

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const newTaskInputRef = useRef(null);

    const deleteAllTasks = useCallback(() => {
        const isConfirmed = confirm("Вы уверены, что хотите удалить все задачи?");

        if (isConfirmed) setTasks([]);
    }, []);

    const deleteTasks = useCallback((taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    }, [tasks]);

    const toggleTaskComplete = useCallback((taskId, isDone) => {
        setTasks(
            tasks.map((task) => {
                if (task.id === taskId) {
                    task.isDone = isDone;
                };
                return task;
            })
        );
    }, [tasks]);

    const addTask = useCallback(() => {
        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false
            };

            setTasks(prevTasks => ([...prevTasks, newTask]));
            setNewTaskTitle('');
            setSearchQuery('');

            newTaskInputRef.current.focus();
        };
    }, [newTaskTitle]);


    useEffect(() => {
        newTaskInputRef.current.focus();
    }, []);

    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);


    const filteredTasks = useMemo(() => {
        const clearSearchQuery = searchQuery.trim().toLowerCase();

        return clearSearchQuery.length > 0
            ? tasks.filter((task) => task.title.toLowerCase().includes(clearSearchQuery))
            : null
    }, [searchQuery, tasks]);

    return {
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
        addTask
    };
};

export default useTasks;