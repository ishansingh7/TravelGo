import React from "react";
import "./AdBanner.css";
import Advideo from "./bannervideo.mp4";

const AdBanner = () => {
  return (
    <div className="ad-banner-refined">
      <video
        className="ad-video-refined"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={Advideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="ad-overlay-refined">
        <div className="ad-content">
          <h1 className="ad-title">Escape to Paradise</h1>
          <p className="ad-subtitle">Limited-time travel deals you can't miss</p>
          <button className="ad-button">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
