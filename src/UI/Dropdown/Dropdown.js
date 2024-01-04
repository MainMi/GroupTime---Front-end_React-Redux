import { useState } from 'react';
import classes from './Dropdown.module.scss'

const Dropdown = (props) => {
    const { label, id, error = '', size = 14, style, children, ...otherProps } = props;

    const [ isList, setIsList ] = useState(false);

    const clickHandler = (ev) => {
        ev.preventDefault();
        setIsList((prevState) => !prevState);
    }

    const classNameButton = `${classes.dropdown} ${error ? classes.error : ''} ${isList ? classes.active : ''}`;
    const classNameList = `${classes.dropdownList} ${isList ? classes.active : ''}`;

    const styleSize = { fontSize: `${size}px`};
    const inputSize = { ...styleSize, height: `${size + 18}px`, ...style};

    return <div className={classes.labelBox}>
        <button id={id} style={inputSize}  className={classNameButton} {...otherProps} onClick={clickHandler}>{label}
        </button>
        <ul className={classNameList}>
            {children}
        </ul>
        {!!error.lenght || <div className={classes.error}>{error}</div>}
    </div>
}

export default Dropdown;