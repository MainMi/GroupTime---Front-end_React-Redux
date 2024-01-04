import classes from './ButtonSmall.module.scss'
import buttonsImage from '../../static/image/buttonIcons'

const ButtonSmall = (props) => {
    let {
        typeColor = 'pink',
        size = 16,
        centerImg = false,
        className = '',
        ...otherStyles
    } = props;
    if (centerImg) {
        centerImg = centerImg in buttonsImage ? buttonsImage[centerImg] : centerImg
    }
    const newClassName = `${className} ${classes.buttonSmall} ${classes[typeColor]}`;
    console.log(newClassName, typeColor);
    const imgSizeStyle = { width: `${size}px`, height: `${size}px`};

    return <button className={newClassName} style={{ fontSize: `${size}px`, ...otherStyles}}>
        {centerImg && <img src={centerImg} style={imgSizeStyle} alt='cImg'/>}
    </button>
}

export default ButtonSmall;