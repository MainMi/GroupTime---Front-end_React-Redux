import GroupCard from '../../../UI/GroupCard/GroupCard';
import HeaderImg from '../../../UI/HeaderImg/HeaderImg';
import classes from './GroupsSearch.module.scss';

import searchIcon from '../../../static/image/inputIcons/searchIcon.svg'
import Button from '../../../UI/Button/Button';
import NotFoundGroups from '../../../components/Group/NotFoundGroups/NotFoundGroups';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import urlEnum from '../../../constants/urlEnum';
import { getFetch } from '../../../redux/actions/auth-actions';

const GroupsCards = ({ groups }) => {
    return <div className={classes.groupsBox}>
        {groups.map((group, index) => 
        <GroupCard 
            id={group._id}
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

const GroupSearch = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);

    const showResults = (data, navigate, dispatch) => {
        setSearchResults(data);
        setIsSearchPerformed(true);
    }

    const handleSearch = async (event) => {
        event.preventDefault();
        if (!searchText) {
            return;
        }

        const params = {
            url: `${urlEnum.searchGroup}?query=${encodeURIComponent(searchText)}`,
            method: 'GET'
        }

        try {
            await getFetch(params, navigate, showResults)(dispatch);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={classes.content}>
            <HeaderImg/>
            <div className={classes.container}>
                <h1>Пошук группи</h1>
                <form onSubmit={handleSearch} className={classes.searchBox}>
                    <img
                        onClick={handleSearch}
                        src={searchIcon}
                        alt='search'
                        style={{cursor: 'pointer'}}
                    ></img>
                    <input
                        type='text'
                        className={classes.searchInput}
                        name='search'
                        placeholder='Введіть назву группи'
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </form>
                {isSearchPerformed && searchResults.length ? (
                    <GroupsCards groups={searchResults}/>
                ) : null}
                {isSearchPerformed && searchResults.length === 0 ? (
                    <NotFoundGroups/>
                ) : null}
                <div className={classes.buttonBox}>
                    <Button>Створити групу</Button>
                </div>
            </div>
        </div>
    );
};

export default GroupSearch;