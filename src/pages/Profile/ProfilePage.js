import Button from '../../UI/Button/Button';
import GroupCard from '../../UI/GroupCard/GroupCard';
import HeaderImg from '../../UI/HeaderImg/HeaderImg';
import buttonsImages from '../../static/image/buttonIcons';
import contactImages from '../../static/image/contactsIcons';
import classes from './ProfilePage.module.scss'

const ProfilePage = () => {
    return <div>
        <HeaderImg position={'absolute'}/>
        <div className={classes.content}>
            <div className={classes.userBox}>
                <img></img>
                <div className={classes.defaultImgBox}>
                    <img></img>
                </div>
                <div className={classes.userInfo}>
                    <h1>Прізвище Ім’я По-батькові</h1>
                    <div className={classes.userNickname}>@Nickname</div>
                    <div className={classes.contactInfoMain}>
                        <Button beforeImg={contactImages.gmail} padding={'4px 16px'}>@jstudent.k</Button>
                        <Button beforeImg='edit' padding={'4px 16px'}>Вік: 18</Button>
                        <Button beforeImg={contactImages.phone} padding={'4px 16px'}>0687563756</Button>
                    </div>
                </div>
            </div>
            <div className={classes.userContact}>
                <p>Про себе:</p>
                <div className={classes.contactBox}>
                    <img src={contactImages.telegram} alt='telegram'></img>
                    <div>@JStudent222</div>
                </div>
                <div className={classes.contactBox}>
                    <img src={contactImages.linkedIn} alt='linkedIn'></img>
                    <div>@JStudt</div>
                </div>
                <div className={classes.contactBox}>
                <img src={contactImages.github} alt='github'></img>
                    <div>@JStkfkkfddddвudent</div>
                </div>
            </div>
            <div className={classes.groupsBox}>
                <h4>Группи:</h4>
                <GroupCard type='add'></GroupCard>
                <GroupCard></GroupCard>
                <GroupCard></GroupCard>
            </div>
            <div className={classes.buttonBox}>
                <Button >Вийти</Button>
                <Button typeColor='green'>Пітвердити</Button>
            </div>
        </div>
    </div>
}

export default ProfilePage;