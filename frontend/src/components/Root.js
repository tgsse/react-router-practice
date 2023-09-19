import MainNavigation from "./MainNavigation";
import {Outlet, useLoaderData, useNavigate, useNavigation, useSubmit} from "react-router-dom";
import {useEffect} from "react";
import {getTokenDuration} from "../util/util";

export default function Root() {
    const navigation = useNavigation()
    const token = useLoaderData()
    const submit = useSubmit()

    // useEffect(() => {
    //     if (token === null) {
    //         submit(null, {action: '/logout', method: 'post'})
    //         return null
    //     } else if (!token) {
    //         return null
    //     }
    //
    //     const duration = getTokenDuration()
    //     setTimeout(() => {
    //         submit(null, {action: '/logout', method: 'post'})
    //     }, duration)
    // }, [token, submit]);
    return (
        <>
            <MainNavigation />
            <main>
                {navigation.state === 'loading' && <p>Loading</p>}
                <Outlet></Outlet>
            </main>
        </>
    )
}
