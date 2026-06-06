import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/images/Logo.png';
import LogoNew from '../assets/images/LogoNew.png'
import '../css/NavBar.css';

function NavBar ({ isSidebarOpen, setIsSidebarOpen }){
    const navigate = useNavigate();
    const location = useLocation();


    function handleLogout(){
        localStorage.removeItem('userType');
        localStorage.removeItem('userEmail');
        navigate('/');
    }

    function toggleSidebar(){
        setIsSidebarOpen(!isSidebarOpen);
    }

    const _loc = location.pathname;
    const userTypeNow = localStorage.getItem('userType') || 'guest';
    const userEmailNow = localStorage.getItem('userEmail') || '';

    return (
        <div>
            <div className="navbar">
                <button className="navbar-toggle" onClick={toggleSidebar}>
                    ☰
                </button> 
                <Link to="/home" className="main-link">
                    <img src={LogoNew} alt="logo" /> Campers Hub
                </Link>

                <div className="navbar-links">
                    <Link to="/equipments" className='nav-link'><p className='p'>Equipments</p></Link>
                    <Link to="/locations" className='nav-link'><p>Locations</p></Link>
                    <Link to="/caravanConvertion" className='nav-link'><p>Caravan Convertion</p></Link>
                </div>

                <Link to="/" className='login-link'>{userTypeNow=="account" ? "👤" : "Login ⌯⌲"}</Link>
            </div>
            <div className={`sidebar-backdrop ${isSidebarOpen ? 'visible' : ''}`} onClick={() => setIsSidebarOpen(false)} />
            <SideBar isSidebarOpen={isSidebarOpen} userType={userTypeNow} userEmail={userEmailNow} onLogout={handleLogout} />
        </div>
        
    );
}

function SideBar({ isSidebarOpen, userType, userEmail, onLogout }){
    const rawProfileName = userEmail
        ? userEmail.includes('@gmail.com')
            ? userEmail.replace(/@gmail\.com$/i, '')
            : userEmail.split('@')[0]
        : (userType === 'account' ? 'Campers Hub' : 'Guest');
    const profileName = rawProfileName
        ? rawProfileName.charAt(0).toUpperCase() + rawProfileName.slice(1)
        : rawProfileName;
    const profileRole = userType === 'account' ? 'Member' : 'Visitor';

    return (
        <div className={`sidebar ${!isSidebarOpen ? 'closed' : ''}`}>
            <div className="sidebar-profile">
                <div className="profile-top-row">
                    <div className="profile-avatar">👤</div>
                    <div className="profile-info">
                        <span className="profile-name">{profileName}</span>
                        <span className="profile-role">{profileRole}</span>
                    </div>
                </div>
                {userType === 'account' && (
                    <button type="button" className="profile-logout" onClick={onLogout}>Logout ➜</button>
                )}
            </div>
            <Link to="/home" className="sidebar-link">
                <span className="sidebar-icon">🏠</span>
                <span className="sidebar-text">Home</span>
            </Link>
            
            <Link to="/equipments" className="sidebar-link">
                <span className="sidebar-icon">🛠️</span>
                <span className="sidebar-text">Equipments</span>
            </Link>
            
            <Link to="/locations" className="sidebar-link">
                <span className="sidebar-icon">📍</span>
                <span className="sidebar-text">Locations</span>
            </Link>
            
            <Link to="/caravanConvertion" className="sidebar-link">
                <span className="sidebar-icon">🚐</span>
                <span className="sidebar-text">Caravan Convertion</span>
            </Link>

            <div className='sidebar-bottom'>
                <picture>
                    <img
                        src={Logo}
                        srcSet={`${Logo} 1x, ${Logo} 2x`}
                        alt="Campers Hub"
                        width={117}
                        height={117}
                        style={{ width: '117px', height: '117px', objectFit: 'cover' }}
                        decoding="async"
                        loading="lazy"
                    />
                </picture>
            </div>
        </div>
    )
}

export default NavBar;