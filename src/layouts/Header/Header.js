import classes from './Header.module.scss'
import groupsIcon from '../../static/image/menuIcons/groupsIcon.svg'
import userIcon from '../../static/image/menuIcons/userIcon.svg'
import scheduleIcon from '../../static/image/menuIcons/scheduleIcon.svg'
import homeIcon from '../../static/image/menuIcons/homeIcon.svg'
import { NavLink } from 'react-router-dom'

const AboutPage = () => {
    const navLinkHeader = ({ isActive }) => {
        return isActive ? classes.active : undefined;
    }

    const isLogin = false
    return <header className={classes.header}>
        <nav className={classes.navigate}>
            <NavLink className={navLinkHeader} to='/'><img src={homeIcon} alt="Home" /></NavLink>
            <NavLink className={navLinkHeader} to={isLogin ? '/profile' : '/sing'}><img src={userIcon} alt="User" /></NavLink>
            <NavLink className={navLinkHeader} to='/groups'><img src={groupsIcon} alt="Groups" /></NavLink>
            <NavLink className={navLinkHeader} to='/schedule'><img src={scheduleIcon} alt="Schedule" /></NavLink>
        </nav>
        <div className={classes.panelBox}>
            <button className={classes.detailBtn}></button>
        </div>
    </header>
}

export default AboutPage;