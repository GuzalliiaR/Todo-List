import localAPI from "./local";
import serverAPI from "./server";

// import.meta.env -  это глобальный объект, который Vite предоставляет для доступа к переменным окружения во время выполнения.
// переменным окружения позволяют настраивать поведение приложения в зависимости от окружения (разработка, продакшн, тестирование и т.д.).
// import.meta.env.VITE_STATIC_BACKEND - это переменная окружения, объявленная в файле .env.production в корне проекта
const isLocal = import.meta.env.VITE_STATIC_BACKEND === 'true';

const tasksAPI = isLocal ? localAPI : serverAPI;

export default tasksAPI;