import {
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo,
} from "react";
import tasksAPI from "../../../api/tasksAPI";

const useTasks = () => {

    const [tasks, setTasks] = useState([]);

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [disappearingTaskId, setDisappearingTaskId] = useState(null);
    const [appearingTaskId, setAppearingTaskId] = useState(null);

    const newTaskInputRef = useRef(null);

    const deleteAllTasks = useCallback(() => {
        const isConfirmed = confirm("Вы уверены, что хотите удалить все задачи?");
        
        if (isConfirmed) {
            tasksAPI.deleteAll(tasks)
                .then(() => setTasks([]));
        };
    }, [tasks]);

    const deleteTasks = useCallback((taskId) => {
        tasksAPI.delete(taskId)
            .then(() => {
                setDisappearingTaskId(taskId);
                setTimeout(() => {
                    setTasks(
                        tasks.filter((task) => task.id !== taskId)
                    );
                    setDisappearingTaskId(null);
                }, 400);
            });
    }, [tasks]);

    const toggleTaskComplete = useCallback((taskId, isDone) => {
        tasksAPI.toggleComplete(taskId, isDone)
            .then(() => {
                setTasks(
                    tasks.map((task) => {
                        if (task.id === taskId) {
                            task.isDone = isDone;
                        };
                        return task;
                    })
                );
            });
    }, [tasks]);

    const addTask = useCallback((title) => {
        const newTask = {
            title: title,
            isDone: false
        };

        tasksAPI.add(newTask)
            .then((addedTask) => {
                setTasks(prevTasks => ([...prevTasks, addedTask]));
                setNewTaskTitle('');
                setSearchQuery('');
                newTaskInputRef.current.focus();

                setAppearingTaskId(addedTask.id);
                setTimeout(() => {
                    setAppearingTaskId(null);
                }, 400);
            });
    }, []);


    useEffect(() => {
        newTaskInputRef.current.focus();
        tasksAPI.getAll().then((data) => setTasks(data));
    }, []);


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
        addTask,
        disappearingTaskId,
        appearingTaskId
    };
};

export default useTasks;