const Field = (props) => {
    const {
        className = '',
        id,
        label,
        type = 'text',
        value,
        onChange,
        ref
    } = props;

    return (
        <div className={`field ${className}`}>
            <label
                className="field__label"
                htmlFor={id}
            >
                {label}
            </label>
            <input
                className="field__input"
                id={id}
                placeholder=" "
                autoComplete="off"
                type={type}
                value={value}
                onChange={onChange}
                ref={ref}
            />
        </div>
    )
}

export default Field;