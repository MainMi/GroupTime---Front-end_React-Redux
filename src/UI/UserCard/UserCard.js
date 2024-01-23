import AvatarImg from '../AvatarImg/AvatarImg';
import classes from './UserCard.module.scss'

const UserCard = () => {
    return (
        <div className={classes.userCard}>
            <AvatarImg size={'small'}></AvatarImg>
            <div className={classes.userInfo}>
                <h3>Максим Бєліков Романович</h3>
                <div className={classes.userStatus}>
                    <img></img>
                    <div>Староста</div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;