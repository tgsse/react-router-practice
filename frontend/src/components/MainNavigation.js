import classes from './MainNavigation.module.css';
import {NavLink} from "react-router-dom";

function MainNavigation() {
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink to={'/'} className={({isActive}) => isActive ? classes.active : null}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/events'} end className={({isActive}) => isActive ? classes.active : null}>Events</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/events/new'} className={({isActive}) => isActive ? classes.active : null}>New Event</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;
