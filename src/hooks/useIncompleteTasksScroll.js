import {
    useRef
} from "react";

const useIncompleteTasksScroll = (tasks) => {
    const firstIncompleteTaskRef = useRef(null);
    const firstIncompleteTaskId = tasks.find((task) => task.isDone === false)?.id;

    return {
        firstIncompleteTaskRef,
        firstIncompleteTaskId
    }
};

export default useIncompleteTasksScroll;