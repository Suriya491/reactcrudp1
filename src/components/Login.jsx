import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === formData.email && u.password === formData.password);
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="form-container">
      <h2><FaSignInAlt className="icon" /> Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-with-icon">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-with-icon">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;