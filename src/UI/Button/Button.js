import classes from './Button.module.scss'
import buttonsImage from '../../static/image/buttonIcons/'

const Button = (props) => {
    let {
        typeColor = 'pink',
        type = 'border',
        disabled = false,
        active = false,
        size = 16,
        beforeImg = false,
        afterImg = false,
        className = '',
        onClick = () => {},
        ...otherStyles
    } = props;
    if (beforeImg) {
        beforeImg = beforeImg in buttonsImage ? buttonsImage[beforeImg] : beforeImg
    }
    if (afterImg) {
        afterImg = afterImg in buttonsImage ? buttonsImage[afterImg] : afterImg
    }
    const newClassName = `${classes.button} ${typeColor === 'green' ? classes.green : ''} ${type === 'noBorder' ? classes.noBorder : ''} ${active ? classes.active : ''} ${props.className}`;

    const imgSizeStyle = { width: `${size}px`, height: `${size}px`};

    return <button className={newClassName} disabled={disabled} onClick={onClick} style={{ fontSize: `${size}px`, ...otherStyles}}>
        {beforeImg && <img src={beforeImg} style={imgSizeStyle} alt='bImg'/>}
        <div>{props.children}</div>
        {afterImg && <img src={afterImg} style={imgSizeStyle} alt='aImg'/>}
    </button>
}

export default Button;