import classes from './MainNavigation.module.css';
import {Form, NavLink, useRouteLoaderData} from "react-router-dom";

function MainNavigation() {
    const token = useRouteLoaderData('root')
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink to={'/'} className={({isActive}) => isActive ? classes.active : null}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/events'} end
                                 className={({isActive}) => isActive ? classes.active : null}>Events</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/events/new'} className={({isActive}) => isActive ? classes.active : null}>New
                            Event</NavLink>
                    </li>
                    {token ? (
                        <li>
                            <Form action={'/logout'}>
                                <button>Logout</button>
                            </Form>
                        </li>
                    ) : (
                        <li>
                            <NavLink to={'/auth?mode=login'}
                                     className={({isActive}) => isActive ? classes.active : null}>Authentication</NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;
