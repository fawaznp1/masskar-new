import React from 'react';
import "../styles/About.css";

function About() {
  return (
    <div>
      <section id="about" className="about-section">
        <img 
          src="https://masskaronline.com/uploads/images/banner/msskar%20Comes%20you%20Yellow1.jpg" 
          className="about-banner" 
          alt="banner img" 
        />
        <div className="about-container">
          <h2 className="about-title">About</h2>
          <p className="about-text">
            Masskar the online seafood store offers you fresh fish and meat at your doorstep without any compromise in quality. Cresting the waves at the crack of dawn to get the best catch, that's what the life of a fisherman is all about. And we the Masskar team are very much particular about the people we have included in our team - the professionals, loyalty specialist and who value their customers with all respect.
          </p>
          <p className="about-text">
            Here on you need not worry about where, when regarding fish neither when you hear any guest stepping up. We make your cooking easy with our products. We are just a click away. You can even log into our webpage or use our mobile app and demand.
          </p>
          <p className="about-text">
            This is just a beginning, we make sure that both meat and veggies are also made available at your doorstep. We see our staff and customers as our family and we want all to stay healthy and happily lifelong.
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;