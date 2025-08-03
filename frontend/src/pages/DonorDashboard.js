import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../utils/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const DonorDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  console.log("User:", user);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get("/donor/available-requests");

        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
        toast.error("Failed to load requests. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAcceptRequest = async (requestId) => {
    try {
      await api.post(`/donor/accept-request/${requestId}`);
      toast.success("Request accepted successfully!");
      setRequests(requests.filter(req => req.id !== requestId));
    } catch (error) {
      console.error("Error accepting request:", error);
      toast.error("Failed to accept request. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-danger">🩸 Available Blood Requests</h3>
      <ToastContainer position="top-center" autoClose={3000} />
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : requests.length === 0 ? (
        <div className="alert alert-info">No matching requests available at the moment.</div>
      ) : (
        <div className="row g-3">
          {requests.map((req) => (
            <div className="col-md-6" key={req.id}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    {req.bloodGroup} Required
                    {user.bloodGroup === req.bloodGroup && (
                      <span className="badge bg-success ms-2">Match</span>
                    )}
                  </h5>
                  <p className="card-text">
                    <strong>Hospital:</strong> {req.hospital}<br />
                    <strong>Location:</strong> {req.location}<br />
                    <strong>Urgency:</strong> {req.urgency}<br />
                    <strong>Contact:</strong> {req.contactNumber}
                  </p>
                  {user.bloodGroup === req.bloodGroup && (
                    <button
                      onClick={() => handleAcceptRequest(req.id)}
                      className="btn btn-danger"
                    >
                      Accept Request
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;