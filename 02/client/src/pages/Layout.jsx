import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

function Layout() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
}

export default Layout;