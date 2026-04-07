const STORAGE_KEY = 'tasks';

const read = () => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (err) {
        return []
    };
};

const write = (tasks) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

const delay = (ms = 150) => {
    return new Promise((resolve, _) => {
        setTimeout(resolve, ms)
    });
};


const localAPI = {
    getAll: async () => {
        await delay();

        return read();
    },

    getById: async (id) => {
        await delay();

        return read().find((task) => task.id === id) ?? null;
    },

    add: async (task) => {
        await delay();

        const newTask = {
            ...task,
            id: crypto?.randomUUID() ?? Date.now().toString(),
        };
        
        write([...read(), newTask]);

        return newTask;
    },

    delete: async (taskId) => {
        await delay();

        const tasks = read().filter((task) => task.id !== taskId);

        write(tasks);
    },

    deleteAll: async (tasks) => {
        await delay();

        write([]);
    },

    toggleComplete: async (taskId, isDone) => {
        await delay();

        const tasks = read().map((task) => {
            return task.id === taskId ? { ...task, isDone: isDone } : task;
        });

        write(tasks);
    },
};

export default localAPI;
