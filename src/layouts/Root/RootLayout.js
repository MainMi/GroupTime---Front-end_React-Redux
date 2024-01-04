import { Outlet } from "react-router-dom";
import Header from '../Header/Header.js';

function RootLayout() {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
}

export default RootLayout;