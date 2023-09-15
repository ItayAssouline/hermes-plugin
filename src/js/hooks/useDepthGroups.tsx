import { useCallback, useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { evalTS } from "../lib/utils/bolt";
import { DepthGroupType, Layer, SimpleLayer } from "../types/general.types";
import { enrichDepthGroups } from "../utils/depthGroups.utils";
const useDepthGroups = () => {
  const [depthGroups, setDepthGroups] = useState<DepthGroupType[]>([]);

  const [selectedDepthGroupIndex, setSelectedDepthGroupIndex] = useState(0);

  const [prevSelectedDepthGroupIndex, setPrevSelectedDepthGroupIndex] =
    useState(0);

  const changeSelectedDepthGroup = (newDepthGroupIndex: number) => {
    setPrevSelectedDepthGroupIndex(selectedDepthGroupIndex);
    setSelectedDepthGroupIndex(newDepthGroupIndex);
  };

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.children[selectedDepthGroupIndex].scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [selectedDepthGroupIndex]);

  const createDepthGroupForSelectedLayers = async () => {
    try {
      if (groupNameEditingIndex === -1) {
        const newLabel = (depthGroups.length + 1) % 15;
        const selectedLayers: Layer[] = (await evalTS(
          "getSelectedLayers"
        )) as Layer[];

        const labelColor = await evalTS("getLabelGroupsColors", newLabel);

        const layerIndices = selectedLayers.map((layer) => layer.uuid);

        evalTS("addLayersToDepthGroup", layerIndices, newLabel);

        setDepthGroups((prev) => {
          const newArr = [...prev];
          newArr.push({
            name: `Depth Group ${prev.length}`,
            inbetweenDistance: 100,
            layers: selectedLayers,
            label: { labelIndex: newLabel, labelColor },
            threePreviewData: {
              position: new Vector3(0, 0, 0),
            },
            frontPadding: 1000,
          });

          return enrichDepthGroups(newArr);
        });
        changeSelectedDepthGroup(depthGroups.length);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addLayersToDepthGroup = async (index: number) => {
    try {
      const group = depthGroups[index];
      const selectedLayers: Layer[] = (await evalTS(
        "getSelectedLayers"
      )) as Layer[];

      const layerIndices = selectedLayers.map((layer) => layer.uuid);

      evalTS("addLayersToDepthGroup", layerIndices, group.label.labelIndex);

      setDepthGroups((prevDepthGroups) => {
        const newArr = [...prevDepthGroups];
        newArr[index].layers.push(...selectedLayers);
        return newArr;
      });
    } catch (e) {
      console.log(e);
    }
  };

  const removeSelectedLayersFromGroup = async (index: number) => {
    const group = depthGroups[index];
    const selectedLayers: Layer[] = (await evalTS(
      "getSelectedLayers"
    )) as Layer[];

    const layerOriginals = group.layers.filter((obj1) =>
      selectedLayers.some((obj2) => obj2.uuid === obj1.uuid)
    );
    evalTS("revertLayersToOriginalLabelGroup", layerOriginals);

    setDepthGroups((prev) => {
      const newArr = [...prev];

      const arrayOfUuids = newArr[index].layers.map((obj) => obj.uuid);

      const newLayersArray = newArr[index].layers.filter(
        (obj) => !arrayOfUuids.includes(obj.uuid)
      );

      newArr[index].layers = newLayersArray;
      return enrichDepthGroups(newArr);
    });
  };

  const handleExpandedChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      changeSelectedDepthGroup(isExpanded ? panel : -1);
    };

  const editDepthGroup = useCallback(
    (index: number, depthGroup: DepthGroupType) => {
      setDepthGroups((prev) => {
        const newArr = [...prev];
        newArr[index] = depthGroup;
        return enrichDepthGroups(newArr);
      });
    },
    [setDepthGroups]
  );

  const [groupNameEditingIndex, setGroupNameEditingIndex] = useState(-1);

  const setGroupInEditState = (index: number, isEditing: boolean) => {
    if (isEditing) setGroupNameEditingIndex(index);
    else setGroupNameEditingIndex(-1);
  };

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;
    changeSelectedDepthGroup(-1);

    setDepthGroups((prevDepthGroups) => {
      const newDepthGroups = Array.from(prevDepthGroups);
      const [reorderedItem] = newDepthGroups.splice(result.source.index, 1);
      newDepthGroups.splice(result.destination.index, 0, reorderedItem);
      return enrichDepthGroups(newDepthGroups);
    });
  }

  const deleteGroup = (groupIndex: number) => {
    evalTS("revertLayersToOriginalLabelGroup", depthGroups[groupIndex].layers);

    setGroupInEditState(-1, false);

    setDepthGroups((prev) => {
      const newArr = [...prev];
      newArr.splice(groupIndex, 1);
      return enrichDepthGroups(newArr);
    });
    changeSelectedDepthGroup(groupIndex - 1);
  };

  const deleteAllGroups = () => {
    const newArr: Layer[] = [];
    depthGroups.forEach((depthGroup) => {
      newArr.push(...depthGroup.layers);
    });
    evalTS("revertLayersToOriginalLabelGroup", newArr);
  };

  const applyDepthGroupsToScene = () => {
    const layersArray: SimpleLayer[] = [];
    let currentDepth = 0;
    depthGroups.forEach((depthGroup) => {
      depthGroup.layers.forEach((layer, index) => {
        let zPosition = 0;
        if (index === 0) {
          zPosition = currentDepth + depthGroup.frontPadding;
        } else {
          zPosition = currentDepth + depthGroup.inbetweenDistance;
        }
        currentDepth = zPosition;
        layersArray.push({ uuid: layer.uuid, zPosition });
      });
    });
    evalTS("applyDepthGroupByLayers", layersArray);
  };

  return {
    depthGroups,
    selectedDepthGroupIndex,
    prevSelectedDepthGroupIndex,
    changeSelectedDepthGroup,
    createDepthGroupForSelectedLayers,
    handleExpandedChange,
    editDepthGroup,
    groupNameEditingIndex,
    handleOnDragEnd,
    deleteGroup,
    deleteAllGroups,
    setGroupInEditState,
    listRef,
    applyDepthGroupsToScene,
    addLayersToDepthGroup,
    removeSelectedLayersFromGroup,
  };
};

export default useDepthGroups;
