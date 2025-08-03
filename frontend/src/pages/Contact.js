import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    role: 'Donor' // default role
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.warning("Please fill out all fields.");
      return;
    }

    const serviceID = 'service_zqbotch';    
    const templateID = 'template_pgo0h4v'; // Use same template configured in EmailJS
    const userID = '5RjzDOp8WMJpDN6Vb';

    // Send each field separately
    const templateParams = {
      name: form.name,
      role: form.role,
      email: form.email,
      message: form.message,
      time: new Date().toLocaleString()
    };

    emailjs.send(serviceID, templateID, templateParams, userID)
      .then(() => {
        toast.success("Thank you for your feedback!");
        setForm({ name: '', email: '', message: '', role: 'Donor' });
      })
      .catch((error) => {
        toast.error("Failed to send message. Try again later.");
        console.error(error);
      });
  };

  return (
    <div className="container mt-5 mb-5">
      <ToastContainer />
      
      {/* Title Section */}
      <h2 className="text-center fw-bold text-danger mb-3">
        Contact <span className="text-dark">Us</span>
      </h2>
      <p className="text-center text-muted mb-5">
        Have questions, feedback, or need help? Fill out the form below and our team will get back to you shortly.
      </p>

      {/* Content Row */}
      <div className="row align-items-center">
        {/* Illustration */}
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img
            src="/img/contact-illustration.png"
            alt="Contact Illustration"
            className="img-fluid"
            style={{
              maxWidth: '80%',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </div>

        {/* Contact Form */}
        <div className="col-md-6">
          <div className="card shadow p-4 border-0 rounded-3">
            <h4 className="fw-bold text-center mb-3">Send Us a Message</h4>
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Role */}
              <div className="mb-3">
                <select
                  name="role"
                  className="form-select"
                  value={form.role}
                  onChange={handleChange}
                  required
                >
                  <option value="Donor">Donor</option>
                  <option value="Receiver">Receiver</option>
                </select>
              </div>

              {/* Message */}
              <div className="mb-3">
                <textarea
                  name="message"
                  className="form-control"
                  placeholder="Your Message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="text-end">
                <button type="submit" className="btn btn-danger px-4">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
