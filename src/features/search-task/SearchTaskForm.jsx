import { useContext } from "react";
import Field from "../../components/Field/Field";
import { TasksContext } from "../../context/TasksContext";

const SearchTaskForm = (props) => {
    const { styles } = props;

    const {
        searchQuery,
        setSearchQuery
    } = useContext(TasksContext);

    return (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <Field
                className={styles.field}
                id="search-task"
                label="Search task"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </form>
    )
};

export default SearchTaskForm;