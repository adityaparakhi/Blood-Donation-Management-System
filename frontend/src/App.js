import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import DonorDashboard from './pages/DonorDashboard';
import ReceiverDashboard from './pages/ReceiverDashboard';
import AdminDashboard from './pages/AdminDashboard';
import RequestBlood from './pages/RequestBlood';
import MyRequests from './pages/MyRequests';
import MyDonations from './pages/MyDonations';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';

import { getRole, logout } from './utils/auth';

import { ToastContainer } from 'react-toastify'; // ✅ Toastify import
import 'react-toastify/dist/ReactToastify.css';  // ✅ Toastify styles
import './App.css'; // Add CSS for sticky footer

const App = () => {
  const [role, setRole] = useState(getRole());

  const handleLogout = () => {
    logout();
    setRole(null);
  };

  return (
    <Router>
      {/* Wrapper to handle sticky footer */}
      <div className="app-wrapper d-flex flex-column min-vh-100">
        {/* Navbar */}
        <Navbar role={role} handleLogout={handleLogout} />

        {/* Main content (pushes footer down) */}
        <main className="flex-grow-1">
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login setRole={setRole} />} />
              <Route path="/donor" element={<DonorDashboard />} />
              <Route path="/my-donations" element={<MyDonations />} />
              <Route path="/receiver" element={<ReceiverDashboard />} />
              <Route path="/request-blood" element={<RequestBlood />} />
              <Route path="/my-requests" element={<MyRequests />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/receiver/requests" element={<RequestBlood />} />
              <Route path="/receiver/my-requests" element={<MyRequests email="test@example.com" />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <Footer />

        {/* Toast notifications */}
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </Router>
  );
};

export default App;
