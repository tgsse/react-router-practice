import MainNavigation from "./MainNavigation";
import {Outlet} from "react-router-dom";

export default function Root() {
    return (
        <>
            <MainNavigation />
            <main>
                <Outlet></Outlet>
            </main>
        </>
    )
}
