import { AppProvider } from "@/entities/todo";
import Todo from "@/widgets/Todo";

const TasksPage = () => {
    return (
        <AppProvider>
            <Todo />
        </AppProvider>
    );
};

export default TasksPage;