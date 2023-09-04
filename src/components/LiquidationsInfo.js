import React from "react";

export default function Liquidation() {
  return (
    <div className="mt-4 max-w-[600px] mx-auto w-full space-y-5">
      <p className="text-32 font-mont font-bold text-center text-gradient mb-8">
        Understanding Liquidations
      </p>

      <ul className="list-disc pl-8 text-20 font-mont space-y-4">
        <li className="text-white-100">
          Bound Finance ensures stability with a 2:1 collateral ratio: $2 in BCKETH for every $1 of BCK stablecoin.
        </li>
        <li>
          Vaults under this ratio face liquidation, with collateral moved to Tap contract for sale, preserving BCK value.
        </li>
        <li>
          BCKETH collateral is safeguarded as BETH. In debt scenarios, more BETH can be created to manage the debt.
        </li>
        <li>
          While initially BETH and BCKETH can be swapped at 1:1, more BETH supply for debt may alter this rate, helping to tackle unforeseen debt situations.
        </li>
      </ul>
    </div>
  );
}

