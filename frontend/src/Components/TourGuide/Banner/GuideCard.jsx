import React from "react";
import "./GuideCard.css"; // Link to the CSS file
import hitesh from "./hitesh.png"; // Import the image
import hukkam from "./hukkam.png"; // Import the image
import abishek from "./abishek.png"; // Import the image
import sushant from "./sushnat.png"; // Import the image

const guides = [
  {
    name: "Hitesh Joshi",
    location: "Kathmandu, Nepal",
    languages: "English, Tamil and more",
    rating: 5,
    reviews: 37,
    image: hitesh,
  },
  {
    name: "Suran Singh Dhami",
    location: "Russia, Moscow",
    languages: "English",
    rating: 5,
    reviews: 5,
    image: hukkam,
  },
  {
    name: "Abishek Kunwar",
    location: "Milan, Italy",
    languages: "English, French and more",
    rating: 5,
    reviews: 135,
    image: abishek,
  },
  {
    name: "Sushant Kumar Mishara.",
    location: "Seoul, South Korea",
    languages: "English, Korean",
    rating: 5,
    reviews: 28,
    image: sushant,
  },
];

const GuideCard = ({ guide }) => (
  <div className="guide-card">
    <img src={guide.image} alt={guide.name} className="guide-image" />
    <div className="guide-content">
      <h3 className="guide-name">{guide.name}</h3>
      <div className="guide-rating">
        {"★".repeat(guide.rating)}
        <span className="guide-reviews">({guide.reviews})</span>
      </div>
      <div className="guide-location">{guide.location}</div>
      <div className="guide-languages">{guide.languages}</div>
      <button className="message-button">💬 Message</button>
    </div>
  </div>
);

const LocalGuides = () => {
  return (
    <div className="guides-container">
      <h2 className="guides-title">Meet your local guides</h2>
      <div className="guides-grid">
        {guides.map((guide, index) => (
          <GuideCard key={index} guide={guide} />
        ))}
      </div>
    </div>
  );
};

export default LocalGuides;
