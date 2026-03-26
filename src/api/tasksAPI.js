const URL = 'http://localhost:3001/tasks';

const headers = {
    'Content-Type': 'application/json'
};

const tasksAPI = {
    getAll: () => { 
        return fetch(URL)
            .then((response) => response.json())  // Сообщаем серверу, что данные необходимо вернуть в .json
    },

    getById: (taskId) => {
        return fetch(`${URL}/${taskId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                };
                return response.json();
            })
    },

    add: (newTask) => {
        return fetch(URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(newTask)
        })
            .then((response) => response.json())  // сервер вернет новый объект-задачу, который только что появился в бвзе db
    },

    delete: (taskId) => {
        return fetch(`${URL}/${taskId}`, { method: 'DELETE' })
    },

    deleteAll: (tasks) => {
        // Promise.all() — это метод JavaScript, который принимает массив промисов и ожидает
        // выполнения всех их, а затем возвращает один промис с массивом результатов.
        return Promise.all(
            tasks.map((task) => tasksAPI.delete(task.id))
        )
    },

    toggleComplete: (taskId, isDone) => {
        return fetch(`${URL}/${taskId}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ isDone })   // Изменяем у объекта task с id=taskId значение isDone на isDone
        })
    },
};

export default tasksAPI;