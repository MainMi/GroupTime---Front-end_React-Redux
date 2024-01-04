import classes from './Textarea.module.scss'

const Textarea = (props) => {
    const { label, id, error = '', size = 14, type = 'text', style,  ...otherProps } = props;
    console.log(error);
    const className = `${classes.input} ${error ? classes.error : ''}`
    const styleSize = { fontSize: `${size}px`};
    const inputSize = { ...styleSize, height: `${size + 18}px`, ...style};
    return <div className={classes.labelBox}>
        <label htmlFor={id} style={styleSize}>{label}</label>
        <textarea
            id={id}
            type={type}
            className={className}
            style={inputSize}
            {...otherProps}
        >
        </textarea>
        {!!error.lenght || <div className={classes.error}>{error}</div>}
    </div>
}

export default Textarea;