import { ISequenceSettings } from "../../js/types";
export const exportInOutToMP3 = (fileOutPath: string): ISequenceSettings => {
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

export const createTitles = (srtPath: string, startTime: number) => {
  // var activeSeq = app.project.activeSequence;
  var project = app.project;
  if (project) {
    // Specify the path to your file. This needs to be an absolute path.
    var filePath = srtPath; // for Windows

    // Import the file into the project
    project.importFiles([filePath], true, project.rootItem, false);

    const projectItemsLength = app.project.rootItem.children.numItems;

    let importedSubtitles = null;
    const fileName = new File(srtPath).name;
    for (let index = 0; index < projectItemsLength; index++) {
      const item = app.project.rootItem.children[index];
      if (item.name === fileName) {
        importedSubtitles = item;
        break;
      }
    }

    if (!importedSubtitles) throw Error("Error in importing subtitles");

    // @ts-ignore
    app.project.activeSequence.createCaptionTrack(
      importedSubtitles,
      startTime,
      // @ts-ignore
      Sequence.CAPTION_FORMAT_SUBTITLE
    );
    return true;
  }
  return false;
};
