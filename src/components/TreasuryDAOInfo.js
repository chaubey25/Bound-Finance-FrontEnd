import React from "react";

export default function Reserve() {
  return (
    <div className="mt-4 max-w-[600px] mx-auto w-full space-y-5">
      <p className="text-32 font-mont font-bold text-center text-gradient mb-8">
        Reserve Treasury DAO
      </p>

      <ul className="list-disc pl-8 text-20 font-mont space-y-4">
        <li className="text-white-100">
          95% of BCKETH's ETH is managed by the Reserve.sol contract.
        </li>
        <li>
          Users, by delegating BCKGov tokens, decide on ETH's yield generation.
        </li>
        <li>
          ETH can be staked on Lido or our validators. While our validators may offer higher returns, Lido can be quicker.
        </li>
        <li>
          Voting requires pre-delegated BCKGov tokens, preventing malicious actions.
        </li>
        <li>
          Use "Check Safety" to ensure your CDP's security. 'True' means you're safe; 'false' indicates a risk.
        </li>
        <li>
          After ample approvals, proposals are executed. View proposal details via "Check Proposal".
        </li>
      </ul>
    </div>
  );
}

