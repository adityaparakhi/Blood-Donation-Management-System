import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-danger text-white pt-3 pb-2 mt-5">
      <div className="container">
        <div className="row text-center text-md-start">

          {/* Brand Section */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold text-uppercase mb-2">BloodCare</h6>
            <p className="small mb-3">
              Connecting blood donors and receivers securely and efficiently.
            </p>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              {[
                { icon: <FaFacebookF />, link: "https://facebook.com" },
                { icon: <FaTwitter />, link: "https://twitter.com" },
                { icon: <FaInstagram />, link: "https://instagram.com" },
                { icon: <FaLinkedinIn />, link: "https://linkedin.com" }
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white fs-5"
                  style={{ transition: '0.3s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold text-uppercase mb-2">Quick Links</h6>
            <ul className="list-unstyled small mb-0">
              <li><Link to="/" className="text-white text-decoration-none d-block mb-1">Home</Link></li>
              <li><Link to="/register" className="text-white text-decoration-none d-block mb-1">Donate</Link></li>
              <li><Link to="/request-blood" className="text-white text-decoration-none d-block mb-1">Request Blood</Link></li>
              <li><Link to="/contact" className="text-white text-decoration-none d-block">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold text-uppercase mb-2">Contact</h6>
            <p className="small mb-1">Email: ankitjha1304@gmail.com</p>
            <p className="small mb-1">Phone: +91-93538477254</p>
            <p className="small mb-0">Bangalore, India</p>
          </div>
        </div>

        <hr className="border-light my-2" />
        <div className="text-center small">
          &copy; {new Date().getFullYear()} BloodCare. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
