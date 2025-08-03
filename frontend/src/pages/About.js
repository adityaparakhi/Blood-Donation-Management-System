import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const About = () => {
  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center text-danger mb-4">About BloodCare</h1>

      {/* About Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6 mb-4">
          <img
            src="/img/logo.jpeg"
            alt="Blood Donation Illustration"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h3 className="fw-bold">What is BloodCare?</h3>
          <p>
            BloodCare is a next-generation web platform designed to bridge the
            gap between voluntary blood donors and those in need. During medical
            emergencies where every second counts, BloodCare provides a fast,
            secure, and reliable system to ensure that life-saving blood reaches
            patients without delay.
          </p>
          <p>
            Our mission is simple yet powerful — make blood availability
            transparent, accessible, and stress-free. We achieve this through
            smart technology, real-time notifications, and dedicated dashboards
            for donors, receivers, and administrators.
          </p>
          <p>
            With advanced role-based access and search tools, BloodCare empowers
            communities to save lives with compassion and technology. Together,
            we’re building a world where blood shortages are a thing of the
            past.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="row text-center my-5">
        <div className="col-md-4">
          <h2 className="text-danger fw-bold">1000+</h2>
          <p>Registered Donors</p>
        </div>
        <div className="col-md-4">
          <h2 className="text-danger fw-bold">800+</h2>
          <p>Blood Requests Fulfilled</p>
        </div>
        <div className="col-md-4">
          <h2 className="text-danger fw-bold">50+</h2>
          <p>Partner Hospitals</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="accordion mt-5" id="faqAccordion">
        {/* Question 1 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              How to become a donor?
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              Simply register as a donor, complete your profile with blood group
              and contact details, and update your availability whenever you’re
              ready to donate.
            </div>
          </div>
        </div>

        {/* Question 2 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              How do I request blood in an emergency?
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              Register as a receiver, submit a blood request with details like
              required blood group, hospital, and urgency level. Nearby donors
              will be notified instantly.
            </div>
          </div>
        </div>

        {/* Question 3 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Is my personal data secure on BloodCare?
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              Yes, all data is stored securely with encryption and is shared
              only with verified donors/receivers during matching. We strictly
              follow privacy and security best practices.
            </div>
          </div>
        </div>

        {/* Question 4 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              Can I change my role later (Donor ↔ Receiver)?
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              Yes, you can update your role anytime from your profile settings.
              This allows you to switch between donating and requesting blood as
              per your needs.
            </div>
          </div>
        </div>

        {/* Question 5 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFive">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              Is the service free to use?
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            aria-labelledby="headingFive"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              Absolutely. BloodCare is a free platform built to connect donors
              and receivers. There are no charges for registration, blood
              requests, or donations.
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose BloodCare Section */}
      <hr className="my-5" />
      <div className="text-center">
        <h4 className="fw-bold mb-3 text-danger">Why Choose BloodCare?</h4>
        <p className="text-muted mb-4">
          Discover what makes BloodCare the most trusted platform for connecting
          donors and receivers across the country:
        </p>

        <div className="row justify-content-center">
          {/* Feature Cards */}
          {[
            {
              icon: "bi-shield-lock",
              title: "Secure & Private",
              text: "Your personal data is encrypted and only shared with verified donors and receivers."
            },
            {
              icon: "bi-lightning-charge",
              title: "Instant Matching",
              text: "Emergency requests instantly alert nearby donors for a rapid response."
            },
            {
              icon: "bi-clock-history",
              title: "24/7 Availability",
              text: "Day or night, our platform ensures help is always available when needed most."
            },
            {
              icon: "bi-hospital",
              title: "Partner Hospitals",
              text: "We collaborate with multiple hospitals to ensure smooth coordination and trust."
            },
            {
              icon: "bi-people",
              title: "Community Driven",
              text: "Join a network of compassionate donors making a difference every single day."
            }
          ].map((feature, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div
                className="card shadow h-100 text-center p-4 border-0"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px) scale(1.03)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
                }}
              >
                <i className={`bi ${feature.icon} text-danger fs-1 mb-3`}></i>
                <h5 className="fw-bold">{feature.title}</h5>
                <p className="text-muted">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Tagline */}
      <div className="text-center mt-5">
        <h5 className="text-danger fst-italic">
          “One donation can save up to three lives — Be the reason someone smiles today.”
        </h5>
      </div>
    </div>
  );
};

export default About;
