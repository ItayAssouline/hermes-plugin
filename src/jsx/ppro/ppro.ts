import { ISequenceSettings } from "../../js/types";
export const transcribe = (fileOutPath: string): ISequenceSettings => {
  if (!app.project) {
    throw Error("No project open");
  }

  try {
    // Ensure there's an active sequence
    var sequence = app.project.activeSequence;
    if (!sequence) {
      throw Error("No sequence active");
    }

    // Specify export settings
    const outputPresetPath = "C:\\export_preset.epr"; // Provide the path to your desired export preset
    const inPoint = sequence.getInPointAsTime();
    const outPoint = sequence.getOutPointAsTime();

    sequence.exportAsMediaDirect(fileOutPath, outputPresetPath, 1);
    return { inPoint: inPoint.seconds, outPoint: outPoint.seconds };
  } catch (e) {
    throw e;
  }
};
