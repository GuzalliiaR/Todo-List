import TodoItem from "./TodoItem";

const TodoList = (props) => {
    const {
        tasks = [],
        filteredTasks,
        onDeleteTaskButtonClick,
        onTaskCopmleteChange,
    } = props;

    const hasTasks = tasks.length > 0;
    const isEmptyFilteredTasks = filteredTasks ? filteredTasks.length === 0 : false;

    if (!hasTasks) {
        return <div className="todo__empty-message">Задач пока нет</div>
    };

    if (hasTasks && isEmptyFilteredTasks) {
        return <div className="todo__empty-message">Задачи не найдены</div>
    }

    return (
        <ul className="todo__list">
            {(filteredTasks || tasks).map((task) => (
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