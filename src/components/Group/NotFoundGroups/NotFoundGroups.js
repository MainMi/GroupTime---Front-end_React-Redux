import classes from './NotFoundGroups.module.scss'

const NotFoundGroups = (props) => {
    return (
        <div className={`${classes.notFound} ${props.className}`}>
            <p>За данним пошуком груп не знайдено. <a>Створити группу?</a></p>
        </div>
    )
}

export default NotFoundGroups;