import React, { useState, useEffect } from "react";

import {
  getWithdrawableDividends,
  stakeTokens,
  withdrawRewards,
  unstakeTokens,
  depositUSDC,
  balanceofEarnBCK,
} from "../components/Function2";
const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider);

import { getWithdrawableInterest, getDepositedBCKAmount } from "./Functionview";

import BCKEARN from "./BCKSavings";
import "./Style/StackingCards.css";

import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

export default function StackingCards() {
  const [dividends, setDividends] = useState("");
  const [balance, setbalance] = useState("");
  const [stakeResult, setStakeResult] = useState("");
  const [rewardResult, setRewardResult] = useState("");
  const [unstakeResult, setUnstakeResult] = useState("");
  const [depositResult, setDepositResult] = useState("");
  const [distributeResult, setDistributeResult] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [withdrawableInterest, setWithdrawableInterest] = useState(0);
  const [depositedBCK, setDepositedBCK] = useState(0);
  const [unstake, setUnstake] = useState(0);

  //For slider state
  const [inputRangeValue, setInputRangeValue] = useState(0);
  const [inputRangeValueUnStake, setInputRangeValueUnStake] = useState(0);

  const handleStakeTokens = async () => {
    let result = await stakeTokens(stakeAmount);
    setStakeResult(result);
  };

  const handleWithdrawRewards = async () => {
    let result = await withdrawRewards();
    setRewardResult(result);
  };

  const handleUnstakeTokens = async () => {
    let result = await unstakeTokens(unstakeAmount);
    setUnstakeResult(result);
  };

  const handleDividends = async () => {
    let result = await getWithdrawableDividends();
    setDividends(result);
  };

  const handleBalance = async () => {
    let result = await balanceofEarnBCK();
    setbalance(result);
  };

  const handleDepositUSDC = async () => {
    let amount = document.getElementById("depositUSDCInput").value;
    // call the deposit function from your Utils here
    let result = await depositUSDC(amount);
    setDepositResult(result);
  };

  const handleMaxStableCoinClick = () => {
    let amount = web3.utils.fromWei(depositedBCK.toString(), "ether");
    setStakeAmount(amount);
  };

  const handleMaxUnStakeCoinClick = () => {
    let amount = web3.utils.fromWei(unstake.toString(), "ether");
    setUnstakeAmount(amount);
  };

  const increment = 0.01;
  const incrementUn = 0.01;

  const handleInputChange = (e) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      setStakeAmount(newValue);
      setInputRangeValue(newValue);
    } else {
      setStakeAmount("");
      setInputRangeValue(0);
    }
  };
  const handleRangeChange = (value) => {
    setInputRangeValue(value);
    setStakeAmount(value);
  };

  const handleInputUnStakeChange = (e) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      setUnstakeAmount(newValue);
      setInputRangeValueUnStake(newValue);
    } else {
      setUnstakeAmount("");
      setInputRangeValueUnStake(0);
    }
  };
  const handleUnStakeRangeChange = (value) => {
    setInputRangeValueUnStake(value);
    setUnstakeAmount(value);
  };

  const StackingToken_Data = [
    {
      id: 1,
      heading: "BCK Savings Account",
      title: "Stake BCK Stablecoin ($)",
      button: "Stake",
      title2: "Unstake BCK Stablecoin ($)",
      button2: "Unstake",
      onClick2: handleUnstakeTokens,
      InputValueMax1: stakeAmount,
      inputUnstakeValue: unstakeAmount,
      inputChange: handleInputChange,
      inputRangeValue1: inputRangeValue,
      inputRangeValue2:inputRangeValueUnStake,
      onChangeStake: handleRangeChange,
      handleUnStake: handleInputUnStakeChange,
      onChangeUnStakeRange: handleUnStakeRangeChange,
      onClickMax: handleMaxStableCoinClick,
      onClickMaxUnstake: handleMaxUnStakeCoinClick,
      title3: "Withdraw USDC Rewards",
      button3: "Withdraw Rewards",
      onClick1: handleWithdrawRewards,
      onClick3: handleStakeTokens,
    },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        let interest = await getWithdrawableInterest();
        interest = parseFloat(interest).toFixed(2);
        setWithdrawableInterest(interest);

        let bckAmount = await getDepositedBCKAmount();
        bckAmount = parseFloat(bckAmount);
        setDepositedBCK(bckAmount);
      } catch (error) {
        console.error("Error fetching staking data:", error);
      }
    }

    fetchData(); // Fetch data immediately when component mounts

    const interval = setInterval(fetchData, 50000); // Fetch data every 5 minutes

    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, []);

  //For slider functions

  return (
    <div className="grid grid-cols-1 w-full max-w-[1449px] mt-[10px] gap-4 mx-auto p-4 md:grid-cols-2">
      <div className="w-full max-w-[700px] mx-auto">
        <div className="border-shadow p-5 ">
          <BCKEARN />
        </div>
        <div className="border-shadow mt-2 p-4">
          <div className="d-flex justify-content-between align-item-center">
            <div className="">
              <p>BCK Savings Account Balance</p>
            </div>
            <div className="">
              <p className=" text-end font-bold text-25 font-bold font-Helvetica">
                ${depositedBCK} BCK
              </p>
            </div>
          </div>
          <div className="straight-line mt-4 mb-4"></div>
          <div className="d-flex justify-content-between align-item-center">
            <div className="">
              <p>USDC Interest Earnt</p>
            </div>
            <div className="">
              <p className="text-end font-bold text-25 font-bold font-Helvetica">
                ${withdrawableInterest}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-[700px] mx-auto  d-flex">
        {StackingToken_Data.map((item, index) => {
          return (
            <div
              key={index}
              className="card-backgorund p-4 w-full flex flex-col "
            >
              <p className="text-24 font-bold font-mont bck-color">
                {item.heading}
              </p>
              <div className="w-full mt-3 flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <p className="text-16 font-medium mb-3 ">{item.title} :</p>
                  <div className="flex">
                    <input
                      type="number"
                      onChange={item.inputChange}
                      className="rounded-md text-14 focus:ring-2 input-max py-2 px-3 flex-grow"
                      placeholder="Balance : $ 5679"
                      value={item.InputValueMax1}
                    />
                    <button
                      onClick={item.onClickMax}
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
                      value={item.inputRangeValue1}
                      onChange={item.onChangeStake}
                    />
                  </div>
                  <button
                    onClick={item.onClick3}
                    className="BoxGradient-button-max drop-shadow-xl hover:drop-shadow-sm mt-4"
                  >
                    {item.button}
                  </button>
                </div>
                <div className="flex flex-col gap-1 mt-3">
                  <p className="text-16 font-medium mb-2">{item.title2} :</p>
                  <div className="flex">
                    <input
                      type="number"
                      onChange={item.handleUnStake}
                      className="rounded-md text-14 focus:ring-2 input-max py-2 px-3 flex-grow"
                      placeholder="Balance : $ 5679"
                      value={item.inputUnstakeValue}
                    />
                    <button
                      onClick={item.onClickMaxUnstake}
                      className="ml-2  drop-shadow-xl max-btn"
                    >
                      Max
                    </button>
                  </div>
                  <div className="mt-4 mb-1">
                    <InputRange
                      step={incrementUn}
                      allowSameValues={true}
                      draggableTrack={true}
                      value={item.inputRangeValue2}
                      onChange={item.onChangeUnStakeRange}
                    />
                  </div>
                  <button
                    onClick={item.onClick2}
                    className="BoxGradient-button-max drop-shadow-xl hover:drop-shadow-sm mt-3"
                  >
                    {item.button2}
                  </button>
                </div>
                <div className="flex flex-col mt-4 gap-1">
                  <p className="text-16 font-medium ">{item.title3} :</p>
                  <button
                    onClick={item.onClick1}
                    className="BoxGradient-button-max drop-shadow-xl hover:drop-shadow-sm mt-2"
                  >
                    {item.button3}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
