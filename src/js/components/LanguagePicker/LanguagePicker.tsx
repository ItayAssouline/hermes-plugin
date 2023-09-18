import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import SideArrow from "../../assets/icons/side-arrow.svg";
import { ILanguage } from "../../types";
import "./languagePicker.css";

const container = {
  hidden: { opacity: 1, scaleY: 0 },
  visible: {
    opacity: 1,
    scaleY: 1,
    anchorPoint: "top",
    transition: {
      delayChildren: 0,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

interface LanguagePickerProps {
  languages: ILanguage[];
  selectedLanguage: number;
  selectLanguage: (index: number) => void;
}
const LanguagePicker = ({
  languages,
  selectLanguage,
  selectedLanguage,
}: LanguagePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="language-picker">
      <div
        className={`main-picker ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {languages[selectedLanguage].text}{" "}
        <img src={SideArrow} alt="" className={isOpen ? "rotated" : ""} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="options"
            variants={container}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ transformOrigin: "top" }}
          >
            {languages.map((language, index) => (
              <motion.div
                onClick={() => {
                  selectLanguage(index);
                  setIsOpen(false);
                }}
                className="option"
                key={language.value}
                variants={item}
              >
                {language.text}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguagePicker;
