import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getTokenContract, executeWithdrawal, requestWithdrawal } from './Functions';
import { BCKETHContract } from './Functionview';
const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider);

export default function BckethReqWithdrawal() {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasPendingWithdrawal, setHasPendingWithdrawal] = useState(false);
  const [bckEthBalance, setBckEthBalance] = useState(0);

  useEffect(() => {
    checkPendingWithdrawal();
    fetchBckEthBalance();
  }, []);

  const checkPendingWithdrawal = async () => {
    const token = await getTokenContract();
    const accounts = await web3.eth.getAccounts();
    const owner = accounts[0];
    const withdrawalRequest = await token.methods.withdrawalRequests(owner).call();
    setHasPendingWithdrawal(!withdrawalRequest.completed);
  };

  const fetchBckEthBalance = async () => {
    const bck = await BCKETHContract();
    const account = await web3.eth.getAccounts()
    const owner = account[0];
    const balance = await bck.methods.balanceOf(owner).call();
    setBckEthBalance(balance);
  };


  const handleWithdrawalRequest = async () => {
    setIsLoading(true);
    await requestWithdrawal(withdrawAmount);
    setIsLoading(false);
    checkPendingWithdrawal();  // Update immediately after the request.
  };

  const handleWithdrawalExecution = async () => {
    setIsLoading(true);
    await executeWithdrawal();
    setIsLoading(false);
  };

  const handleMaxClick = () => {
    let amount = (web3.utils.fromWei((bckEthBalance).toString(), 'ether'))
    setWithdrawAmount(amount);
  };


  return (
    <div>
      <div className="card-backgorund p-3">
        <p className="text-24 font-bold font-mont text-center">Request Withdrawal</p>
        <div className="text-center w-full mb-4">
          {!hasPendingWithdrawal ? (
            <p className="text-skyblue font-bold text-13 font-Helvetica"></p>
          ) : (
            <p className="text-skyblue font-bold text-13 font-Helvetica">
              Need to complete your pending withdrawal? Make sure there's enough ETH in BCKETH. If it's short, swap 'sTETH to ETH' in the LidoVault. This might take 1-3 days. Once there's enough ETH, just hit 'Execute Withdrawal' again. Easy!
            </p>
          )}
        </div>
        <div className="mt-3">
          <div className="flex flex-col gap-2">
            {!hasPendingWithdrawal && (
              <>
                <label htmlFor="withdrawBCK" className="text-16 font-medium">BCKETH Withdraw Request Input:</label>
                <div className="flex">
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder={`Balance: ${parseFloat(web3.utils.fromWei(bckEthBalance.toString(), 'ether')).toFixed(2)} BCKETH`}
                    className="rounded-md text-14 bg-transparent focus:ring-2 outline-none border py-2 px-3 flex-grow"
                  />
                  <button onClick={handleMaxClick} className="ml-2 BoxGradient-buttons drop-shadow-xl hover:drop-shadow-sm">
                    Max
                  </button>
                </div>
                <button
                  id="withdrawBCK"
                  onClick={handleWithdrawalRequest}
                  className="BoxGradient-buttons drop-shadow-xl hover:drop-shadow-sm mt-2"
                  disabled={isLoading}
                >
                  Request Withdrawal
                </button>
              </>
            )}
            {hasPendingWithdrawal && (
              <div className="flex flex-col gap-1 mt-3">
                <label htmlFor="withdrawBCK" className="text-16 font-medium">Withdraw BCKETH:</label>
                <button
                  id="executeWithdrawal"
                  onClick={handleWithdrawalExecution}
                  className="BoxGradient-buttons drop-shadow-xl hover:drop-shadow-sm"
                  disabled={isLoading}
                >
                  Execute Withdrawal
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
