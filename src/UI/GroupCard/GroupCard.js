import classes from './GroupCard.module.scss'
import ButtonSmall from "../Button/ButtonSmall";
import buttonsImages from '../../static/image/buttonIcons';

const GroupCard = (props) => {
    const { type = 'view' } = props;
    const isView = type === 'view';
    return <div className={classes.content}>
        <div className={classes.groupInfo}>
            <div className={classes.infoBox}>
                <div className={classes.imgBox}>
                    <img></img>
                </div>
                <div className={classes.info}>
                    <h3>IP-22</h3>
                    <div className={classes.statusBox}>
                        <div className={classes.imgBox}>
                            <img src={buttonsImages.lockClose} alt='lockClose'></img>
                        </div>
                        <div className={classes.status}>Private</div>
                    </div>
                </div>
                <p className={classes.description}>Descriptio cnncncn xjjxjxj xjxjn</p>
            </div>
        </div>
        <div className={classes.groupNavigation}>
            <img></img>
            <p className={classes.userCount}>13/50</p>
            <ButtonSmall typeColor={isView ? "green" : "darkGreen"} className={isView ? classes.goToButton : classes.addButton} centerImg={isView ? 'chevron': 'plus'}/>
        </div>
    </div>
}

export default GroupCard;