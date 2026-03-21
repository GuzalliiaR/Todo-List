import Field from "./Field";
import Button from "./Button";
import { useContext } from "react";
import { TasksContext } from "../context/TasksContext";

const AddTaskForm = () => {
    const {
        addTask,
        newTaskTitle,
        setNewTaskTitle,
        newTaskInputRef
    } = useContext(TasksContext);

    const onSubmit = (e) => {
        e.preventDefault();
        addTask();
    };

    return (
        <form className="todo__form" onSubmit={(e) => onSubmit(e)}>
            <Field
                className="todo__field"
                id="new-task"
                label="New task title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                ref={newTaskInputRef}
            />
            <Button type='submit'> Add </ Button>
        </form>
    );
};

export default AddTaskForm;