import AvatarImg from '../../../UI/AvatarImg/AvatarImg';
import Button from '../../../UI/Button/Button';
import HeaderImg from '../../../UI/HeaderImg/HeaderImg';
import UserCard from '../../../UI/UserCard/UserCard';
import buttonsImages from '../../../static/image/buttonIcons';
import classes from './GroupInfo.module.scss';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchGroupInfo } from '../../../redux/actions/group-info-action';

const GroupInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { groupId } = useParams();

    let groupInfo = useSelector(state => state.groupInfo);

    useEffect(() => {
        if (!groupInfo || !groupInfo.name || groupInfo.id !== groupId) {
            dispatch(fetchGroupInfo(groupId, navigate));
        }
    }, []);

    if (!groupInfo || !groupInfo.name || groupInfo.id !== groupId) {
        return <div>Loading...</div>
    }

    return (
        <div className={classes.content}>
            <HeaderImg />
            <div className={classes.container}>
                <Button typeColor='green' beforeImg='chevron' className={classes.btn} onClick={() => navigate(-1)}>Назад</Button>
                <div className={classes.groupInfoBox}>
                    <AvatarImg size={'large'} src={groupInfo.avatar}></AvatarImg>
                    <div className={classes.groupInfo}>
                        <h1>{groupInfo.name}</h1>
                        <div className={classes.buttonBox}>
                            <div className={classes.groupInfoBtn}>
                                <img src={groupInfo.type === 'public' ? buttonsImages['lockOpen-pink'] : buttonsImages['lockClose-pink']}></img>
                                {groupInfo.type}
                            </div>
                            <div className={`${classes.groupInfoBtn} ${classes.green}`}>
                                <img src={buttonsImages['people-green']}></img>
                                {groupInfo.userCount}/{groupInfo.parameters.usersLimit}
                            </div>
                        </div>
                        <p>{groupInfo.description}</p>
                        <div className={classes.buttonBox}>
                            <Button>Видалити групу</Button>
                            <Button typeColor='green'>Редагувати</Button>
                        </div>
                    </div>
                </div>
                <div className={classes.userBox}>
                    <p>Учасники групи: {groupInfo.userCount}</p>
                    <div className={classes.usersBox}>
                        {
                            groupInfo.users.map((userData) => (
                                <UserCard
                                    key={userData.id}
                                    avatar={userData.user.avatar}
                                    fullName={userData.user.fullName}
                                    role={userData.role}
                                ></UserCard>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupInfo;