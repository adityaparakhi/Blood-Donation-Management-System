import React from 'react';
import { Link } from 'react-router-dom';

const ReceiverDashboard = () => {
  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="fw-bold text-danger">Receiver Dashboard</h2>
        <p className="text-muted">
          Request blood and track your request status here.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="row justify-content-center">
        {/* Request Blood Card */}
        <div className="col-md-5 mb-4">
          <div
            className="card dashboard-card h-100"
            style={{
              border: '1.5px solid #ddd',       // Subtle grey border
              borderRadius: '12px',             // Modern rounded look
              backgroundColor: '#fdfdfd',       // Slight off-white
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)', // Soft shadow
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
            }}
          >
            <div className="card-body text-center">
              <h5 className="card-title mb-3">🩸 Request Blood</h5>
              <p className="card-text text-muted">
                Need blood urgently? Submit a request now.
              </p>
              <Link to="/request-blood" className="btn btn-danger px-4">
                Request Now
              </Link>
            </div>
          </div>
        </div>

        {/* My Requests Card */}
        <div className="col-md-5 mb-4">
          <div
            className="card dashboard-card h-100"
            style={{
              border: '1.5px solid #ddd',
              borderRadius: '12px',
              backgroundColor: '#fdfdfd',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
            }}
          >
            <div className="card-body text-center">
              <h5 className="card-title mb-3">📋 My Requests</h5>
              <p className="card-text text-muted">
                Check the status of your blood requests.
              </p>
              <Link to="/my-requests" className="btn btn-outline-danger px-4">
                View Requests
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiverDashboard;
