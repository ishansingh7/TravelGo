import React from "react";
import "./TrendingGetaways.css";
import goa1 from "./image/goa1.png";
import goa2 from "./image/goa2.png";
import goa3 from "./image/goa3.png";
import ktm from "./image/ktm.png";
import ktm2 from "./image/ktm2.png";
import ktm3 from "./image/ktm3.png";
import thai1 from "./image/thai1.jpg";
import thai2 from "./image/thai2.jpg";
import thai3 from "./image/thai3.png";

const getaways = [
  {
    title: "Best Hotels In Goa",
    subtitle: "3051 properties available",
    images: [
      goa1,
      goa2,
      goa3,
      
     
    ],
  },
  {
    title: "Couple friendly hotels in Kathamandu",
    subtitle: "530 properties available",
    images: [
    ktm,
      ktm2,
        ktm3,
      
    ],
  },
  {
    title: "Hill view hotels in Thailand",
    subtitle: "1198 properties available",
    images: [
      thai1,
      thai2,
        thai3,
   
    ],
  },
];

const TrendingGetaways = () => {
  return (
    <div className="trending-container">
      <h2 className="trending-title">Trending getaways!</h2>
      <div className="getaways-grid">
        {getaways.map((item, index) => (
          <div className="getaway-card" key={index}>
            <div className="image-grid">
              <div className="main-img">
                <img src={item.images[0]} alt={item.title} />
              </div>
              <div className="side-imgs">
                <img src={item.images[1]} alt="" />
                <img src={item.images[2]} alt="" />
                <img src={item.images[3]} alt="" />
              </div>
            </div>
            <div className="getaway-info">
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingGetaways;
