import {useParams} from "react-router-dom";

export default function EventDetailPage() {
    const params = useParams()
    return (
        <>
            <h1>Events Detail Page</h1>
            <p>{params.id}</p>
        </>
    )
}