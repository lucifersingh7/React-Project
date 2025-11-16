import { NavLink } from 'react-router-dom';
import './App.css';
const Navbar = () => {
    return (
        <div style={{ backgroundColor: '#212529' }}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand text-white" >Mobile App</a>
                    <div className="collapse navbar-collapse" id="navbarNav" style={{ justifyContent: 'end' }}>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/upcoming">
                                    Upcoming
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/trending">
                                    Trending
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
