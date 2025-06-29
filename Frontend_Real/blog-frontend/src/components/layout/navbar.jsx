import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('is_superuser');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  const buttonStyle = {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    textDecoration: 'none'
  };

  const redButton = {
    ...buttonStyle,
    backgroundColor: '#dc3545'
  };

  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white p-4">
      <div
        onClick={() => navigate('/')}
        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '10px' }}
      >
        <img
          src="/1898216.png"
          alt="logo"
          style={{ width: '28px', height: '28px', objectFit: 'contain' }}
        />
        <h1 className="logo-text text-lg font-bold">FootPrints</h1>

      </div>

      {!isAuthPage && (
        token ? (
          <button onClick={handleLogout} style={redButton}>
            Logout
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => navigate('/login')} style={buttonStyle}>
              Login
            </button>
            <button onClick={() => navigate('/signup')} style={buttonStyle}>
              Signup
            </button>
          </div>
        )
      )}
    </nav>
  );
}

export default Navbar;
