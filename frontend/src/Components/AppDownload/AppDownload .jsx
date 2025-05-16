import React from "react";
import "./AppDownload.css";
import app from "./app.jpg";
import app1 from "./iapp.jpg";
const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <p>
        For Better Experience Download
        <br /> TravelGo App
      </p>
      <div className="app-download-platforms">
        <img src={app} alt="" />
        <img src={app1} alt="" />
      </div>
    </div>
  );
};

export default AppDownload;
