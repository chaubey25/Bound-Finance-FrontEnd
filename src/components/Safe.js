import React from "react";
import { IsSafeFunction } from "./Functions";
import ReactSpeedometer from "react-d3-speedometer";
import "./Style/Safe.css";

export default function CheckCupSafety() {
  const value = "125%";

  return (
    <div className="p-3 card-backgorund">
      <p className="text-24 font-bold text-center bck-color">
        Is My CDP Safe From Liquidation ?
      </p>
      <div className=" your-ltv">Your LTV</div>
      <div className="d-flex justify-content-center semi-circle-gauge mt-4">
        <div className="for-first-ring">
          <div className="second-ring">
            <ReactSpeedometer
              segments={3}
              width={350}
              customSegmentLabels={[{}, {}, {}]}
              ringWidth={10}
              needleColor={"none"}
            />
          </div>
        </div>
        <ReactSpeedometer
          width={300}
          segments={1}
          needleHeightRatio={0.5}
          value={value}
          segmentColors={["#8590C8"]}
          currentValueText="125% / 150%"
          customSegmentLabels={[
            {
              backgroundColor: "#49E600",
              borderRadius: "50%",
            },
          ]}
          ringWidth={45}
          needleTransitionDuration={4444}
          needleTransition="easeElastic"
          needleColor={"#ffff"}
          textColor={"#49E600"}
          currentValuePlaceholderStyle=""
        />
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <button
          onClick={IsSafeFunction}
          className="BoxGradient-button-max drop-shadow-xl hover:drop-shadow-sm mt-4"
        >
          Check Safety
        </button>
      </div>
    </div>
  );
}
