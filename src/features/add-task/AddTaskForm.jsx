import { useContext, useState } from "react";
import { TasksContext, UIStateContext } from "@/entities/todo";
import Field from "@/shared/ui/Field";
import Button from "@/shared/ui/Button";

const AddTaskForm = (props) => {
    const { styles } = props;

    const [newTaskTitle, setNewTaskTitle] = useState('');

    const { addTask } = useContext(TasksContext);

    const { newTaskInputRef } = useContext(UIStateContext)

    const [error, setError] = useState('');

    const clearNewTaskTitle = newTaskTitle.trim();
    const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0;

    const onSubmit = (e) => {
        e.preventDefault();

        if (!isNewTaskTitleEmpty) {
            addTask(
                clearNewTaskTitle,
                () => setNewTaskTitle('')
            );
        };
    };

    const onChange = (e) => {
        const { value } = e.target;
        const clearValue = value.trim();
        const hasOnlySpaced = value.length > 0 && clearValue.length === 0;

        setNewTaskTitle(value);
        setError(hasOnlySpaced ? "The task cannot be empty" : "");
    }

    return (
        <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
            <Field
                className={styles.field}
                id="new-task"
                label="New task title"
                value={newTaskTitle}
                error={error}
                onChange={(e) => onChange(e)}
                ref={newTaskInputRef}
            />
            <Button
                type='submit'
                isDisebled={isNewTaskTitleEmpty}
            >
                Add
            </ Button>
        </form>
    );
};

export default AddTaskForm;