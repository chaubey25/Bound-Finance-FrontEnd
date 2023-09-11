import React from "react";
import { IsSafeFunction } from "./Functions";
import ReactSpeedometer from "react-d3-speedometer";
import './Style/Safe.css';

export default function CheckCupSafety() {
  const value = "125%";

  return (
    <div className="p-3 card-backgorund">
      <p className="text-24 font-bold text-center bck-color">
        Is My CDP Safe From Liquidation ?
      </p>
      <div className="d-flex justify-content-center semi-circle-gauge mt-4">
        <ReactSpeedometer
          width={300}
          needleHeightRatio={0.5}
          value={value}
          customSegmentStops={[0, 250, 750, 1000]}
          segmentColors={["#8590C8", "#8590C8", "#40304c"]}
          currentValueText="125% / 150%"
          customSegmentLabels={[
            {
              backgroundColor: "#49E600",
            },
            {
              text: "Your LTV",
              position: "OUTSIDE",
              color: "#ffff",
            },
            {
              // text: 'Awesome!',
              // position: 'OUTSIDE',
              // color: '',
            },
          ]}
          ringWidth={45}
          needleTransitionDuration={3333}
          needleTransition="easeElastic"
          needleColor={"#ffff"}
          textColor={"#49E600"}
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
