import React from 'react';
import './css/tourguide.css';
import { MapPin, CalendarIcon, Smartphone, Headphones } from 'lucide-react';
import GuideCard from './Banner/GuideCard';
import AD from'./ad/AD';


export default function HeroSection() {
  return (
      
    <>
    <div className="hero-bg">
  
      <div className="hero-overlay"></div>
      <div className="hero-container">
        <h1 className="hero-title">Take a friendlier route</h1>
        <p className="hero-subtitle">Truly get to know a place from people who know it best</p>

       

        <div className="hero-search-bar">
          <div className="search-input">
            <MapPin className="search-icon" />
            <input type="text" placeholder="What city can we show you?" />
          </div>
          <div className="search-input">
            <CalendarIcon className="search-icon" />
            <input type="date" />
          </div>
          <button className="search-button">Search</button>
        </div>

        <div className="features">
          <div className="feature">
            <div className="icon"></div>
            <p>100% private tours</p>
          </div>
          <div className="feature">
            <div className="icon"></div>
            <p>Fully customizable itineraries</p>
          </div>
          <div className="feature">
            <Smartphone className="icon-svg" />
            <p>Flexible cancellation</p>
          </div>
          <div className="feature">
            <Headphones className="icon-svg" />
            <p>24/7 customer support</p>
          </div>
        </div>
      </div>
    
      </div>
  <GuideCard />
 <AD />
  
  </>
    
  );
}
