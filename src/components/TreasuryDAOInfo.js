import React from "react";
import { BiSolidChevronsRight } from "react-icons/bi";

export default function Reserve() {
  return (
    <div className="mt-4 max-w-[600px] mx-auto w-full space-y-5">
      <p className="text-32 font-mont font-bold  text-gradient mb-8">
        Reserve Treasury DAO
      </p>
      <div className="list-disc text-15 font-mont space-y-7 mt-4 ">
        <div className="d-flex">
          <BiSolidChevronsRight className="mt-1 me-3" />
          <p className="text-white-100">
            95% of BCKETH's ETH is managed by the Reserve.sol contract.
          </p>
        </div>
        <div className="d-flex">
          <BiSolidChevronsRight className="mt-1 me-3" />
          <p>
            Users, by delegating BCKGov tokens, decide on ETH's yield
            generation.
          </p>
        </div>
        <div className="d-flex">
          <BiSolidChevronsRight className="mt-1 me-3" />
          <p>
            ETH can be staked on Lido or our validators. While our validators
            may offer higher returns, Lido can be quicker.
          </p>
        </div>
        <div className="d-flex">
          <BiSolidChevronsRight className="mt-1 me-3" />
          <p>
            Voting requires pre-delegated BCKGov tokens, preventing malicious
            actions.
          </p>
        </div>
        <div className="d-flex">
          <BiSolidChevronsRight className="mt-1 me-3" />
          <p>
            Use "Check Safety" to ensure your CDP's security. 'True' means
            you're safe; 'false' indicates a risk.
          </p>
        </div>
        <div className="d-flex">
          <BiSolidChevronsRight className="mt-1 me-3" />
          <p>
            After ample approvals, proposals are executed. View proposal details
            via "Check Proposal".
          </p>
        </div>
      </div>
    </div>
  );
}
