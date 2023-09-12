import React, { useEffect, useState } from "react";
import {
  getCombinedETHBalance,
  getWithdrawalRequest,
  getBalances,
} from "./Functionview";
import { Tabs, Tab } from "./Tabs";
import BckethCreation from "./BckethCreation";
import BckethReqWithdrawal from "./BckethReqWithdrawal";
import BCKETHcreation from "./BCKETHcreationinfo";
import LidoStETHConversion from "./LidoStETHConversion";
import { Link } from "react-router-dom";
import { BiSolidChevronsRight } from "react-icons/bi";
import "./Style/BCKETHcreationinfo.css";

const BCKETHTabs = () => {
  const [combinedBalance, setCombinedBalance] = useState("Loading...");
  const [withdrawalRequest, setWithdrawalRequest] = useState(null);
  const [stETHBalance, setStETHBalance] = useState("Loading...");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        let balance = await getCombinedETHBalance();
        balance = parseFloat(balance).toFixed(4);
        setCombinedBalance(balance);
      } catch (error) {
        console.error("Failed to fetch combined ETH balance:", error);
        setCombinedBalance("Error fetching balance");
      }
    };

    const fetchWithdrawalRequest = async () => {
      try {
        const request = await getWithdrawalRequest();
        setWithdrawalRequest(request);
      } catch (error) {
        console.error("Failed to fetch withdrawal request:", error);
        setWithdrawalRequest({ error: true });
      }
    };

    const fetchStETHBalance = async () => {
      try {
        const { stETH } = await getBalances();
        setStETHBalance(parseFloat(stETH).toFixed(4));
      } catch (error) {
        console.error("Failed to fetch stETH balance:", error);
        setStETHBalance("Error fetching balance");
      }
    };

    try {
      fetchBalance();
      fetchWithdrawalRequest();
      fetchStETHBalance();
    } catch (error) {
      console.error("An error occurred during data fetching:", error);
      // You can handle the error here, e.g., show an error message to the user.
    }

    const intervalId = setInterval(fetchBalance, 1 * 60 * 1000);
    const stETHIntervalId = setInterval(fetchStETHBalance, 1 * 60 * 1000);

    // Cleanup function
    return () => {
      clearInterval(intervalId);
      clearInterval(stETHIntervalId);
    };
  }, []);

  const wadToPrimaryUnit = (wad) => {
    return parseFloat(wad) / 10 ** 18;
  };

  return (
    <div className="w-full max-w-[1449px] p-6 mt-[10px] mx-auto gap-5 grid grid-cols-1 lg:grid-cols-2">

        <div className="border-shadow border-for-content">
        <BCKETHcreation />
       
      
        <div className="flex justify-center items-center w-full mt-8">
          <Link
            to="/loan"
            className="BoxGradient-button drop-shadow-xl hover:text-white py-2 px-4"
          >
            <div className="d-flex gap-3 justify-content-center">
              Step 2 <BiSolidChevronsRight className="arrow" />
            </div>
          </Link>
        </div>
        <p className="lock text-24 font-mont text-center">
          <span className="next-step">Next Step</span>: Lock your BCKETH in your
          CDP.
        </p>
       
      </div>

      <div className="w-full mx-auto">
        {/* <div className="w-full max-w-[600px] mt-[30px] mb-[25px]">
          <div className="text-center w-full">
            <p>Requested Withdrawable Funds</p>
            <p className="text-skyblue font-bold text-2xl font-Helvetica">
              {withdrawalRequest
                ? withdrawalRequest.completed
                  ? "0.00 ETH"
                  : `${wadToPrimaryUnit(withdrawalRequest.amount).toFixed(
                      2
                    )} ETH`
                : "Loading..."}
            </p>
          </div>
        </div> */}
        <Tabs>
          <Tab label="Create BCKETH">
            <BckethCreation />
          </Tab>
          <Tab label="Withdraw BCKETH">
            <BckethReqWithdrawal />
          </Tab>
          <Tab label="sTETH to ETH">
            <LidoStETHConversion />
          </Tab>
        </Tabs>
        <div className="">
          <div className="card-background-down">
            <div className="d-flex justify-content-between">
              <div className="">
                <p className="withdrawable">Requested Withdrawable Funds</p>
              </div>
              <div className="">
                <p className="withdrawable">$135</p>
              </div>
            </div>
            <div className="row mt-4 mb-4">
              <div className="col-md-6">
                <div className="straight-lines"></div>
              </div>
              <div className="col-md-6">
                <div className="straight-lines"></div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="">
                <p className="withdrawable">
                  Balance Of Reserve + BCKETH Contract
                </p>
              </div>
              <div className="">
                <p className="withdrawable font-bold text-center">
                  {combinedBalance} ETH
                </p>
              </div>
            </div>
            <div className="row mt-4 mb-4">
              <div className="col-md-6">
                <div className="straight-lines"></div>
              </div>
              <div className="col-md-6">
                <div className="straight-lines"></div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="">
                <p className="withdrawable">sTETH in Lido Vault</p>
              </div>
              <div className=" ">
                <p className=" font-bold text-center withdrawable">
                  {stETHBalance} sTETH
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BCKETHTabs;
