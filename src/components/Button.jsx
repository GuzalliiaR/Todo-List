const Button = (props) => {
    /* значения по умолчания, если не передано через props от родителя иное */
    const {
        className = '',
        type = 'button',
        isDisebled,
        children,
        onClick
    } = props;

    return (
        <button
            className={`button ${className}`} 
            type={type}
            disabled={isDisebled}
            onClick={onClick}
        >
            {children}
        </button>
    )
};

export default Button;