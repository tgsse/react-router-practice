import AuthForm from '../components/AuthForm';
import {json, useSearchParams} from "react-router-dom";

function AuthenticationPage() {
    return <AuthForm/>;
}

export default AuthenticationPage

export async function authAction({request}) {
    const searchParams = new URL(request.url).searchParams
    const mode = searchParams.get('mode')

    if (mode !== 'login' && mode != 'signup') {
        throw json({message: 'Unsupported mode'}, {status: 422})
    }

    const data = await request.formData()
    const authData = {
        email: data.get('email'),
        password: data.get('password'),
    }

    return await fetch('http://localhost:8080/' + mode, {
        method: request.method.toUpperCase(),
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData)
    })
        .then(response => {
            if (!response.ok) {
                throw `${response.status}: ${response.statusMessage}.`
            }
            return response.json()
        })
        .then(result => {
            console.log(result)
            // save result.token
            return result
        })
        .catch(e => {
            console.error(e)
            return null
        })
}
