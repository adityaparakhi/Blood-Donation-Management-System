import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MyDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await api.get("/donor/donations");
        setDonations(response.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
        toast.error("Failed to load donation history.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-success">🩸 My Donation History</h3>
      <ToastContainer position="top-center" autoClose={3000} />
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : donations.length === 0 ? (
        <div className="alert alert-info">You haven't made any donations yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Receiver</th>
                <th>Blood Group</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr key={donation.id}>
                  <td>{index + 1}</td>
                  <td>{donation.receiverName || "Anonymous"}</td>
                  <td>{donation.bloodGroup}</td>
                  <td>{new Date(donation.donationDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${donation.status === 'completed' ? 'bg-success' : 'bg-warning'}`}>
                      {donation.status}
                    </span>
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

export default MyDonations;