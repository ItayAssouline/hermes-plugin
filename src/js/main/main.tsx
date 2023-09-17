import { useEffect, useState } from "react";
import { subscribeBackgroundColor } from "../lib/utils/bolt";
import { useTranscription } from "../hooks";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import LanguagePicker from "../../components/LanguagePicker/LanguagePicker";

import "./main.scss";
import Footer from "../../components/Footer/Footer";

const languages = [
  { text: "Hebrew", value: "he" },
  { text: "Persian", value: "fr" },
  { text: "English", value: "en" },
  { text: "Arabic", value: "ar" },
  { text: "Auto Detect Language", value: "auto" },
];

const Main = () => {
  const [bgColor, setBgColor] = useState("#1E1E1E");

  useEffect(() => {
    if (window.cep) {
      subscribeBackgroundColor(setBgColor);
    }
  }, []);
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const { createTranscription, uploadProgress } = useTranscription();
  const [selectedLanguage, setSelectedLanguage] = useState(4);
  const [punctuations, setPunctuations] = useState(true);

  return (
    <div
      className="app"
      style={{
        background: `radial-gradient(circle at center bottom, #1a2537, #1E1E1E)`,
      }}
    >
      <div className="content">
        <div className="title">
          <span id="title">Doing the hard work,</span>
          <span id="subtitle">One word at a time</span>
        </div>
        <div className="language-picker">
          <span className="label">Language</span>
          <LanguagePicker
            languages={languages}
            selectedLanguage={selectedLanguage}
            selectLanguage={setSelectedLanguage}
          />
        </div>
        <div
          className="checkbox"
          onClick={() => {
            setPunctuations((prev) => !prev);
          }}
        >
          <div className={`tick ${!punctuations && "ticked"}`}></div>
          <span>Disable punctuations</span>
        </div>
        <div className="transcribe btn" onClick={createTranscription}>
          Transcribe
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
