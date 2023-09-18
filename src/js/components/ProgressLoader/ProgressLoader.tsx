import React, { useState } from "react";
import "./progressLoader.css";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressLoader = () => {
  const [percent, setPercent] = useState(50);
  return (
    <div className="progressLoaderContainer">
      <div className="circle">75%</div>

      <div className="border">
        <CircularProgressbar
          value={75}
          background={false}
          backgroundPadding={0}
          strokeWidth={2}
          styles={buildStyles({
            trailColor: "transparent",
            pathColor: "#0050C9",
            strokeLinecap: "butt",
          })}
        />
      </div>
    </div>
  );
};

export default ProgressLoader;
