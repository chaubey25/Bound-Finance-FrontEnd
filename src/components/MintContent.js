import React from "react";

export default function MintContent() {
  return (
    <div className="mt-4 max-w-[600px] mx-auto w-full space-y-5">
      <p className="text-32 font-mont font-bold text-center text-gradient mb-8">
        Step 2. | Mint BCK
      </p>
      
      <ul className="list-disc pl-8 text-20 font-mont space-y-4">
        <li className="text-white-100">
          Mint BCKETH in the BCKETH tab.
        </li>
        <li>
          Lock BCKETH in the CDP page; it converts to BETH.
        </li>
        <li>
          Mint BCK, maintaining safe collateral limits.
        </li>
        <li>
          Adjust BCK with "Pay Back BCK" or take out BCKETH. Mind the collateral ratio.
        </li>
        <li>
          Check the Safe tab for liquidation alerts.
        </li>
        <li>
          Enjoy no post-loan interest. Earn ETH periodically and withdraw in the Collateral Interest tab.
        </li>
      </ul>
      <p className="mt-6 text-24 font-mont text-gradient">
        Step 3. Deposit BCK in the savings account for USDC yield.
      </p>
    </div>
  );
}


