import {useState} from 'react';
import {Form, Link, useActionData, useNavigation, useSearchParams} from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
    const [searchParams] = useSearchParams()
    const isLogin = searchParams.get('mode') === 'login'
    const authResponse = useActionData()
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'

    function switchAuthHandler() {
        // setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
        searchParams.set('mode', isLogin ? 'signup' : 'login')
    }

    return (
        <>
            <Form method="post" className={classes.form}>
                <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
                {authResponse && authResponse.errors &&
                    (<ul>
                        {Object.values(authResponse.errors).map(err => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>)
                }
                <p>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" required/>
                </p>
                <p>
                    <label htmlFor="image">Password</label>
                    <input id="password" type="password" name="password" required/>
                </p>
                <div className={classes.actions}>
                    <Link to={`?mode=${isLogin ? 'signup' : 'login'}`} onClick={switchAuthHandler} type="button">
                        {isLogin ? 'Create new user' : 'Login'}
                    </Link>
                    <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
                </div>
            </Form>
        </>
    );
}

export default AuthForm;
