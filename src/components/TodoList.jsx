import TodoItem from "./TodoItem";

const TodoList = (props) => {
    const {
        tasks = [],
        onDeleteTaskButtonClick,
        onTaskCopmleteChange
    } = props;

    const hasTasks = true;

    if (!hasTasks) {
        return <div className="todo__empty-message"></div>
    };

    return (
        <ul className="todo__list">
            {tasks.map((task) => (
                <TodoItem
                    className="todo__item"
                    key={task.id}
                    onDeleteTaskButtonClick={onDeleteTaskButtonClick}
                    onTaskCopmleteChange={onTaskCopmleteChange}
                    {...task}
                />
            ))}
        </ul>
    )
};

export default TodoList;