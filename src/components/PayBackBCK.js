import React, { useState, useEffect } from "react";
import { FreeFunction, WipeFunction } from "./Functions";
import { saiContract } from "./Functionview";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider);

export default function PayBackBCK() {
  const [saiBalance, setSaiBalance] = useState(0);

  const balance = parseFloat(
    web3.utils.fromWei(saiBalance.toString(), "ether")
  ).toFixed(2);

  const [inputRangeValuePayOff, setInputRangeValuePayOff] = useState(balance >0 ?balance:'' );
  const [inputValue, setInputValue] = useState('');
  const [inputRangeBCKETH, setInputRangeBCKETH] = useState(0); 

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

  const increment = 0.01;

  const handleInputMaxPayChange = (e) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      // Convert the input value to Wei (integer)
      const weiValue = web3.utils.toWei(newValue.toString(), "ether");
      setSaiBalance(weiValue);
      setInputRangeValuePayOff(newValue);
    } else {
      setSaiBalance("");
      setInputRangeValuePayOff('');
    }
  };

  const handleRangeMaxChange = (e) => {
    const decimalValue = parseFloat(e);
    if (!isNaN(decimalValue)) {
      const weiValue = web3.utils.toWei(decimalValue.toString(), "ether");
      setSaiBalance(weiValue);
      setInputRangeValuePayOff(decimalValue);
    }
  };


  const BckEthIncreAmount=0.01;
  const handleBCKInputChange = (e) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      setInputValue(newValue);
      setInputRangeBCKETH(newValue);
    } else {
      setInputValue('');
      setInputRangeBCKETH(0);
    }
  };
  
  const handleBCKETHRangeChange = (value) => {
    setInputValue(value);
    setInputRangeBCKETH(value);
  };
  
 

  return (
    <div className="p-3 card-backgorund">
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
            value={inputRangeValuePayOff}
            onChange={handleInputMaxPayChange}
          />
          <button
            onClick={handleMaxPayBackClick}
            className="ml-2  drop-shadow-xl max-btn"
          >
            Max
          </button>
        </div>
        <div className="mt-4 mb-1">
          <InputRange
            step={increment}
            allowSameValues={true}
            draggableTrack={true}
            value={inputRangeValuePayOff}
            onChange={handleRangeMaxChange}
          />
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
          onChange={handleBCKInputChange}
          value={inputValue}
        />
        <div className="mt-4 mb-1">
          <InputRange
            step={BckEthIncreAmount}
            allowSameValues={true}
            draggableTrack={true}
            value={inputRangeBCKETH}
            onChange={handleBCKETHRangeChange}
          />
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
