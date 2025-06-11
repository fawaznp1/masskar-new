import "../../styles/Footer.css";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-radial-gradient-1"></div>
      <div className="footer-radial-gradient-2"></div>
      
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-group">
            <h3 className="footer-heading">
              Categories
              <div className="footer-underline"></div>
            </h3>
            <ul className="footer-list">
              {['Fish', 'Meat', 'Fresh', 'Veg', 'Fruits'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="footer-link">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-group">
            <h3 className="footer-heading">
              More Categories
              <div className="footer-underline"></div>
            </h3>
            <ul className="footer-list">
              {['Food', 'Bakery', 'Roastery', 'Non Food'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="footer-link">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-group">
            <h3 className="footer-heading">
              Policy Info
              <div className="footer-underline"></div>
            </h3>
            <ul className="footer-list">
              {['FAQ', 'Cancellation', 'Returns & Refund', 'Payments & Privacy'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="footer-link">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-group">
            <h3 className="footer-heading">
              Company
              <div className="footer-underline"></div>
            </h3>
            <ul className="footer-list">
              {['Masskar', 'About Us', 'Feedback', 'Delivery Locations'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="footer-link">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-group">
            <h3 className="footer-heading">
              Contact
              <div className="footer-underline"></div>
            </h3>
            <ul className="footer-contact-list">
              <li>
                <a href="#" className="footer-contact-link">
                  <span className="footer-contact-label">Phone:</span>
                  <span className="footer-contact-value">+123456789</span>
                </a>
              </li>
              <li>
                <a href="#" className="footer-contact-link">
                  <span className="footer-contact-label">Email:</span>
                  <span className="footer-contact-value">info@masskar.com</span>
                </a>
              </li>
              <li className="footer-social-container">
                <div className="footer-social-icons">
                  {['facebook', 'twitter', 'instagram', 'linkedin'].map((platform) => (
                    <a 
                      key={platform}
                      href="#" 
                      className="footer-social-icon"
                      aria-label={`Follow us on ${platform}`}
                    >
                      <svg 
                        className="footer-social-svg" 
                        fill="currentColor" 
                        viewBox="0 0 24 24" 
                        aria-hidden="true"
                      >
                        <path 
                          fillRule="evenodd" 
                          d={
                            platform === 'facebook' ? 
                            "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" :
                            platform === 'twitter' ?
                            "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" :
                            platform === 'instagram' ?
                            "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" :
                            "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                          } 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </li>
            </ul>
            <div className="footer-app-download">
              <div className="footer-app-buttons">
                <a href="#" className="footer-app-button">
                  <svg className="footer-app-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
                  </svg>
                  <span>Android</span>
                </a>
                <a href="#" className="footer-app-button">
                  <svg className="footer-app-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <span>iOS</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-divider-container">
          <div className="footer-divider"></div>
        </div>

        <div className="footer-copyright">
          <div className="footer-copyright-link-container">
            <a href="#" className="footer-copyright-link">
              © {new Date().getFullYear()} Masskar. All rights reserved.
            </a>
          </div>
          <div className="footer-policy-links">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((policy, index) => (
              <a
                key={index}
                href="#"
                className="footer-policy-link"
              >
                {policy}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;