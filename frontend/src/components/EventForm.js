import {Form, redirect, useActionData, useNavigate, useNavigation} from 'react-router-dom';

import classes from './EventForm.module.css';
import * as events from "events";
import {getAuthToken} from "../util/util";

function EventForm({method, event}) {
    const navigate = useNavigate();
    const navigation = useNavigation()
    const actionData = useActionData()

    const isSubmitting = navigation.state === 'submitting'

    function cancelHandler() {
        navigate('..');
    }

    return (
        <Form method={method} className={classes.form}>
            {actionData && actionData.errors && (
                <ul>
                    {Object.values(actionData.errors).map(e => (
                        <li key={e}>
                            <p>{e}</p>
                        </li>
                    ))}
                </ul>
            )}
            <p>
                <label htmlFor="title">Title</label>
                <input id="title" type="text" name="title" required/>
            </p>
            <p>
                <label htmlFor="image">Image</label>
                <input id="image" type="url" name="image" required/>
            </p>
            <p>
                <label htmlFor="date">Date</label>
                <input id="date" type="date" name="date" required/>
            </p>
            <p>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" rows="5" required/>
            </p>
            <div className={classes.actions}>
                <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
                    Cancel
                </button>
                <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
            </div>
        </Form>
    );
}

export default EventForm;

export async function editOrCreateEventAction({request, params}) {
    try {
        const formData = await request.formData()
        const eventData = {
            title: formData.get('title'),
            image: formData.get('image'),
            date: formData.get('date'),
            description: formData.get('description'),
        }
        console.log('method', {m: request.method})

        let url = 'http://localhost:8080/events/'
        if (request.method === 'PATCH') {
            url += params.id
        }

        const response = await fetch(url, {
            method: request.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`,
            },
            body: JSON.stringify(eventData)
        })

        if (response.status === 422) {
            return response
        }

        if (!response.ok) {
            throw `${response.status}: ${response.statusMessage}`
        }
        return redirect('/events')
    } catch (e) {
        console.error(e)
        return null
    }
}
