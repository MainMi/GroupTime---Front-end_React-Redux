import GroupCard from '../../UI/GroupCard/GroupCard';
import HeaderImg from '../../UI/HeaderImg/HeaderImg';
import classes from './GroupsPage.module.scss';

import searchIcon from '../../static/image/inputIcons/searchIcon.svg'
import Button from '../../UI/Button/Button';

const NotFoundGroups = () => {
    return (
        <div className={classes.notFound}>
            <p>За данним пошуком груп не знайдено. <a>Створити группу?</a></p>
        </div>
    )
}

const GroupsCards = ({ groups }) => {
    return <div className={classes.groupsBox}>
        {groups.map((group, index) => 
        <GroupCard 
            key={index}
            title={group.name}
            description={group.description}
            status={group.type}
            usersCount={group.userCount}
            maxCount={group.maxCount}
            type = 'add'
        />)}
    </div>
}

const GroupPage = () => {
    const dummy_groups = [
        {
            name: 'IP-22',
            description: 'Опис групи',
            type: 'private',
            userCount: 12,
            maxCount: 15
        },
        {
            name: 'IP-24',
            description: '',
            type: 'public',
            userCount: 25,
            maxCount: 50
        },
        {
            name: 'IP-25',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            type: 'public',
            userCount: 39,
            maxCount: 50
        },
    ]
    const empty_data = [];
    return (
        <div className={classes.content}>
            <HeaderImg/>
            <div className={classes.container}>
                <h1>Мої группи</h1>
                <div className={classes.searchBox}>
                    <img src={searchIcon} alt='search'></img>
                    <input type="text" className={classes.searchInput} name='search' placeholder="Введіть назву группи"/>
                </div>
                {empty_data.length ? <GroupsCards groups={dummy_groups}/> : <NotFoundGroups/>}
                <div className={classes.buttonBox}>
                    <Button>Створити групу</Button>
                </div>
            </div>
        </div>
    );
};

export default GroupPage;