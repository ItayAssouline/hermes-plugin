import { useEffect, useState } from "react";
import { subscribeBackgroundColor } from "../lib/utils/bolt";
import { useTranscription } from "../hooks";
import "./main.scss";

const Main = () => {
  const [bgColor, setBgColor] = useState("#282c34");

  useEffect(() => {
    if (window.cep) {
      subscribeBackgroundColor(setBgColor);
    }
  }, []);

  const { createTranscription, uploadProgress } = useTranscription();

  return (
    <div className="app" style={{ backgroundColor: bgColor }}>
      <div className="content">
        <h3>{uploadProgress}</h3>
        <button onClick={createTranscription}>Press me!</button>
      </div>
    </div>
  );
};

export default Main;
