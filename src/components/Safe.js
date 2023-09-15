import React, { useState } from "react";
import { IsSafeFunction } from "./Functions";
import ReactSpeedometer from "react-d3-speedometer";
import "./Style/Safe.css";

export default function CheckCupSafety() {
  const [safetyResult, setSafetyResult] = useState(null);
  const [speedometerValue, setSpeedometerValue] = useState(65); 
  const [ringBackgroundColor, setRingBackgroundColor] = useState("#8590C8"); 

  const handleCheckSafety = async () => {
    try {
      const result = await IsSafeFunction();

      console.log(result, "result");
      setSpeedometerValue(result ? 150 : 0);
      setRingBackgroundColor(result ? "#8590C8" : "#3e2f49");
      setSafetyResult(result);
    } catch (error) {
      console.error(error);
    }
  };

 const determineTextColor = () => {
  if (speedometerValue >= 0 && speedometerValue < 75) return "#49E600"; 
  if (speedometerValue >= 75 && speedometerValue <= 100) return "#CEBA00"; 
  if (speedometerValue >= 100 && speedometerValue <= 150) return "#D00000"; 
};

  return (
    <div className="p-3 card-backgorund">
      <p className="text-24 font-bold text-center bck-color">
        Is My CDP Safe From Liquidation?
      </p>
      <div className="your-ltv">Your LTV</div>
      <div className="d-flex justify-content-center semi-circle-gauge mt-4">
        <div className="for-first-ring">
          <div className="second-ring">
            <ReactSpeedometer
              segments={4}
              width={360}
              segmentColors={["#49E600", "#49E600", "#CEBA00", "#D00000"]}
              customSegmentLabels={[{}, {}, {}, {}]}
              ringWidth={8}
              needleColor={"none"}
            />
          </div>
        </div>
        <ReactSpeedometer
          width={300}
          segments={1}
          needleHeightRatio={0.4}
          value={speedometerValue || safetyResult} 
          segmentColors={["#8590C8", "#8590C8"]}
          currentValueText="% "
          customSegmentLabels={[
            {
              backgroundColor: "#49E600",
              borderRadius: "50%",
            },
          ]}
          ringColor={ringBackgroundColor}
          ringWidth={45}
          needleTransitionDuration={4444}
          needleTransition="easeElastic"
          needleColor={"#ffff"}
          textColor={determineTextColor()} // Set text color based on value
          currentValuePlaceholderStyle=""
          minValue={0} 
          maxValue={150}
        />
      </div>
      <span className="your-ltv-per">/ 150 %</span>
      <div className="flex flex-col gap-2 mt-2 mb-5">
        <button
          onClick={handleCheckSafety}
          className="BoxGradient-button-max drop-shadow-xl hover:drop-shadow-sm mt-4"
        >
          Check Safety
        </button>
      </div>
    </div>
  );
}
