import { useState } from 'react';
import classes from './Checkbox.module.scss'

const  Checkbox = (props) => {
    const {
        typeColor,
        size = 22,
        error = false,
        readOnly = false,
        defaultChecked = false,
        children,
        ...otherParameters
    } = props;

    const [ checked, setChehecked ] = useState(defaultChecked);

    const clickChangeHandler = () => !readOnly
        ? setChehecked((prevState) => !prevState)
        : () => {};

    const className = `${classes.checkBox} ${typeColor === 'green' ? classes.green : ''} ${error ? classes.error : ''}`;

    return <label className={classes.labelBox}>
        <input type="checkbox" className={className} onChange={clickChangeHandler} checked={checked} {...otherParameters }  />
        <span>{children}</span>
    </label>
        
}

export default Checkbox;