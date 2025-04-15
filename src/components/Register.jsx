import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaLock, FaUserPlus } from 'react-icons/fa';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.email.includes('@') || formData.password.length < 6) {
      alert('Please enter a valid email and password (min 6 characters)');
      return;
    }
    
    // Store user data in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="form-container">
      <h2><FaUserPlus className="icon" /> Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-with-icon">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-with-icon">
            <FaPhone className="input-icon" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
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
            <FaMapMarkerAlt className="input-icon" />
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
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
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Register;