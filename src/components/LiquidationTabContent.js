import React, { useState } from "react";
import { Bust } from "../components/Function2";
import Swal from "sweetalert2";

import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider);

export default function LiquidationTabContent() {
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [exitAmount, setExitAmount] = useState("");
  const [inputRangeValue,setInputRangeValue] = useState(0)

  // const handleonChangeInput = (e) => {
  //   setAmount(e.target.value);
  // };

  // const handleBust = async () => {
  //   setIsLoading(true);

  //     await Bust(amount);

  //   setIsLoading(false);
  // };

  const handleonChangeInput = (e) => {
    setAmount(e.target.value);
    setExitAmount("");
  };

  const handleBust = async () => {
    setIsLoading(true);

    try {
      await Bust(amount);
      // If the Bust function succeeds, you can add any further logic here.
    } catch (error) {
      // Handle errors from the Bust function here.
      console.error("Error while busting:", error);
      // You can also set an error state or display an error message to the user.
    } finally {
      setIsLoading(false);
    }
  };

  //slider
  const handleExitClick = () => {
    let amounts = web3.utils.fromWei(amount.toString(), "ether");
    setExitAmount(amounts);
  };

  const increment=0.01;
  const handleInputBuyChange = (e) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      setExitAmount(newValue);
      setInputRangeValue(newValue);
    } else {
      setExitAmount("");
      setInputRangeValue(0);
    }
  };
  const handleBuyRangeChange = (value) => {
    setInputRangeValue(value);
    setExitAmount(value);
  };

  const LiquidCards_Data = [
    {
      id: 1,
      heading: "Buy Liquidated BETH",
      title: "Input how much BCK you want to use to buy BETH :",
      buttonText: "Buy",
      inputTitle: "Balance : $ 5679",
      onClickMax: handleExitClick,
      handleInputChange:handleInputBuyChange,
      handleRangeChange:   handleBuyRangeChange,
      valueInput: exitAmount,
      onChangeInput: handleonChangeInput,
      onClick: handleBust,
    },
  ];
  return (
    <div>
      {LiquidCards_Data.map((item, index) => {
        return (
          <div key={index} className="tab-pad">
            <p className=" font-bold font-mont bck-color">{item.heading}</p>
            <div className=" flex flex-col gap-4 mt-3">
              <p className="">{item.title} </p>
              <div className="d-flex">
                <input
                  type="number"
                  onChange={item.handleInputChange}
                  placeholder={item.inputTitle}
                  className="rounded-md text-14 focus:ring-2 input-max py-2 px-3 flex-grow"
                  value={item.valueInput}
                />
                <button
                  onClick={item.onClickMax}
                  className="ml-2  drop-shadow-xl max-btn"
                >
                  Max
                </button>
              </div>
              <div className="mt-3 mb-1">
                <InputRange
                  step={increment}
                  allowSameValues={true}
                  draggableTrack={true}
                  value={inputRangeValue}
                  onChange={item.handleRangeChange}
                />
              </div>
              <button
                onClick={item.onClick}
                className="BoxGradient-button-max drop-shadow-xl hover:drop-shadow-sm"
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
