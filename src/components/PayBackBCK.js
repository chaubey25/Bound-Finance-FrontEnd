import React, { useState, useEffect } from "react";
import { FreeFunction, WipeFunction } from "./Functions";
import { saiContract } from "./Functionview";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider);

export default function PayBackBCK() {
  const [saiBalance, setSaiBalance] = useState(0);

  useEffect(() => {
    fetchSAIBalance();
  }, []);

  const fetchSAIBalance = async () => {
    const sai = await saiContract();
    const account = await web3.eth.getAccounts();
    const owner = account[0];
    const balance = await sai.methods.balanceOf(owner).call();
    setSaiBalance(balance);
  };

  const handleMaxPayBackClick = () => {
    let amount = web3.utils.fromWei(saiBalance.toString(), "ether");
    document.getElementById("wadInputwipe").value = amount; // directly setting value for input
  };

  return (
    <div className="p-3 card-backgorund rounded-lg">
      <p className="text-24 font-bold  bck-color">Pay Back BCK </p>
      <div className="flex flex-col gap-2 mt-3 mb-4">
        <label htmlFor="wipe" className="text-16 font-medium mb-3">
          Pay Off BCK Stablecoin ($) :
        </label>
        <div className="flex">
          <input
            type="number"
            id="wadInputwipe"
            className="rounded-md text-14 focus:ring-2 input-max py-2 px-3 flex-grow"
            placeholder={`Balance: ${parseFloat(
              web3.utils.fromWei(saiBalance.toString(), "ether")
            ).toFixed(2)} BCK`}
          />
          <button
            onClick={handleMaxPayBackClick}
            className="ml-2  drop-shadow-xl max-btn"
          >
            Max
          </button>
        </div>
        <div className="mt-4 mb-1">
          <RangeSlider min={50} max={100} />
        </div>
        <button
          onClick={WipeFunction}
          className="BoxGradient-button-max drop-shadow-xl hover:drop-shadow-sm mt-4"
        >
          Pay Off BCK Stablecoin ($)
        </button>
      </div>
      <div className="flex flex-col mt-3 gap-2">
        <label htmlFor="free" className="text-16 font-medium mb-3">
          Remove BCKETH Collateral:
        </label>
        <input
          type="number"
          id="wadInputfree"
          className="rounded-md text-14 focus:ring-2 input-max py-2 px-3 flex-grow"
          placeholder="Amount : 347 (BCKETH)"
        />
        <div className="mt-4 mb-1">
          <RangeSlider min={50} max={100} />
        </div>
        <button
          onClick={FreeFunction}
          className="BoxGradient-button-max drop-shadow-xl hover:drop-shadow-sm mt-4"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
