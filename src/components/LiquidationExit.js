import React, { useState } from "react";
import { exitSKR } from "./Function2";
import Swal from "sweetalert2";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");

export default function LiquidationExit() {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputRangeValue,setInputRangeValue] =useState(0);

  const handleonChangeInput = (e) => {
    setAmount(e.target.value);
    setInputRangeValue('')
  };
  const handleExitSKR = async () => {
    setIsLoading(true);

    await exitSKR(amount);

    setIsLoading(false);
  };

  const increment=0.01;
  const handleExitClick = () => {
    let amounts = web3.utils.fromWei(amount.toString(), "ether");
    setAmount(amounts);
  };

  const handleInputChange = (e) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      setAmount(newValue);
      setInputRangeValue(newValue);
    } else {
      setAmount("");
      setInputRangeValue(0);
    }
  };

  const handleRangeChange = (value) => {
    setInputRangeValue(value);
    setAmount(value);
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
      handleMax:handleExitClick,
      handleInputChange:handleInputChange,
      valueInput:amount,
      range:inputRangeValue,
      handleRange:handleRangeChange,
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
                  onChange={handleInputChange}
                  placeholder={item.inputTitle}
                  className="rounded-md text-14 focus:ring-2 input-max py-2 px-3 flex-grow"
                  value={item.valueInput}
                />
                <button className="ml-2  drop-shadow-xl max-btn" onClick={item.handleMax}>Max</button>
              </div>
              <div className="mt-4 mb-1">
                <InputRange
                  step={increment}
                  allowSameValues={true}
                  draggableTrack={true}
                  value={item.range}
                  onChange={item.handleRange}
                />
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
