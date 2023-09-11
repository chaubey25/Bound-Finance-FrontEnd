// LidoStETHConversion.js

import React, { useEffect, useState } from "react";
import { executeLidoWithdraw } from "./Functionview";
import first from '../assests/images/first.png'
import second from '../assests/images/second.png'
import third from '../assests/images/fourth.png';
import fourth from '../assests/images/fifth.png'


export default function LidoStETHConversion() {
  const [isLoading, setIsLoading] = useState(false);

  const handleExecuteWithdraw = async () => {
    setIsLoading(true);
    try {
      await executeLidoWithdraw();
    } catch (error) {
      console.error("Failed to execute Lido withdrawal:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="card-background-down">
      <p className="text-24 font-bold font-mont bck-color">
        Convert Lido StETH to ETH
      </p>

      <div className="row">
        <div className="col-md-6">
          <div className="first-div relative-container">
            <span className="relative-element">I</span>
            <div className="  row">
            <div className="col-md-5">
              <img src={first} alt="" className="images"/>
            </div>
            <div className="col-md-7 p-0">
              <p className="box-content-word">Lacking ETH for your withdrawal? No worries!</p>
            </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
        <div className="first-div relative-container">
            <span className="relative-element">II</span>
            <div className="  row">
            <div className="col-md-5">
              <img src={second} alt="" className="images"/>
            </div>
            <div className="col-md-7 p-0">
              <p className="box-content-word">Convert STETH to ETH using Lido Vault.</p>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
        <div className="first-div relative-container">
            <span className="relative-element">III</span>
            <div className="p-2 row">
            <div className="col-md-5">
              <img src={third} alt="" className="images-h"/>
            </div>
            <div className="col-md-7 ">
              <p className="box-content-word">Can take 1-3 days to show up in BCKETH.</p>
            </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
        <div className="first-div relative-container">
            <span className="relative-element">IV</span>
            <div className="  row">
            <div className="col-md-5">
              <img src={fourth} alt="" className="images"/>
            </div>
            <div className="col-md-7 p-0">
              <p className="box-content-word">Once done, hit 'Execute Withdrawal’</p>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
                    <button
                        onClick={handleExecuteWithdraw}
                        className="BoxGradient-button-max w-full drop-shadow-xl hover:drop-shadow-sm font"
                        disabled={isLoading}
                    >
                        Execute Withdrawal
                    </button>
                </div>
      {/* <div className="mt-3">
                <div className="text-center w-full mb-4">
                    <p className="text-skyblue font-bold text-xl font-Helvetica">
                   Lacking ETH for your withdrawal? No worries! Convert sTETH to ETH using LidoVault. This may take 1-3 days to show up in BCKETH. Once done, hit 'Execute Withdrawal'.
                    </p>
                </div>
               
            </div> */}
    </div>
  );
}
