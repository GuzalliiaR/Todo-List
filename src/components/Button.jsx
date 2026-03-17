const Button = (props) => {
    /* значения по умолчания, если не передано через props от родителя иное */
    const {
        className = '',
        type = 'button',
        children
    } = props;

    return (
        <button
            className={`button ${className}`} 
            type={type}
        >
            {children}
        </button>
    )
};

export default Button;