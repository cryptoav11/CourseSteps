import { useLocation, Link } from 'react-router-dom'
import {AppLogo, NetworkLogo, NetworkName} from "../styles/NavBarStyles";
import ConnectButton from "./ConnectButton";

const NavBar = () => {
    const pathName = useLocation().pathname;
    const activeLink = (linkPath) => pathName === linkPath ? 'active nav-link' : 'nav-link'

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="navbar-brand" href="#">
                    <AppLogo src="bLogo.png"/>
                </div>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={activeLink('/swap')} to="/swap">Swap</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={activeLink('/pool')} to="/pool">Pool</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <ul className="nav navbar-nav">
                        <li className="nav-item dropdown">
                            <NetworkLogo className="logoImg" src="ethLogo.webp"/>
                            <NetworkName
                                className="nav-link dropdown-toggle"
                                href="#" role="button"
                                data-bs-toggle="dropdown">
                                Görli
                                &nbsp;
                            </NetworkName>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="#">
                                    <NetworkLogo className="logoImg" src="ethLogo.webp"/>
                                    Görli
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>

                <div>
                    <ul className="nav navbar-nav rightNav">
                        <li className="nav-item">
                            <ConnectButton />
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
