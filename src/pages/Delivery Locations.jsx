import { useState } from "react";
import "../styles/Del Location.css";

const deliveryLocations = [
  "Abu Hamour", "Abu Sidra", "Ain Khaled", "Al Aziziyah", "Al Dafna", "AL Doha AL Jadeeda",
  "Al Duhail", "Al Gharrafa", "Al Hilal", "Al Hitmi", "Al Jelaiah", "Al Khisah",
  "Al Luqta", "Al Maamoura", "Al Manaseer", "Al Mansoura", "Al Markhiya", "Al Mearad",
  "Al Messila", "Al Muntazah", "Al Muraikh", "Al Murra", "Al Nasr", "Al Rayyan New",
  "Al Rayyan Old", "Al Rumaila", "Al Sadd", "Al Sailiya", "Al Soudan", "Al Thumama",
  "Al Waab", "Al Wukair", "Aspire Zone", "Bani Hajer", "Barwa City", "Fereej Abdul Aziz",
  "Fereej Al Ali", "Fereej al kulaib", "Fereej Bin Mahmoud", "Fereej Bin Omran", "Izghawa",
  "Madinat Khalifa North", "Madinat Khalifa South", "Mehairja", "Mesaieed", "Mesaimeer",
  "Muaither North", "Muaither South", "Musherib", "Najma", "New Salata / Al Asiri",
  "Nuaija", "Old Airport", "Onaiza", "Pearl Qatar",
  "Ras Abu Aboud", "Umm Ghuwailina", "Wakrah", "West Bay"
];

const DeliveryLocations = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLocations = deliveryLocations.filter(location =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="delivery-locations" className="delivery-locations-section">
      <img 
        src="https://masskaronline.com/uploads/images/banner/Masskar%20All%20Items-1.jpg" 
        className="delivery-locations-image" 
        alt="all item image" 
      />
      <div className="delivery-locations-container">
        <h2 className="delivery-locations-title">Delivery Locations</h2>
        <div className="delivery-locations-search-container">
          <input
            type="text"
            placeholder="Search your location..."
            className="delivery-locations-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="delivery-locations-grid">
          {filteredLocations.map((location, index) => (
            <div key={index} className="delivery-locations-item">
              {location}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryLocations;