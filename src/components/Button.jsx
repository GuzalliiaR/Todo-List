const Button = (props) => {
    /* значения по умолчания, если не передано через props от родителя иное */
    const {
        className = '',
        type = 'button',
        children,
        onClick
    } = props;

    return (
        <button
            className={`button ${className}`} 
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    )
};

export default Button;