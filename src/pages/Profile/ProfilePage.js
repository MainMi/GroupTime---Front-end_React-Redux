import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAuth } from '../../redux/actions/auth-actions';
import { authAction } from '../../redux/slices/auth-slice';

import Button from '../../UI/Button/Button';
import GroupCard from '../../UI/GroupCard/GroupCard';
import HeaderImg from '../../UI/HeaderImg/HeaderImg';
import buttonsImages from '../../static/image/buttonIcons';
import contactImages from '../../static/image/contactsIcons';
import classes from './ProfilePage.module.scss'
import NotFoundGroups from '../../components/Group/NotFoundGroups/NotFoundGroups';
import AvatarImg from '../../UI/AvatarImg/AvatarImg';

const GroupsCards = ({ userGroups }) => {
    return userGroups.map((group, index) => 
            <GroupCard
                key={index}
                title={group.group.name}
                description={group.group.description}
                status={group.type}
                usersCount={group.group.userCount}
                maxCount={group.group.parameters.usersLimit}
                statusName={group.role}
            ></GroupCard>
    )
}

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        dispatch(
            fetchAuth(
                (data) => {
                    console.log('Authorized:', data);
                    setUserInfo(data);
                },
                navigate
            )
        );
    }, [dispatch, navigate]);

    if (!userInfo) {
        return null;
    }

    const userGroups = userInfo.groups;
    const userContacts = userInfo.contacts;

    const hasContactInfo = Object.values(userContacts).some((contactValue) => contactValue);

    const getAge = (dateString) => { 
        const today = new Date();
        const birthDate = new Date(dateString);
        const m = today.getMonth() - birthDate.getMonth();
        const age = today.getFullYear() - birthDate.getFullYear() - (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()));
        return age;
    }

    const userAge = getAge(userInfo.birthday);

    const handleLogout = () => {
        dispatch(authAction.logOutAuth());
        navigate('/sign?mode=signIn');
    };

    return <div>
        <HeaderImg position={'absolute'}/>
        <div className={classes.content}>
            <div className={classes.userBox}>
                <img></img>
                <AvatarImg size={'large'}></AvatarImg>
                <div className={classes.userInfo}>
                    <h1>{userInfo.fullName}</h1>
                    <div className={classes.userNickname}>{userInfo.nickname}</div>
                    <div className={classes.contactInfoMain}>
                        <Button beforeImg={contactImages.gmail} padding={'4px 16px'}>{userInfo.email}</Button>
                        <Button beforeImg='edit' padding={'4px 16px'}>Вік: {userAge}</Button>
                        {
                            userInfo.phone ? <Button beforeImg={contactImages.phone} padding={'4px 16px'}>{userInfo.phone}</Button> : ''
                        }
                    </div>
                </div>
            </div>
            <div className={classes.userContact}>
                { hasContactInfo && <p>Про себе:</p> }
                {
                    Object.entries(userContacts).map(([contactType, contactValue], index) => (
                        contactValue && <div key={index} className={classes.contactBox}>
                            <img src={contactImages[contactType.toLowerCase()]} alt={contactType}></img>
                            <div>{contactValue}</div>
                        </div>
                    ))
                }
            </div>
            <div className={classes.groupsBox}>
                <h4>Группи:</h4>
                { userGroups.length ? <GroupsCards userGroups={userGroups}></GroupsCards> : <NotFoundGroups className={classes.notFoundGroups}/> }
            </div>
            <div className={classes.buttonBox}>
                <Button onClick={handleLogout}>Редагувати</Button>
                <Button typeColor='green'>Вихід з акаунту</Button>
            </div>
        </div>
    </div>
}

export default ProfilePage;
