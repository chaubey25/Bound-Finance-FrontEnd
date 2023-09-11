import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  getTokenContract,
  executeWithdrawal,
  requestWithdrawal,
} from "./Functions";
import { BCKETHContract } from "./Functionview";
const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider);
import ProgressBar from 'react-bootstrap/ProgressBar'
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

export default function BckethReqWithdrawal() {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasPendingWithdrawal, setHasPendingWithdrawal] = useState(false);
  const [bckEthBalance, setBckEthBalance] = useState(0);

  // useEffect(() => {
  //   checkPendingWithdrawal();
  //   fetchBckEthBalance();
  // }, []);

  useEffect(() => {
    try {
      checkPendingWithdrawal();
    } catch (error) {
      console.error("Error checking pending withdrawal:", error);
      // Handle the error, e.g., show an error message to the user.
    }
  
    try {
      fetchBckEthBalance();
    } catch (error) {
      console.error("Error fetching BCKETH balance:", error);
      // Handle the error, e.g., show an error message to the user.
    }
  }, []);
  
  // const checkPendingWithdrawal = async () => {
  //   const token = await getTokenContract();
  //   const accounts = await web3.eth.getAccounts();
  //   const owner = accounts[0];
  //   const withdrawalRequest = await token.methods
  //     .withdrawalRequests(owner)
  //     .call();
  //   setHasPendingWithdrawal(!withdrawalRequest.completed);
  // };

  const checkPendingWithdrawal = async () => {
    try {
      const token = await getTokenContract();
      const accounts = await web3.eth.getAccounts();
      const owner = accounts[0];
      const withdrawalRequest = await token.methods
        .withdrawalRequests(owner)
        .call();
      setHasPendingWithdrawal(!withdrawalRequest.completed);
    } catch (error) {
      console.error("Error checking pending withdrawal:", error);
      // Handle the error, e.g., show an error message to the user.
    }
  };
  

  // const fetchBckEthBalance = async () => {
  //   const bck = await BCKETHContract();
  //   const account = await web3.eth.getAccounts();
  //   const owner = account[0];
  //   const balance = await bck.methods.balanceOf(owner).call();
  //   setBckEthBalance(balance);
  // };


  const fetchBckEthBalance = async () => {
    try {
      const bck = await BCKETHContract();
      const account = await web3.eth.getAccounts();
      const owner = account[0];
      const balance = await bck.methods.balanceOf(owner).call();
      setBckEthBalance(balance);
    } catch (error) {
      console.error("Error fetching BCKETH balance:", error);
      // Handle the error, e.g., show an error message to the user.
    }
  };
  
  // const handleWithdrawalRequest = async () => {
  //   setIsLoading(true);
  //   await requestWithdrawal(withdrawAmount);
  //   setIsLoading(false);
  //   checkPendingWithdrawal();  // Update immediately after the request.
  // };

  const handleWithdrawalRequest = async () => {
    setIsLoading(true);

    try {
      await requestWithdrawal(withdrawAmount);
      checkPendingWithdrawal(); // Update immediately after the request.
    } catch (error) {
      console.error("Error requesting withdrawal:", error);
      // Handle the error, e.g., show an error message to the user.
    } finally {
      setIsLoading(false);
    }
  };

  // const handleWithdrawalExecution = async () => {
  //   setIsLoading(true);
  //   await executeWithdrawal();
  //   setIsLoading(false);
  // };
  const handleWithdrawalExecution = async () => {
    setIsLoading(true);

    try {
      await executeWithdrawal();
    } catch (error) {
      console.error("Error executing withdrawal:", error);
      // Handle the error, e.g., show an error message to the user.
    } finally {
      setIsLoading(false);
    }
  };

  // const handleMaxClick = () => {
  //   let amount = (web3.utils.fromWei((bckEthBalance).toString(), 'ether'))
  //   setWithdrawAmount(amount);
  // };

  const handleMaxClick = () => {
    try {
      let amount = web3.utils.fromWei(bckEthBalance.toString(), "ether");
      setWithdrawAmount(amount);
    } catch (error) {
      console.error("An error occurred in handleMaxClick:", error);
      // Handle the error, e.g., show an error message to the user.
    }
  };

  const now=60;
  return (
    <div>
      <div className="card-background-down">
        <p className="text-24 font-bold font-mont bck-color">
          Request Withdrawal
        </p>
        {/* <div className="text-center w-full mb-4">
          {!hasPendingWithdrawal ? (
            <p className="text-skyblue font-bold text-13 font-Helvetica"></p>
          ) : (
            <p className="text-skyblue font-bold text-13 font-Helvetica">
              Need to complete your pending withdrawal? Make sure there's enough
              ETH in BCKETH. If it's short, swap 'sTETH to ETH' in the
              LidoVault. This might take 1-3 days. Once there's enough ETH, just
              hit 'Execute Withdrawal' again. Easy!
            </p>
          )}
        </div> */}
        <div className="mt-3">
          <div className="flex flex-col gap-2">
            {hasPendingWithdrawal && (
              <>
                <label htmlFor="withdrawBCK" className="text-16 font-medium mint-text">
                  BCKETH Withdraw Request Input:
                </label>
                <div className="flex mt-3">
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder={`Balance: ${parseFloat(
                      web3.utils.fromWei(bckEthBalance.toString(), "ether")
                    ).toFixed(2)} BCKETH`}
                    className="rounded-md text-14 input-max focus:ring-2 py-2 px-3 flex-grow"
                  />
                  <button
                    onClick={handleMaxClick}
                    className="ml-2 max-btn drop-shadow-xl"
                  >
                    Max
                  </button>
                </div>
                <div className="mt-3">
                  <RangeSlider min={50} max={100}/>
                </div>
                <button
                  id="withdrawBCK"
                  onClick={handleWithdrawalRequest}
                  className="BoxGradient-button-max drop-shadow-xl hover:drop-shadow-sm mt-4"
                  disabled={isLoading}
                >
                  Request Withdrawal
                </button>
              </>
            )}
            {/* {hasPendingWithdrawal && (
              <div className="flex flex-col gap-1 mt-3">
                <label htmlFor="withdrawBCK" className="text-16 font-medium">
                  Withdraw BCKETH:
                </label>
                <button
                  id="executeWithdrawal"
                  onClick={handleWithdrawalExecution}
                  className="BoxGradient-buttons drop-shadow-xl hover:drop-shadow-sm"
                  disabled={isLoading}
                >
                  Execute Withdrawal
                </button>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
