import React from "react";
import Logo from '../../assets/images/Asset-2.-300x47.png'
import Logo2 from '../../assets/images/thefarmhouseclublogo2.png.crdownload.png'
// import "./spinner.css";

export default function LoaderComponent() {
  return (
    <div className="loader-container">
        <div className="loadingBg">
            <img src={Logo} alt="" className="loaderImage1"/>
            <img src={Logo2} alt="" className="loaderImage2"/>
            <div className="loader-parent">
                <div className="loading-bar">
                </div>
            </div>
        </div>
    </div>
  );
}