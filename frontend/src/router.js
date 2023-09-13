import {createBrowserRouter} from 'react-router-dom'
import HomePage from "./pages/HomePage";
import EditEventPage from "./pages/EditEventPage";
import NewEventPage from "./pages/NewEventPage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import Root from "./components/Root";
import EventsRootLayout from "./components/EventsRootLayout";

async function fetchEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        console.error(`${response.status}: ${response.statusText}`)
    } else {
        const resData = await response.json();
        console.log(resData)
        return resData.events
    }
}

const router = createBrowserRouter([
    {
        path: '/', element: <Root/>, children: [
            {index: true, element: <HomePage/>},
            {
                path: '/events',
                element: <EventsRootLayout/>,
                loader: fetchEvents,
                children: [
                    {index: true, element: <EventsPage/>},
                    {path: '/events/:id', element: <EventDetailPage/>},
                    {path: '/events/new', element: <NewEventPage/>},
                    {path: '/events/:id/edit', element: <EditEventPage/>},
                ]
            },
        ]
    },
])

export default router
