import axios from "axios";
import path from "path";
import { useEffect, useState } from "react";
import { evalTS, subscribeBackgroundColor } from "../lib/utils/bolt";
import FormData from "form-data";

import "./main.scss";
import { fs } from "../lib/cep/node";
import { a } from "@react-spring/three";
import { AssistantDirection } from "@mui/icons-material";
import { nanoid } from "nanoid";

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

      const sequenceInOut = await evalTS("exportInOutToMP3", outPath);

      const formData = new FormData();

      const fileData = fs.readFileSync(outPath);
      formData.append(
        "file",
        new Blob([fileData], { type: "application/octet-stream" }),
        "file.mp3"
      );

      const translationResponse = await axios.post(
        "http://localhost:5555/transcription/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const srtPath = path.join(
        __dirname,
        `/temp-files/subtitles-${nanoid()}.srt`
      );
      fs.writeFileSync(srtPath, translationResponse.data);
      await evalTS("createTitles", srtPath, sequenceInOut.inPoint);
      // fs.unlinkSync(outPath);
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
