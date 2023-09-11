import React, { useState } from "react";
import { WithdrawInterestFunction, WithdrawInterestView } from "./Functions";
import Withdraw from "../assests/images/withdraw.png";

export default function WithDrawInterest() {
  const [interest, setInterest] = useState("");
  const InterestAmount = async () => {
    let value = await WithdrawInterestView();
    console.log(value);
    setInterest(value);
  };

  return (
    <div className="p-3 card-backgorund">
      <div className="p-4">
        <p className="text-24 font-bold  bck-color">
          Withdraw Interest Earnt On Collateral
        </p>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="d-flex justify-content-center">
            <img src={Withdraw} alt="" className="image-withdraw" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <button
          onClick={WithdrawInterestFunction}
          className="BoxGradient-button-max drop-shadow-xl hover:drop-shadow-sm mt-4"
        >
          Withdraw Reward
        </button>
      </div>
      {/* <div className="flex flex-col gap-1 mt-3">
        <label htmlFor="withdrawInterestView" className="text-16 font-medium">Interest Amount Earnt:</label>
        <input
          type="text"
          id="cupIdInputwithdrawInterestView"
          placeholder="Cup ID"
          className="rounded-md  text-14 bg-transparent focus:ring-2 outline-none border py-2 px-3"
        />
        <p>{`${interest ? "You Earned Eth:" + interest + " interest" : ""}`}</p>
        <button
          onClick={InterestAmount}
          className="BoxGradient-buttons"
        >
          Amount
        </button>
      </div> */}
    </div>
  );
}
