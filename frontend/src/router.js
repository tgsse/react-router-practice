import {createBrowserRouter} from 'react-router-dom'
import HomePage from "./pages/HomePage";
import EditEventPage from "./pages/EditEventPage";
import NewEventPage from "./pages/NewEventPage";
import EventsPage, {eventsLoader} from "./pages/EventsPage";
import EventDetailPage, {deleteItemAction, eventDetailLoader} from "./pages/EventDetailPage";
import MainNavigation from "./components/Root";
import EventsRootLayout from "./components/EventsRootLayout";
import {editOrCreateEventAction} from "./components/EventForm";
import Authentication, {authAction} from "./pages/Authentication";
import {logoutAction} from "./pages/Logout";
import {checkAuthLoader, tokenLoader} from "./util/util";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainNavigation/>,
        id: 'root',
        loader: tokenLoader,
        children: [
            {index: true, element: <HomePage/>},
            {
                path: 'auth',
                element: <Authentication />,
                action: authAction,
            },
            {
                path: '/events',
                element: <EventsRootLayout/>,
                children: [
                    {
                        index: true,
                        element: <EventsPage/>,
                        loader: eventsLoader,
                    },
                    {path: '/events/:id', element: <EventDetailPage/>, loader: eventDetailLoader, action: deleteItemAction},
                    {path: '/events/:id/edit', element: <EditEventPage/>, loader: eventDetailLoader, action: editOrCreateEventAction},
                    {path: '/events/new', element: <NewEventPage/>, action: editOrCreateEventAction, loader: checkAuthLoader},
                ]
            },
            {
                path: 'logout',
                action: logoutAction,
            }
        ]
    },
])

export default router
