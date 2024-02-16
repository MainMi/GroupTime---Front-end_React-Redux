import classes from './GroupCard.module.scss'
import ButtonSmall from "../Button/ButtonSmall";
import buttonsImages from '../../static/image/buttonIcons';
import AvatarImg from '../AvatarImg/AvatarImg';

import { useNavigate } from 'react-router-dom';

const GroupCard = (props) => {
    const {
        id,
        avatar = null,
        title,
        description,
        status,
        statusName = status,
        usersCount,
        maxCount,
        type = 'view',
    } = props;

    const navigate = useNavigate();

    const isView = type === 'view';
    const isPrivate = status === 'private';

    const redirectToGroupInfo = () => {
        if (id) {
            navigate(`/groups/info/${encodeURIComponent(id)}`);
        }
    };

    return <div className={classes.content}>
        <div className={classes.groupInfo}>
            <div className={classes.infoBox}>
                <div className={classes.imgBox}>
                    <AvatarImg size={'small'} src={avatar}/>
                </div>
                <div className={classes.info}>
                    <h3>{title}</h3>
                    <div className={`${classes.statusBox} ${isPrivate ? classes.private : ''}`}>
                        <div className={classes.imgBox}>
                            <img src={buttonsImages[isPrivate ? 'lockClose' : 'lockOpen']} alt='lockClose'></img>
                        </div>
                        <div className={classes.status}>{statusName.charAt(0).toUpperCase() + statusName.slice(1)}</div>
                    </div>
                </div>
                <p className={classes.description}>{description}</p>
            </div>
        </div>
        <div className={classes.groupNavigation}>
            <img></img>
            <p className={classes.userCount}>{usersCount}/{maxCount}</p>
            <ButtonSmall
                typeColor={isView ? "green" : "darkGreen"}
                className={isView ? classes.goToButton : classes.addButton}
                centerImg={isView ? 'chevron': 'plus'}
                onClick={isView ? redirectToGroupInfo : null}
            />
        </div>
    </div>
}

export default GroupCard;