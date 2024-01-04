import classes from './Modal.module.scss';
import ReactDOM from 'react-dom'

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onHiddenCart}></div>
}

const ModalOverlays = (props) => {
    return <div className={classes.modal} style={{...props.otherStyles}}>
            {props.children}
        </div>
}
const overlays = document.getElementById('overlays');
const Modal = (props) => {
    const { children, onHiddenCart, ...otherStyles } = props;
    return <>
        {ReactDOM.createPortal(<div className={classes.content}>
            <ModalOverlays {...otherStyles}>{children}</ModalOverlays>, overlays
            <Backdrop onHiddenCart={onHiddenCart}/>
        </div>, overlays)}
    </>
        
}
export default Modal;