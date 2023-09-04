import React from "react";

export default function BCKETHcreation() {
  return (
    <div className="mt-4 max-w-[600px] mx-auto w-full space-y-5">
      <p className="text-32 font-mont font-bold text-center text-gradient mb-8">
        Step 1. | Minting BCKETH
      </p>
      
      <ul className="list-disc pl-8 text-20 font-mont space-y-4">
        <li className="text-white-100">
          Input the amount of ETH you want to deposit.
        </li>
        <li>
          You'll receive an equivalent amount of BCKETH.
        </li>
        <li>
          Your deposited ETH is utilized to earn rewards. These come from LST tokens like sTETH and the protocol's own validators.
        </li>
        <li>
          At any time, convert your BCKETH back to ETH.
        </li>
        <li>
          For a faster ETH return, consider trading BCKETH on exchanges.
        </li>
      </ul>
      <p className="mt-6 text-24 font-mont text-gradient">
        Next Step: Lock your BCKETH in your CDP.
      </p>
    </div>
  );
}

