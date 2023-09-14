import EventsList from '../components/EventsList';
import {useLoaderData} from "react-router-dom";

function EventsPage() {
    const fetchedEvents = useLoaderData()

    console.log(`loader:`, {fetchedEvents})
    return (
        <>
            {fetchedEvents.error ? (
                <p>{fetchedEvents.error.message}</p>
            ) : (
                <EventsList events={fetchedEvents.events}/>
            )}

        </>
    );
}

export default EventsPage;

export async function eventsLoader() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        const message = `${response.status}: ${response.statusText}`
        console.error(message)
        return {error: message}
    } else {
        const resData = await response.json();
        console.log(resData)
        return resData
    }
}
