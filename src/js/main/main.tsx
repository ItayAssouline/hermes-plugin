import path from "path";
import { useEffect, useState } from "react";
import { evalTS, subscribeBackgroundColor } from "../lib/utils/bolt";

import "./main.scss";

const Main = () => {
  const [bgColor, setBgColor] = useState("#282c34");

  useEffect(() => {
    if (window.cep) {
      subscribeBackgroundColor(setBgColor);
    }
  }, []);

  const transcribe = async () => {
    try {
      const outPath = path.join(__dirname, "/temp-files/temp.mp3");
      //todo: make sure if path exists, if not - create folder

      const res = await evalTS("transcribe", outPath);
    } catch (e) {
      console.log(`Error: ${e}`);
      //todo: handle error
    }
  };

  return (
    <div className="app" style={{ backgroundColor: bgColor }}>
      <div className="content">
        <button onClick={transcribe}>Press me!</button>
      </div>
    </div>
  );
};

export default Main;
