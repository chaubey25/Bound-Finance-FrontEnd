import React, { useState, useEffect } from "react";
import { FreeFunction, WipeFunction } from "./Functions";
import { saiContract } from './Functionview';
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
    let amount = web3.utils.fromWei(saiBalance.toString(), 'ether');
    document.getElementById("wadInputwipe").value = amount; // directly setting value for input
  };

  return (
    <div className="p-3 card-backgorund rounded-lg">
      <p className="text-24 font-bold text-center ">Pay Back BCK </p>
      <div className="flex flex-col gap-2 mt-3">
        <label htmlFor="wipe" className="text-16 font-medium">
          Pay Off BCK Stablecoin ($) :
        </label>
        <div className="flex">
          <input
            type="number"
            id="wadInputwipe"
            className="rounded-md text-14 bg-transparent focus:ring-2 outline-none border py-2 px-3 flex-grow"
            placeholder={`Balance: ${parseFloat(web3.utils.fromWei(saiBalance.toString(), 'ether')).toFixed(2)} BCK`}
          />
          <button onClick={handleMaxPayBackClick} className="ml-2 BoxGradient-buttons drop-shadow-xl hover:drop-shadow-sm">
            Max
          </button>
        </div>
        <button onClick={WipeFunction} className="BoxGradient-buttons drop-shadow-xl hover:drop-shadow-sm">
          Pay Off BCK Stablecoin ($)
        </button>
      </div>
      <div className="flex flex-col mt-3 gap-2">
        <label htmlFor="free" className="text-16 font-medium">
          Remove BCKETH Collateral:
        </label>
        <input
          type="number"
          id="wadInputfree"
          className="rounded-md  text-14 bg-transparent focus:ring-2 outline-none border py-2 px-3"
          placeholder="Amount (BCKETH)"
        />
        <button onClick={FreeFunction} className="BoxGradient-buttons drop-shadow-xl hover:drop-shadow-sm">
          Remove
        </button>
      </div>
    </div>
  );
}

