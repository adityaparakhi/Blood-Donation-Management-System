import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import api from "../services/api"; // Axios instance
import Swal from "sweetalert2"; // Popup

// Stripe public key
const stripePromise = loadStripe(
  "pk_test_51PC17vSBExY56f70Np5EVAwM16w2A6P0HUeIh4tb040nYVkkRmoMvepLWXVEmmSQNUia7xPFF86yhFhPCRBFPAWc00pnij3RKX"
);

// Payment Component
const PaymentForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    // Simulate payment success (replace with real Stripe confirm if needed)
    onSuccess();
  };

  return (
    <form onSubmit={handlePayment} className="mt-3">
      <label className="form-label">Card Details</label>
      <div
        className="form-control p-3 mb-3 shadow-sm"
        style={{ borderRadius: "8px" }}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                iconColor: "#6772e5",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#fa755a" },
            },
          }}
        />
      </div>

      <button
        type="submit"
        className="btn btn-success w-100 mt-2 shadow-sm"
        disabled={!stripe}
      >
        Pay ₹{amount}
      </button>
    </form>
  );
};

const RequestBlood = () => {
  const [form, setForm] = useState({
    bloodGroup: "",
    hospital: "",
    contact: "",
    urgency: "",
    status: "pending",
  });

  const [showPayment, setShowPayment] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("email");
    if (!email) {
      toast.error("Please login to submit a request.");
      return;
    }

    // Set amount based on urgency
    let price = 0;
    if (form.urgency === "high") price = 500;
    else if (form.urgency === "normal") price = 300;
    else if (form.urgency === "low") price = 100;

    setAmount(price);
    setShowPayment(true);
  };

  const handlePaymentSuccess = async () => {
    try {
      const payload = {
        bloodGroup: form.bloodGroup,
        hospital: form.hospital,
        contact: form.contact,
        urgency: form.urgency,
        amount: amount,
        amountStatus: "PAID",
        status: "pending",
      };

      // Save request to backend
      await api.post("/receiver/requests", payload);

      // SweetAlert2 success popup
      Swal.fire({
        title: "Request Submitted!",
        html: `
          <p style="font-size:16px;">Payment of <strong>₹${amount}</strong> was successful.</p>
          <p style="font-size:16px;">Your blood request has been submitted and is pending approval.</p>
        `,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33",
      });

      // Reset form
      setForm({
        bloodGroup: "",
        hospital: "",
        contact: "",
        urgency: "",
        status: "pending",
      });
      setShowPayment(false);
    } catch (err) {
      toast.error("Failed to submit blood request!");
      console.error(err);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h3 className="mb-4 text-danger fw-bold text-center">Request Blood</h3>
      <ToastContainer position="top-center" autoClose={3000} />

      <form
        onSubmit={handleSubmit}
        className="row g-4 shadow p-4 rounded bg-light"
      >
        {/* Blood Group Dropdown */}
        <div className="col-md-6">
          <select
            name="bloodGroup"
            className="form-select form-select-lg"
            value={form.bloodGroup}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Blood Group
            </option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        {/* Hospital Name */}
        <div className="col-md-6">
          <input
            type="text"
            name="hospital"
            className="form-control form-control-lg"
            placeholder="Hospital Name"
            value={form.hospital}
            onChange={handleChange}
            required
          />
        </div>

        {/* Contact Number */}
        <div className="col-md-6">
          <input
            type="tel"
            name="contact"
            className="form-control form-control-lg"
            placeholder="Contact Number"
            value={form.contact}
            onChange={handleChange}
            required
            pattern="^[0-9]{10,15}$"
            title="Enter valid contact number"
          />
        </div>

        {/* Urgency */}
        <div className="col-md-6">
          <select
            name="urgency"
            className="form-select form-select-lg"
            value={form.urgency}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Urgency
            </option>
            <option value="high">High - ₹500</option>
            <option value="normal">Normal - ₹300</option>
            <option value="low">Low - ₹100</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-danger btn-lg px-5 shadow">
            Submit Request
          </button>
        </div>
      </form>

      {/* Payment Modal */}
      {showPayment && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center"
          style={{ zIndex: 1050, animation: "fadeIn 0.3s ease-in-out" }}
        >
          <div
            className="bg-white p-4 rounded shadow"
            style={{
              width: "400px",
              maxWidth: "90%",
              animation: "slideIn 0.4s ease-in-out",
            }}
          >
            <h4 className="text-center mb-3">Complete Payment</h4>
            <p className="text-center text-muted">Amount: ₹{amount}</p>
            <Elements stripe={stripePromise}>
              <PaymentForm amount={amount} onSuccess={handlePaymentSuccess} />
            </Elements>
            <button
              className="btn btn-secondary w-100 mt-3"
              onClick={() => setShowPayment(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestBlood;
