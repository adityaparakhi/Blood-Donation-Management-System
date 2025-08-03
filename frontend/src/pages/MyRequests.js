import React, { useEffect, useState } from 'react';
import api from '../services/api';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const email = localStorage.getItem('email');
      if (!email) {
        alert("Email not found in localStorage. Please log in again.");
        return;
      }

      try {
        const res = await api.get(`/receiver/requests/${email}`);
        setRequests(res.data);
      } catch (error) {
        console.error('Failed to fetch requests:', error);
        alert('Failed to load your requests.');
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <h3 className="mb-4 text-center text-primary fw-bold">My Blood Requests</h3>

      {requests.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          No blood requests found.
        </div>
      ) : (
        <div className="table-responsive shadow rounded">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-primary">
              <tr>
                <th>Blood Group</th>
                <th>Hospital</th>
                <th>Contact</th>
                <th>Urgency</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={index}>
                  <td className="text-uppercase fw-semibold">{req.bloodGroup}</td>
                  <td>{req.hospital}</td>
                  <td>{req.contact}</td>
                  <td>
                    <span
                      className={`badge ${
                        req.urgency === 'high'
                          ? 'bg-danger'
                          : req.urgency === 'medium'
                          ? 'bg-warning text-dark'
                          : 'bg-success'
                      }`}
                    >
                      {req.urgency.charAt(0).toUpperCase() + req.urgency.slice(1)}
                    </span>
                  </td>
                  <td className={`text-capitalize fw-semibold`}>
                    {req.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyRequests;
