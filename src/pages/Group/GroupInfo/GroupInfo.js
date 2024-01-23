import AvatarImg from '../../../UI/AvatarImg/AvatarImg';
import Button from '../../../UI/Button/Button';
import HeaderImg from '../../../UI/HeaderImg/HeaderImg';
import UserCard from '../../../UI/UserCard/UserCard';
import buttonsImages from '../../../static/image/buttonIcons';
import classes from './GroupInfo.module.scss';

const GroupInfo = () => {
    return (
        <div className={classes.content}>
            <HeaderImg />
            <div className={classes.container}>
                <Button typeColor='green' beforeImg='chevron' className={classes.btn}>Назад</Button>
                <div className={classes.groupInfoBox}>
                    <AvatarImg size={'large'}></AvatarImg>
                    <div className={classes.groupInfo}>
                        <h1>ІП-24</h1>
                        <div className={classes.buttonBox}>
                            <div className={classes.groupInfoBtn}>
                                <img src={buttonsImages['LockClose-pink']}></img>
                                private
                            </div>
                            <div className={`${classes.groupInfoBtn} ${classes.green}`}>
                                <img src={buttonsImages['people-green']}></img>
                                13/50
                            </div>
                        </div>
                        <p>Опис: Утопія ґрунтується на ідеї, що гроші корумпують владу і знищують справедливість і щастя в суспільстві. Гітлодей зазначає, що навіть найбагатші люди все одно нещасливі.</p>
                        <div className={classes.buttonBox}>
                            <Button>Видалити групу</Button>
                            <Button typeColor='green'>Редагувати</Button>
                        </div>
                    </div>
                </div>
                <div className={classes.userBox}>
                    <p>Учасники групи</p>
                    <div className={classes.usersBox}>
                        <UserCard></UserCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupInfo;