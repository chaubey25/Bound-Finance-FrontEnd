import React from "react";
import { BiSolidChevronsRight } from "react-icons/bi";

export default function Liquidation() {
  return (
    <div className="border-shadow max-w-[700px] mx-auto w-full space-y-51 mt-1 p-5 content-div-liquidation">
      <p className="text-32 font-mont font-bold text-gradient ">
        Understanding <br /> Liquidations
      </p>
      <div className="line-straight-bck mt-1"></div>

      <div className="list-disc text-15 font-mont space-y-7 mt-5 ">
        <div className="d-flex">
          <BiSolidChevronsRight className="mt-1 me-3" />
          <p className="text-white-100">
            Bound Finance ensures stability with a 2:1 collateral ratio: $2 in
            BCKETH for every $1 of BCK stablecoin.
          </p>
        </div>
        <div className="d-flex">
          <BiSolidChevronsRight className="mt-1 me-3" />
          <p>
         Vaults under this ratio face liquidation, with collateral moved to
            Tap contract for sale, preserving BCK value.
          </p>
        </div>
        <div className="d-flex">
          <BiSolidChevronsRight className="mt-1 me-3" />
          <p>
            BCKETH collateral is safeguarded as BETH. In debt scenarios, more
            BETH can be created to manage the debt.
          </p>
        </div>
        <div className="d-flex">
          <BiSolidChevronsRight className="mt-1 me-3" />
          <p>
            While initially BETH and BCKETH can be swapped at 1:1, more BETH
            supply for debt may alter this rate, helping to tackle unforeseen
            debt situations.
          </p>
        </div>
      </div>
    </div>
  );
}
