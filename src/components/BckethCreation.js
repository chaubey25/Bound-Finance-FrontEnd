import React, { useState, useEffect } from "react";
import { joinbck, getAccount, getTokenContract } from "./Functions";
const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider); // Assume you have a web3 instance in your project
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

function BckethCreation() {
  const [ethBalance, setEthBalance] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [estimatedGas, setEstimatedGas] = useState(0);
  const [canMint, setCanMint] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  let balance=parseFloat(web3.utils.fromWei(ethBalance.toString(), "ether")).toFixed(2)
  const [inputRangeValue, setInputRangeValue] = useState(0);

  //   useEffect(() => {
  //     async function fetchBalances() {
  //       const accounts = await getAccount();
  //       const balance = await web3.eth.getBalance(accounts);
  //       setEthBalance(parseFloat(balance));
  //     }

  //     async function fetchGas() {
  //       const token = await getTokenContract();
  //       const accounts = await getAccount();
  //       const gasPrice = await web3.eth.getGasPrice();
  //       // Correct for 1 ETH.
  //       const gasEstimate = await token.methods
  //         .mint()
  //         .estimateGas({
  //           from: accounts,
  //           value: web3.utils.toWei("0.01", "ether"),
  //         });
  //       const totalGas = parseFloat(gasEstimate * gasPrice);
  //       setEstimatedGas(totalGas);
  //     }

  //     fetchBalances();
  //     fetchGas();
  //   }, []);

  //   const handleMaxClick = () => {
  //       const maxAmount = Number(ethBalance) - Number((Number(estimatedGas)));
  //       const maxAmountInEther = parseFloat(web3.utils.fromWei((maxAmount * 0.9995).toString(), 'ether'));
  //       if (maxAmountInEther > 0) {
  //           setInputValue(maxAmountInEther);
  //           setCanMint(true);
  //       } else {
  //           setInputValue('Not enough gas');
  //           setCanMint(false);
  //       }
  //   };

  useEffect(() => {
    async function fetchBalances() {
      try {
        const accounts = await getAccount();
        const balance = await web3.eth.getBalance(accounts);
        setEthBalance(parseFloat(balance));
      } catch (error) {
        console.error("Error fetching balances:", error);
        // Handle the error, e.g., show an error message to the user.
      }
    }

    async function fetchGas() {
      try {
        const token = await getTokenContract();
        const accounts = await getAccount();
        const gasPrice = await web3.eth.getGasPrice();
        // Correct for 1 ETH.
        const gasEstimate = await token.methods.mint().estimateGas({
          from: accounts,
          value: web3.utils.toWei("0.01", "ether"),
        });
        const totalGas = parseFloat(gasEstimate * gasPrice);
        setEstimatedGas(totalGas);
      } catch (error) {
        console.error("Error fetching gas data:", error);
        // Handle the error, e.g., show an error message to the user.
      }
    }

    try {
      fetchBalances();
      fetchGas();
    } catch (error) {
      console.error("An error occurred during data fetching:", error);
      // Handle the error, e.g., show an error message to the user.
    }
  }, []);

  const handleMaxClick = () => {
    try {
      // Ensure ethBalance and estimatedGas are valid numbers
      const ethBalanceValue = Number(ethBalance);
      const estimatedGasValue = Number(estimatedGas);

      if (isNaN(ethBalanceValue) || isNaN(estimatedGasValue)) {
        throw new Error("Invalid ethBalance or estimatedGas value");
      }

      const maxAmount = ethBalanceValue - estimatedGasValue;


      if (maxAmount > 0) {
        const maxAmountInEther = parseFloat(
          web3.utils.fromWei((maxAmount * 0.9995).toString(), "ether")
          );
          console.log(maxAmountInEther,"maxAmountInEther")
        setInputValue(maxAmountInEther);
        setInputRangeValue(maxAmountInEther);
        setCanMint(true);
      } else {
        setInputValue("Not enough gas");
        setCanMint(false);
      }
    } catch (error) {
      console.error("Error in handleMaxClick:", error);
      // Handle the error, e.g., show an error message to the user.
    }
  };

  // const handleMintClick = async () => {
  //   setIsLoading(true);
  //     await joinbck(inputValue);
  //     setIsLoading(false);
  // };

  const handleMintClick = async () => {
    setIsLoading(true);

    try {
      await joinbck(inputValue);
    } catch (error) {
      console.error("Error while minting:", error);
      // Handle the error, e.g., show an error message to the user.
    } finally {
      setIsLoading(false);
    }
  };
  const now = 60;

  //for slider
  const handleInputChange = (e) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      setInputValue(newValue);
      setInputRangeValue(newValue); 
      setCanMint(true);
    } else {
      setInputValue("");
      setInputRangeValue(0); 
      setCanMint(false); 
    }
  };

  let increment = 0.00000000001 ;

  const handleRangeChange = (value) => {
    setInputValue(value);
    setInputRangeValue(value);
  
    // Calculate the maximum possible value for the slider based on your balance
    const maxSliderValue = (balance - increment).toFixed(3); //0.00000000001  is subtracted to leave some balance for gas
  
    if (parseFloat(maxSliderValue) < value) {
      // If the value exceeds the maximum allowed value, set it to the maximum allowed value
      setInputValue(maxSliderValue);
      setInputRangeValue(maxSliderValue);
    }
  
    setCanMint(true);
  };
  

  return (
    <div className="card-backgorund p-5">
      <p className="text-24 font-bold bck-color">BCKETH</p>
      <div className="mt-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="mintAmount" className="text-16 font-medium mint-text">
            Mint BCKETH Amount:
          </label>
          <div className="flex mt-3">
            <input
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={`Balance: ${parseFloat(
                web3.utils.fromWei(ethBalance.toString(), "ether")
              ).toFixed(2)} ETH`}
              className="rounded-md text-14 focus:ring-2 input-max py-2 px-3 flex-grow"
            />
            <button
              onClick={handleMaxClick}
              className="ml-2  drop-shadow-xl max-btn"
            >
              Max
            </button>
          </div>
          <div className="mt-4">
            <InputRange
              step={increment}
              allowSameValues={true}
              draggableTrack={true}
              value={inputRangeValue}
              onChange={handleRangeChange}
            />
          </div>
          <button
            id="mintAmount"
            onClick={handleMintClick}
            className="BoxGradient-button-max drop-shadow-xl hover:drop-shadow-sm mt-4"
            disabled={isLoading || !canMint}
          >
            Mint
          </button>
        </div>
        {!canMint && (
          <span title="Not enough gas to proceed." className="ml-2 mt-2">
            ⚠️
          </span>
        )}
      </div>
    </div>
  );
}

export default BckethCreation;
