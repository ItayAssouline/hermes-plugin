import React from "react";
import Footer from "../../components/Footer/Footer";
import ProgressLoader from "../../components/ProgressLoader/ProgressLoader";
import "./transcribingScreen.css";

const TranscribingScreen = () => {
  return (
    <div className="transcribingScreenContent">
      <div className="titles">
        <span className="title">Transcribing</span>
        <span className="subtitle">Don’t close this window</span>
      </div>
      
        <ProgressLoader />
    </div>
  );
};

export default TranscribingScreen;
