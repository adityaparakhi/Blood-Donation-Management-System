import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    // Animate counters and add "+" sign
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      let count = 0;
      const increment = target / 200;

      const updateCount = () => {
        if (count < target) {
          count += increment;
          counter.innerText = Math.ceil(count) + "+"; // Add plus
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target + "+"; // Add plus
        }
      };
      updateCount();
    });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="text-white text-center py-5"
        style={{
          background: "linear-gradient(to right, #dc3545, #b71c1c)",
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold animate__animated animate__fadeInDown">
            Welcome to BloodCare
          </h1>
          <p className="lead mb-4 animate__animated animate__fadeIn animate__delay-1s">
            Bridging the gap between blood donors and those in need — every drop counts.
          </p>
          <div className="animate__animated animate__zoomIn animate__delay-2s">
            <a href="/register" className="btn btn-light btn-lg me-3">
              Become a Donor
            </a>
            <a href="/login" className="btn btn-outline-light btn-lg">
              Request Blood
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="text-danger fw-bold mb-3 animate__animated animate__fadeInUp">
            What is BloodCare?
          </h2>
          <p className="text-muted w-75 mx-auto animate__animated animate__fadeIn animate__delay-1s">
            BloodCare is a next-generation platform connecting voluntary donors and receivers
            during critical medical emergencies. With real-time notifications, secure data
            handling, and location-based search, we ensure that life-saving blood reaches
            patients without delay.
          </p>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4 animate__animated animate__fadeInUp">
            Why Choose BloodCare?
          </h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4 animate__animated animate__fadeInLeft">
              <div className="p-4 border rounded shadow-sm h-100">
                <i className="bi bi-people-fill text-danger fs-1 mb-3"></i>
                <h5>Trusted Donor Network</h5>
                <p>Connect with verified and reliable blood donors in your area easily.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4 animate__animated animate__fadeInUp animate__delay-1s">
              <div className="p-4 border rounded shadow-sm h-100">
                <i className="bi bi-heart-pulse-fill text-danger fs-1 mb-3"></i>
                <h5>Real-time Requests</h5>
                <p>Post and track blood requests instantly and transparently.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4 animate__animated animate__fadeInRight animate__delay-2s">
              <div className="p-4 border rounded shadow-sm h-100">
                <i className="bi bi-shield-check text-danger fs-1 mb-3"></i>
                <h5>Secure & Reliable</h5>
                <p>Your personal data and donations are handled with utmost security.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blood Compatibility Table */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="text-danger fw-bold mb-4">Blood Donation Compatibility</h2>
          <div className="table-responsive shadow rounded">
            <table className="table table-bordered table-hover">
              <thead className="table-danger">
                <tr>
                  <th>Blood Group</th>
                  <th>Can Donate To</th>
                  <th>Can Receive From</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>O-</td>
                  <td>All Blood Groups</td>
                  <td>O-</td>
                </tr>
                <tr>
                  <td>O+</td>
                  <td>O+, A+, B+, AB+</td>
                  <td>O+, O-</td>
                </tr>
                <tr>
                  <td>A-</td>
                  <td>A-, A+, AB-, AB+</td>
                  <td>A-, O-</td>
                </tr>
                <tr>
                  <td>A+</td>
                  <td>A+, AB+</td>
                  <td>A+, A-, O+, O-</td>
                </tr>
                <tr>
                  <td>B-</td>
                  <td>B-, B+, AB-, AB+</td>
                  <td>B-, O-</td>
                </tr>
                <tr>
                  <td>B+</td>
                  <td>B+, AB+</td>
                  <td>B+, B-, O+, O-</td>
                </tr>
                <tr>
                  <td>AB-</td>
                  <td>AB-, AB+</td>
                  <td>AB-, A-, B-, O-</td>
                </tr>
                <tr>
                  <td>AB+</td>
                  <td>AB+</td>
                  <td>All Blood Groups</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="text-white py-5"
        style={{
          background: "linear-gradient(to right, #b71c1c, #dc3545)",
        }}
      >
        <div className="container text-center">
          <div className="row">
            <div className="col-md-4">
              <h2 className="fw-bold counter" data-target="5000">
                0
              </h2>
              <p>Active Donors</p>
            </div>
            <div className="col-md-4">
              <h2 className="fw-bold counter" data-target="10000">
                0
              </h2>
              <p>Lives Saved</p>
            </div>
            <div className="col-md-4">
              <h2 className="fw-bold counter" data-target="200">
                0
              </h2>
              <p>Hospitals Connected</p>
            </div>
          </div>
        </div>
      </section>

      {/* Health Tips */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="text-danger mb-4">Health Tips for Donors</h2>
          <div className="row">
            <div className="col-md-4">
              <i className="bi bi-droplet-half text-danger fs-1 mb-2"></i>
              <p>Stay well-hydrated before and after donating.</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-apple text-danger fs-1 mb-2"></i>
              <p>Eat iron-rich foods (spinach, apples) to replenish blood.</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-clock-history text-danger fs-1 mb-2"></i>
              <p>Wait at least 56 days before your next donation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center text-danger mb-4">FAQs</h2>
          <div className="accordion" id="faqAccordion">
            {/* Existing Questions */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq1"
                >
                  Who can donate blood?
                </button>
              </h2>
              <div id="faq1" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  Generally, healthy individuals aged 18–65 weighing over 50kg can donate blood.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq2"
                >
                  How often can I donate?
                </button>
              </h2>
              <div id="faq2" className="accordion-collapse collapse">
                <div className="accordion-body">
                  You can donate whole blood every 3 months and platelets every 2 weeks.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq3"
                >
                  Is blood donation safe?
                </button>
              </h2>
              <div id="faq3" className="accordion-collapse collapse">
                <div className="accordion-body">
                  Yes, sterile equipment is used and the process is safe and painless.
                </div>
              </div>
            </div>

            {/* New Questions */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq4"
                >
                  Do I need to fast before donating blood?
                </button>
              </h2>
              <div id="faq4" className="accordion-collapse collapse">
                <div className="accordion-body">
                  No fasting is required. It’s recommended to eat a healthy meal and drink water
                  before donating blood.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq5"
                >
                  Can I donate blood if I’m on medication?
                </button>
              </h2>
              <div id="faq5" className="accordion-collapse collapse">
                <div className="accordion-body">
                  It depends on the medication. Common medications like antibiotics or blood
                  pressure medicines may require a temporary deferral — consult the donation center.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq6"
                >
                  How long does the blood donation process take?
                </button>
              </h2>
              <div id="faq6" className="accordion-collapse collapse">
                <div className="accordion-body">
                  The donation itself usually takes 8–10 minutes, while the overall process
                  (including registration and recovery) takes about 45–60 minutes.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 text-center">
        <div className="container">
          <h3 className="animate__animated animate__fadeInUp text-danger mb-3">
            Ready to make a difference?
          </h3>
          <p className="text-muted mb-4">
            One donation can save up to three lives — Be the reason someone smiles today.
          </p>
          <a
            href="/register"
            className="btn btn-danger btn-lg animate__animated animate__zoomIn animate__delay-1s"
          >
            Join BloodCare Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
