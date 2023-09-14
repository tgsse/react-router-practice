import MainNavigation from "./MainNavigation";
import {Outlet, useNavigate, useNavigation} from "react-router-dom";

export default function Root() {
    const navigation = useNavigation()
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
