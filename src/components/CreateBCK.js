import React, { useState, useEffect } from "react";
import { DrawFunction, LockFunction, getCupsCreatedByAccount} from "./Functions";
import { BCKETHContract, tubContract } from './Functionview';
import { useMakerDao } from './MakerDaoContext';
import './Style/CreateBCK.css';
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider);


function decimalToHexWithPadding(decimalValue) {
  const hexValue = decimalValue.toString(); 
  const paddedHexValue = web3.utils.padLeft(hexValue, 64); 
  return '0x' + paddedHexValue; 
}

export default function CreateBCK() {
  const [lockAmount, setLockAmount] = useState('');
  const [debtamount, setdebtAmount] = useState(0);
  const [bckEthBalance, setBckEthBalance] = useState(0);
  const { maxBCK } = useMakerDao();

  useEffect(() => {
    fetchBckEthBalance();
    fetchdebt();
  }, []);

  const fetchBckEthBalance = async () => {
    const bck = await BCKETHContract();
    
    const account = await web3.eth.getAccounts();
    const owner = account[0];
    const cup = await getCupsCreatedByAccount(owner);
    console.log(cup[0], 'FIRST CUP ')
    const balance = await bck.methods.balanceOf(owner).call();
   
    setBckEthBalance(Number(balance));
    
  };

  const fetchdebt = async () => {
    try {
      const tub = await tubContract();
      const account1 = await web3.eth.getAccounts();
      const owner1 = account1[0];
      const cup = await getCupsCreatedByAccount(owner1);

      if (cup && cup.length > 0) {
        const cup1 = decimalToHexWithPadding(cup[0]);
        console.log(cup[0], 'FIRST CUP ')
        const debt = await tub.methods.tab(cup1).call();
        console.log(debt, "THIS IS HOW MUCH DEBT THERE IS IN THIS");
        const debteth = await web3.utils.fromWei(debt.toString(), 'ether');
        const debtETHnumber = Number(debteth);
        setdebtAmount(debtETHnumber);
      } else {
        console.error("No cup found. Can't proceed.");
      }
    } catch (error) {
      console.error('An error occurred while fetching debt:', error);
    }
  };

  const handleMaxLockClick = () => {
    let amount = web3.utils.fromWei(bckEthBalance.toString(), 'ether');
    setLockAmount(amount);
  };


  const allowableMint = isNaN(Number(maxBCK) - Number(debtamount)) ? 0 : Number(maxBCK) - Number(debtamount);
  const allowableMintfixed = allowableMint.toFixed(2);
  console.log(allowableMint);
  

  const now=60;


  return (
    <div className="p-3 card-backgorund rounded-lg">
      <p className="text-24 font-bold bck-color">Create BCK </p>
      
      <div className="flex flex-col gap-2 mt-3">
        <label htmlFor="lock" className="text-20 font-medium">
          Lock BCKETH Collateral In Vault:
        </label>
        <div className="flex">
          <input
            type="number"
            value={lockAmount}
            onChange={(e) => setLockAmount(e.target.value)}
            placeholder={`Balance: ${parseFloat(web3.utils.fromWei(bckEthBalance.toString(), 'ether')).toFixed(2)} ETH`}
            className="rounded-md text-14 focus:ring-2 input-max py-2 px-3 flex-grow"
            id="wadInputlock"
          />
          <button onClick={handleMaxLockClick} className="ml-2  drop-shadow-xl max-btn">
            Max
          </button>
        </div>
        <div className="mt-4">
        <RangeSlider min={50} max={100}/>
        </div>
        <button onClick={() => LockFunction(lockAmount)} className="BoxGradient-button-max drop-shadow-xl hover:drop-shadow-sm mt-4">
          Lock BCKETH In Vault
        </button>
      </div>
      
      <div className="flex flex-col gap-2 mt-6">
       <label htmlFor="draw" className="text-12 font-medium">
        <p className="mb-2">Create BCK Stable coin $ :</p>
        <p className="caution">Caution! Minting to limit risks liquidation.</p>
        </label>
        <input type="number" className="rounded-md text-14 focus:ring-2 input-max py-2 px-3 flex-grow" id="wadInputdraw" placeholder={`Max Mint: $${allowableMintfixed} (Caution! Limit risks liquidation)`} />
        <div className="mt-4">
        <RangeSlider min={50} max={100}/>
        </div>
        <button onClick={DrawFunction} className="BoxGradient-button-max drop-shadow-xl hover:drop-shadow-sm mt-4">
          Mint
        </button>
      </div>
    </div>
  );
}
