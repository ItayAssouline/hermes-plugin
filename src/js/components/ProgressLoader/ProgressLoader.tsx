import React, { useEffect, useState } from "react";
import "./progressLoader.css";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressLoader = () => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setPercent((prev) => (prev += 10) % 100);
    }, 1200);
  }, []);

  return (
    <div className="progressLoaderContainer">
      <div className="circle">{percent}%</div>

      <div className="border">
        <CircularProgressbar
          value={percent}
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
