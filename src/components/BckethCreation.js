import React, { useState, useEffect } from 'react';
import { joinbck, getAccount, getTokenContract} from './Functions';
const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider); // Assume you have a web3 instance in your project

function BckethCreation() {
    const [ethBalance, setEthBalance] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [estimatedGas, setEstimatedGas] = useState(0);
    const [canMint, setCanMint] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      async function fetchBalances() {
          const accounts = await getAccount();
          const balance = await web3.eth.getBalance(accounts);
          setEthBalance(parseFloat(balance));
      }
  
      async function fetchGas() {
          const token = await getTokenContract();
          const accounts = await getAccount();
          const gasPrice = await web3.eth.getGasPrice();
        // Correct for 1 ETH.
          const gasEstimate = await token.methods.mint().estimateGas({ from: accounts, value: web3.utils.toWei('0.01', 'ether') });
          const totalGas = parseFloat((gasEstimate * gasPrice));
          setEstimatedGas(totalGas);
      }
  
      fetchBalances();
      fetchGas();
  }, []);
  
  const handleMaxClick = () => {
      const maxAmount = Number(ethBalance) - Number((Number(estimatedGas)));
      const maxAmountInEther = parseFloat(web3.utils.fromWei((maxAmount * 0.9995).toString(), 'ether'));
      if (maxAmountInEther > 0) {
          setInputValue(maxAmountInEther);
          setCanMint(true);
      } else {
          setInputValue('Not enough gas');
          setCanMint(false);
      }
  };

    const handleMintClick = async () => {
      setIsLoading(true);
        await joinbck(inputValue);
        setIsLoading(false);
    };

    return (
      <div className="card-backgorund p-3">
          <p className="text-24 font-bold font-mont text-center">BCKETH</p>
          <div className="mt-3">
              <div className="flex flex-col gap-2">
                  <label htmlFor="mintAmount" className="text-16 font-medium">
                      Mint BCKETH Amount:
                  </label>
                  <div className="flex">
                      <input 
                          type="number"
                          value={inputValue}
                          onChange={e => setInputValue(e.target.value)}
                          placeholder={`Balance: ${parseFloat(web3.utils.fromWei(ethBalance.toString(), 'ether')).toFixed(2)} ETH`}
                          className="rounded-md text-14 bg-transparent focus:ring-2 outline-none border py-2 px-3 flex-grow"
                      />
                      <button onClick={handleMaxClick} className="ml-2 BoxGradient-buttons drop-shadow-xl hover:drop-shadow-sm">
                          Max
                      </button>
                  </div>
                  <button
                      id="mintAmount"
                      onClick={handleMintClick}
                      className="BoxGradient-buttons drop-shadow-xl hover:drop-shadow-sm mt-2"
                      disabled={isLoading || !canMint}
                  >
                      Mint
                  </button>
              </div>
              {!canMint && 
                  <span title="Not enough gas to proceed." className="ml-2 mt-2">⚠️</span>
              }
          </div>
      </div>
  );
            }  

export default BckethCreation;
