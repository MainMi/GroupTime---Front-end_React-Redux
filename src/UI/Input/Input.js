import { useState } from 'react';
import classes from './Input.module.scss'
import openEyes from '../../static/image/inputIcons/openEyes.svg'
import closeEyes from '../../static/image/inputIcons/closeEyes.svg'

const Input = (props) => {
    const { label, id, error = '', size = 14, type = 'text', style,  ...otherProps } = props;

    const className = `${classes.input} ${error ? classes.error : ''}`
    const styleSize = { fontSize: `${size}px`};
    const inputSize = { ...styleSize, height: `${size + 18}px`, ...style};

    const [ typeInput, setTypeInput ] = useState(type);
    const isPassword = typeInput === 'password';

    const onHiddenText = () => setTypeInput(isPassword ? 'text' : 'password');

    return <div className={classes.labelBox}>
        <label htmlFor={id} style={styleSize}>{label}</label>
        <input
            id={id}
            type={typeInput}
            className={className}
            style={inputSize}
            {...otherProps}
        >
        </input>
        {type === 'password' && <img src={ isPassword ? openEyes : closeEyes } onClick={onHiddenText} alt='c'></img>}
        {!!error.lenght || <div className={classes.error}>{error}</div>}
    </div>
}

export default Input;