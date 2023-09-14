import EventForm from "../components/EventForm";
import {useLoaderData} from "react-router-dom";

export default function EditEventPage() {

    const data = useLoaderData()
    return (
        <>
            <h1>Edit event</h1>
            {data.event && <EventForm event={data.event} method={'patch'} />}
        </>
    )
}
