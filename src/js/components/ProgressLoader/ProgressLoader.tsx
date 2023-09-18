import React, { useEffect, useState } from "react";
import "./progressLoader.css";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface ProgressLoaderProps {
  percent?: number;
}
const ProgressLoader = ({ percent }: ProgressLoaderProps) => {
  return (
    <div className="progressLoaderContainer">
      <div className="circle">{percent ? `${percent}%` : ""}</div>

      <div className={`border ${!percent && "rotating"}`}>
        <CircularProgressbar
          value={percent ?? 80}
          background={false}
          backgroundPadding={0}
          strokeWidth={1}
          styles={buildStyles({
            trailColor: "transparent",
            pathColor: `#0050C9`,
            rotation: 0.5,
          })}
        />
      </div>
    </div>
  );
};

export default ProgressLoader;
