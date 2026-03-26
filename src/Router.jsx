import { useState, useEffect } from "react";

// проверка соотвтетсвия path одному из шаблонов rout в объекте routes (из App.jsx)
const matchPath = (path, rout) => {
    const pathParts = path.split('/');  //   '/taska/123' => ['', 'tasks', '123'] реальный путь на страницы
    const routePaths = rout.split('/');  //   '/tasks/:id' => ['', 'tasks', ':id'] шаблоны пути

    if (pathParts.length !== routePaths.length) {
        return null;

    } else {
        const params = {};
        for (let i = 0; i < routePaths.length; i++) {
            if (routePaths[i].startsWith(':')) {
                const paramName = routePaths[i].slice(1); // убираем двоеточие
                params[paramName] = pathParts[i]; // в объект params добаавляем свойство id со значением pathParts[i]
            } else if (routePaths[i] !== pathParts[i]) {
                return null;
            }
        };

        return params;
    };
};

export const useRoute = () => {
    // path - текущий путь
    const [path, setPath] = useState(window.location.pathname);

    useEffect(() => {
        const onLocationChange = () => {
            // window.location.pathname возвращает путь и имя файла текущей веб-страницы (строка после домена)
            setPath(window.location.pathname);
        };
        // Событие popstate вызывается, когда изменяется активная запись истории
        // Chrome и Safari всегда вызывают popstate по окончании загрузки страницы
        window.addEventListener('popstate', onLocationChange);

        return () => {
            window.removeEventListener('popstate', onLocationChange);
        }
    }, []);

    return path;
};

const Router = (props) => {
    const { routes } = props;  // routes - это объект с путями
    const path = useRoute();

    for (const rout in routes) {
        const params = matchPath(path, rout);

        if (params) {
            const Page = routes[rout];

            return <Page params={params} />
        } 
    };

    const NotFound = routes['*']
    return <NotFound />
};

export default Router;