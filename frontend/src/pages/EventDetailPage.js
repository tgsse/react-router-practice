import {redirect, useLoaderData, useParams} from "react-router-dom";
import EventItem from "../components/EventItem";

export default function EventDetailPage() {
    const fetchedEvent = useLoaderData()
    console.log(`fetched event detail}`, {fetchedEvent})
    return (
        <>
            <h1>Events Detail Page</h1>
            {fetchedEvent.event && <EventItem event={fetchedEvent.event}/>}
        </>
    )
}

export async function eventDetailLoader({params}) {
    const response = await fetch(`http://localhost:8080/events/${params.id}`);

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

export async function deleteItemAction({params, request}) {
    try {
        const response = await fetch(`http://localhost:8080/events/${params.id}`, {
            method: request.method
        })
        if (!response.ok) {
            const message = `${response.status}: ${response.statusText}`
            console.error(message)
            throw message
        }
        return redirect('/events')
    } catch (e) {
        console.error(e)
    }
    return null
}
