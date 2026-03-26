import { useEffect, useState } from "react";
import tasksAPI from "../api/tasksAPI";

const TaskPage = (props) => {
    const { params } = props;

    const taskId = params.id;

    const [task, setTask] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    // useEffect срабатывает параллельно с return <div>Loading...</div>
    useEffect(() => {
        tasksAPI.getById(taskId)
            .then((data) => {
                setTask(data);
                setHasError(false);
            })
            .catch((error) => {
                console.log(error);
                setHasError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    console.log('isLoading: ', isLoading, 'hasError: ', hasError);

    // Это условие сработает при первом рендере страницы
    if (isLoading) {
        return <div>Loading...</div>;
    };

    // Один из двух нижних return сработает во втором рендеринге, когда отработает then или catch в useEffect
    if (hasError) {
        return <div>Task not found!</div>;
    };

    return (
        <div>
            <h1>{task.title}</h1>
            <p> {task.isDone ? 'Задача выполнена' : 'Задача не выполнена'} </p>
        </div>
    );
};

export default TaskPage;