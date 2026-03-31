import { TasksProvider } from "../../context/TasksContext";
import Todo from "../../widgets/Todo";

const TasksPage = () => {
    return (
        <TasksProvider>
            <Todo />
        </TasksProvider>
    );
};

export default TasksPage;