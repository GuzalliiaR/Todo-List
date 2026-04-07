import { BASE_URL } from '@/shared/constants'; 

// Компонент RouterLink обеспечивает роутинг без перезагрузки страницы приложения
const RouterLink = (props) => {
    const {
        to,
        children,
        ...rest
    } = props;

    const handleClick = (e) => {
        // отменяем дефолтное поведение ссылки <a>
        e.preventDefault();
        // изменяем url адрес страницы на {to} без перезагрузки страницы и добаляем новую запись в истории просмотров
        window.history.pushState({}, '', to);
        // вручную вызываем событие popstate (искусственно с помощью window.dispatchEvent сообщаем браузеру что произошло событие),
        // ч/б Router.jsx узнал, что путь изменился и обновил свое состояние
        window.dispatchEvent(new PopStateEvent('popstate'));
        // new PopStateEvent('popstate') - это создание нового объекта события JavaScript, 
        // которое сигнализирует об изменении истории браузера 
    };

    return (
        <a href={`${BASE_URL}${to}`} onClick={handleClick} {...rest}>
            {children}
        </a>
    );
};

export default RouterLink;