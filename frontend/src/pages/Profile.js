import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bloodGroup: '',
    contact: ''
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    api.get("/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(() => {
        setMessage("Failed to load profile");
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    api.put("/profile", profile, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => setMessage("Profile updated successfully"))
      .catch(() => setMessage("Failed to update profile"));
  };

  if (loading) return <div className="text-center mt-5">Loading profile...</div>;

  return (
    <div className="container mt-5 mb-5">
      <div
        className="card shadow-lg mx-auto"
        style={{
          maxWidth: '650px',
          border: '1.5px solid #ddd',
          borderRadius: '16px',
          backgroundColor: '#fff',
        }}
      >
        {/* Header Section */}
        <div
          className="text-center py-4"
          style={{
            borderBottom: '1px solid #eee',
            background: 'linear-gradient(90deg, #f44336, #ff7961)',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
          }}
        >
          <div
            style={{
              width: '85px',
              height: '85px',
              background: '#fff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 10px auto',
              fontSize: '30px',
              fontWeight: 'bold',
              color: '#f44336',
              border: '3px solid #fff',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              transition: '0.3s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {profile.name ? profile.name[0].toUpperCase() : 'U'}
          </div>
          <h4 className="text-white mb-1">{profile.name || 'Your Name'}</h4>
          <p className="text-white-50 small mb-0">{profile.email}</p>
        </div>

        {/* Form Section */}
        <div className="card-body px-4 py-4">
          {message && (
            <div className="alert alert-info text-center small py-2">{message}</div>
          )}

          <form onSubmit={handleSave}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your full name"
                value={profile.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={profile.email}
                disabled
              />
              <small className="text-muted">Email cannot be changed.</small>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Blood Group</label>
              <input
                type="text"
                name="bloodGroup"
                className="form-control"
                placeholder="e.g., O+, A-"
                value={profile.bloodGroup}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Contact Number</label>
              <input
                type="text"
                name="contact"
                className="form-control"
                placeholder="Enter your contact number"
                value={profile.contact}
                onChange={handleChange}
              />
            </div>

            <div className="text-end">
              <button
                type="submit"
                className="btn btn-danger px-4"
                style={{
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                  e.currentTarget.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
