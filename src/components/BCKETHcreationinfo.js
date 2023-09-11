import React from "react";
import { BiSolidChevronsRight } from "react-icons/bi";

export default function BCKETHcreation() {
  return (
    <>
      <div className="mt-4 max-w-[600px] mx-auto w-full">
        <p className="text-32 font-mont font-bold mb-8">
          <p className="step-1">STEP I :</p>
          <div className="line-straight-bck"></div>
          <p className="mining">Minting BCKETH</p>
        </p>

        <div className="list-disc text-15 font-mont space-y-10 ">
          <div className="d-flex">
            <BiSolidChevronsRight className="mt-1 me-3" />
            <p className="text-white-100">
              Input the amount of ETH you want to deposit.
            </p>
          </div>
          <div className="d-flex">
            <BiSolidChevronsRight className="mt-1 me-3" />
            <p>You'll receive an equivalent amount of BCKETH.</p>
          </div>
          <div className="d-flex">
            <BiSolidChevronsRight className="mt-1 me-3" size={25} />
            <p>
              Your deposited ETH is utilized to earn rewards. These come from
              LST tokens like sTETH and the protocol's own validators.
            </p>
          </div>
          <div className="d-flex">
            <BiSolidChevronsRight className="mt-1 me-3" />
            <p>At any time, convert your BCKETH back to ETH.</p>
          </div>
          <div className="d-flex">
            <BiSolidChevronsRight className="mt-1 me-3" />
            <p>
              For a faster ETH return, consider trading BCKETH on exchanges.
            </p>
          </div>
        </div>
       
      </div>
    </>
  );
}
