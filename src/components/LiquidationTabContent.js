import React, { useState } from "react";
import { Bust } from "../components/Function2";
import Swal from "sweetalert2";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

export default function LiquidationTabContent() {
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  const LiquidCards_Data = [
    {
      id: 1,
      heading: "Buy Liquidated BETH",
      title: "Input how much BCK you want to use to buy BETH :",
      buttonText: "Buy",
      inputTitle: "Balance : $ 5679",
      onChangeInput: handleonChangeInput,
      onClick: handleBust,
    },
  ];
  return (
    <div>
      {LiquidCards_Data.map((item, index) => {
        return (
          <div key={index} className=" p-5">
            <p className=" font-bold font-mont bck-color">{item.heading}</p>
            <div className=" flex flex-col gap-4 mt-3">
              <p className="">{item.title} </p>
              <div className="d-flex">
                <input
                  type="number"
                  onChange={(e) => item.onChangeInput(e)}
                  placeholder={item.inputTitle}
                  className="rounded-md text-14 focus:ring-2 input-max py-2 px-3 flex-grow"
                />
                <button className="ml-2  drop-shadow-xl max-btn">Max</button>
              </div>
              <div className="mt-3 mb-1">
                <RangeSlider min={50} max={100} />
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
