import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = ({ role, handleLogout }) => {
  const navigate = useNavigate();

  const logoutAndRedirect = () => {
    handleLogout();
    navigate('/');
  };

  // Active link style
  const activeStyle = {
    borderBottom: '2px solid white',
    fontWeight: 'bold'
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm px-3"
      style={{
        backgroundImage: 'linear-gradient(to right, #f54242, #e66b6b)',
        minHeight: '60px'
      }}
    >
      {/* Brand */}
      <NavLink className="navbar-brand fw-bold d-flex align-items-center" to="/" style={{ fontSize: '1.3rem' }}>
        <span role="img" aria-label="blood">🩸</span>&nbsp;BloodCare
      </NavLink>

      {/* Mobile toggle */}
      <button
        className="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Links */}
      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav ms-auto gap-2 align-items-center">
          <li className="nav-item">
            <NavLink className="nav-link" to="/" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/about" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              About
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/contact" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              Contact
            </NavLink>
          </li>

          {/* Guest Links */}
          {!role && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                  Register
                </NavLink>
              </li>
            </>
          )}

          {/* Donor Links */}
          {role === 'donor' && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/donor" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/my-donations" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                  My Donations
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                  Profile
                </NavLink>
              </li>
            </>
          )}

          {/* Receiver Links */}
          {role === 'receiver' && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/receiver" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/request-blood" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                  Request Blood
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/my-requests" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                  My Requests
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                  Profile
                </NavLink>
              </li>
            </>
          )}

          {/* Admin Link */}
          {role === 'admin' && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                Admin Dashboard
              </NavLink>
            </li>
          )}

          {/* Logout */}
          {role && (
            <li className="nav-item">
              <button
                className="btn btn-link nav-link text-white"
                style={{ textDecoration: 'none' }}
                onClick={logoutAndRedirect}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
