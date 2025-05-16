import React from "react";
import "./AdBanner.css";
import adImage from "./ad.png";

const AdBanner = () => {
  return (
    <div className="ad-banner">
      <div className="ad-banner-image">
        <img src={adImage} alt="Advertisement" className="ad-image" />
      </div>
      <div className="ad-banner-content">
        

        <button
  className="ad-banner-button"
  onClick={() => window.location.href = '/tour-guide'}
>
  Find Your Guide
</button>

      </div>
    </div>
  );
};

export default AdBanner;
