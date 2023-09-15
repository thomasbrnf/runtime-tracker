import sideBarLogo from '../assets/sideBarLogo.svg';
import session from '../assets/session.svg';
import logout from '../assets/logout.svg';
import screen from '../assets/screen.svg';
import '../styles/components/SideBar.css'

export function SideBar({setContent}: {setContent: React.Dispatch<React.SetStateAction<string>>}) {
    return (
        <>
        <nav className="navbar">
                <ul className="navbar-nav">
                    <li className="logo">
                        <a className="nav-link">
                        <img src={sideBarLogo} alt="sideBarLogo"/>
                        </a>
                    </li>
                    <li className="nav-item"  onClick={() => setContent('devices')}>
                        <a className="nav-link device">
                        <img src={screen} alt="laptop"/>
                            <span className="link-text">Devices</span>
                        </a>
                    </li>
                    <li className="nav-item"  onClick={() => setContent('sessions')}>
                        <a className="nav-link session">
                        <img src={session} alt="session"/>
                            <span className="link-text">Sessions</span>
                        </a>
                    </li>
                    <li className="nav-item" onClick={() => console.log('clicked')}>
                        <a className="nav-link">
                        <img src={logout} alt="logout"/>
                            <span className="link-text">Sign out</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    )
}