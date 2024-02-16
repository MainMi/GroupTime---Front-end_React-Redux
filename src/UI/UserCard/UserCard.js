import AvatarImg from '../AvatarImg/AvatarImg';
import classes from './UserCard.module.scss'

const UserCard = (props) => {
    const {
        avatar = null,
        fullName,
        role
    } = props;

    return (
        <div className={classes.userCard}>
            <AvatarImg size={'small'} src={avatar}></AvatarImg>
            <div className={classes.userInfo}>
                <h3>{fullName}</h3>
                <div className={classes.userStatus}>
                    <img></img>
                    <div>{role}</div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;