import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAuth } from '../../store/actions/auth-actions';

import Button from '../../UI/Button/Button';
import GroupCard from '../../UI/GroupCard/GroupCard';
import HeaderImg from '../../UI/HeaderImg/HeaderImg';
import buttonsImages from '../../static/image/buttonIcons';
import contactImages from '../../static/image/contactsIcons';
import classes from './ProfilePage.module.scss'

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

    return <div>
        <HeaderImg position={'absolute'}/>
        <div className={classes.content}>
            <div className={classes.userBox}>
                <img></img>
                <div className={classes.defaultImgBox}>
                    <img></img>
                </div>
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
                <h4>Группи: {!userGroups.length && 'відсутні'}</h4>
                {
                    userGroups.map((group, index) => 
                        <GroupCard
                            key={index}
                            title={group.group.name}
                            description={group.group.description}
                            status={group.type}
                            usersCount={group.group.userCount}
                            maxCount='999'
                            statusName={group.role}
                        ></GroupCard>
                    )
                }
            </div>
            <div className={classes.buttonBox}>
                <Button>Вийти</Button>
                <Button typeColor='green'>Пітвердити</Button>
            </div>
        </div>
    </div>
}

export default ProfilePage;