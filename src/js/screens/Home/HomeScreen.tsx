import { useEffect, useState } from "react";
import { subscribeBackgroundColor } from "../../lib/utils/bolt";
import { useTranscription } from "../../hooks";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import LanguagePicker from "../../components/LanguagePicker/LanguagePicker";

import Footer from "../../components/Footer/Footer";
import GeneralModal from "../../modals/GeneralModal/GeneralModal";
import ConfirmJobModal from "../../modals/ConfirmJobModal/ConfirmJobModal";
import { AnimatePresence } from "framer-motion";

import "./homeScreen.css";

const languages = [
  { text: "Hebrew", value: "he" },
  { text: "Persian", value: "fr" },
  { text: "English", value: "en" },
  { text: "Arabic", value: "ar" },
  { text: "Auto Detect Language", value: "auto" },
];

const HomeScreen = () => {
  const { createTranscription, uploadProgress } = useTranscription();
  const [selectedLanguage, setSelectedLanguage] = useState(4);
  const [punctuations, setPunctuations] = useState(true);

  const [isConfirmJobModalDisplayed, setIsConfirmJobModalDisplayed] =
    useState(false);

  const balanceLeft = 30;
  const jobLength = 25;

  const onTranscribeButtonClick = () => {
    if (balanceLeft > jobLength) {
      setIsConfirmJobModalDisplayed(true);
    }
  };

  return (
    <div className="homeScreenContent">
      <AnimatePresence>
        {isConfirmJobModalDisplayed && (
          <GeneralModal>
            <ConfirmJobModal
              onCancel={() => setIsConfirmJobModalDisplayed(false)}
              onAction={() => {
                setIsConfirmJobModalDisplayed(false);
                createTranscription();
              }}
            />
          </GeneralModal>
        )}
      </AnimatePresence>
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
        <div className="transcribe btn" onClick={onTranscribeButtonClick}>
          Transcribe
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomeScreen;
