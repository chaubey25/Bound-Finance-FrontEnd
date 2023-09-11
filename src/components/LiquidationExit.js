import React, { useState } from "react";
import { exitSKR } from "./Function2";
import Swal from "sweetalert2";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

export default function LiquidationExit() {
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleonChangeInput = (e) => {
    setAmount(e.target.value);
  };
  const handleExitSKR = async () => {
    setIsLoading(true);

    await exitSKR(amount);

    setIsLoading(false);
  };

  const LiquidCards_Data = [
    {
      id: 1,
      heading: "Exit SKR",
      title: "Amount of SKR you want to convert back to BCKETH",
      buttonText: "Exit SKR",
      inputTitle: "Balance : $ 579",
      onChangeInput: handleonChangeInput,
      onClick: handleExitSKR,
    },
  ];
  return (
    <div>
      {" "}
      {LiquidCards_Data.map((item, index) => {
        return (
          <div key={index} className="card-backgorund p-3">
            <p className="text-24 font-bold font-mont bck-color">
              {item.heading}
            </p>
            <div className=" flex flex-col gap-2 mt-3">
              <p>{item.title} :</p>
              <div className="d-flex">
                <input
                  type="number"
                  onChange={(e) => item.onChangeInput(e)}
                  placeholder={item.inputTitle}
                  className="rounded-md text-14 focus:ring-2 input-max py-2 px-3 flex-grow"
                />
                <button className="ml-2  drop-shadow-xl max-btn">Max</button>
              </div>
              <div className="mt-4 mb-1">
                <RangeSlider min={50} max={100} />
              </div>  
              <button
                onClick={item.onClick}
                className="BoxGradient-button-max drop-shadow-xl hover:drop-shadow-sm mt-3"
              >
                {item.buttonText}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
