import axios, { AxiosProgressEvent } from "axios";
import { fs } from "../lib/cep/node";

export const transcript = async (
  audioFilePath: string,
  uploadPercentageCallback: (progressEvent: AxiosProgressEvent) => void
) => {
  const formData = new FormData();

  const fileData = fs.readFileSync(audioFilePath);
  formData.append(
    "file",
    new Blob([fileData], { type: "application/octet-stream" }),
    "file.mp3"
  );

  const transcriptionResponse = await axios.post(
    "http://localhost:5555/transcription/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: uploadPercentageCallback,
    }
  );

  return transcriptionResponse.data;
};
