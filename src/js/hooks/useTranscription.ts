import axios, { AxiosProgressEvent } from "axios";
import FormData from "form-data";
import path from "path";
import { evalTS } from "../lib/utils/bolt";

import { nanoid } from "nanoid";
import { fs } from "../lib/cep/node";
import { ITranscription } from "../types";
import * as TranscriptionService from "../services/transcription.service";
import { useState } from "react";

const transcribe = async (
  uploadPercentageCallback: (progressEvent: AxiosProgressEvent) => void
): Promise<ITranscription> => {
  const outPath = path.join(__dirname, "/temp-files/temp.mp3");
  //todo: make sure if path exists, if not - create folder

  const sequenceInOut = await evalTS("exportInOutToMP3", outPath);

  const transcription = await TranscriptionService.transcript(
    outPath,
    uploadPercentageCallback
  );
  return {
    startTime: sequenceInOut.inPoint,
    transcription,
  };
};

export const useTranscription = () => {
  const [uploadProgress, setUploadProgress] = useState(0);

  const updateProgress = (progressEvent: AxiosProgressEvent) => {
    setUploadProgress(Math.round(progressEvent.loaded));
  };

  const createTranscription = async () => {
    try {
      const transcription = await transcribe(updateProgress);

      const srtPath = path.join(
        __dirname,
        `/temp-files/subtitles-${nanoid()}.srt`
      );
      fs.writeFileSync(srtPath, transcription.transcription);
      await evalTS("createTitles", srtPath, transcription.startTime);
      // fs.unlinkSync(outPath);
    } catch (e) {
      console.log(`Error: ${e}`);
      //todo: handle error
    }
  };

  return { createTranscription, uploadProgress };
};
