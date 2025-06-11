import { useState, useEffect } from "react";
import "../../styles/Cookies.css";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const cookieShown = sessionStorage.getItem("cookieConsentShown");

    if (!cookieShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem("cookieConsentShown", "true");
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
    console.log("Cookies accepted");
  };

  const handleDecline = () => {
    sessionStorage.setItem("cookieConsentShown", "true");
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
    console.log("Cookies declined");
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent-container">
      <div 
        className={`cookie-consent-backdrop ${isAnimating ? 'backdrop-visible' : 'backdrop-hidden'}`}
      />
      
      <div className="cookie-consent-content-wrapper">
        <div 
          className={`cookie-consent-modal ${isAnimating ? 'modal-visible' : 'modal-hidden'}`}
        >
          <div className="cookie-consent-inner">
            <div className="cookie-consent-icon">
              <svg className="cookie-icon-svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            
            <div className="cookie-consent-text">
              <h3 className="cookie-consent-title">
                We value your privacy
              </h3>
              <p className="cookie-consent-description">
                We use cookies to enhance your browsing experience and analyze our traffic. 
                By clicking "Accept", you consent to our use of cookies.
              </p>
              
              <div className="cookie-consent-buttons">
                <button
                  onClick={handleDecline}
                  className="cookie-button decline-button"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="cookie-button accept-button"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}