import React from "react";

export default function MintContent() {
  return (
    <div className="mt-4 max-w-[600px] mx-auto w-full space-y-5">
      <p className="text-32 font-mont font-bold text-center text-gradient mb-8">
        Step 3. | BCK Savings Account
      </p>

      <ul className="list-disc pl-8 text-20 font-mont space-y-4">
        <li className="text-white-100">
          Deposit BCK to earn daily USDC interest.
        </li>
        <li>
          There's no lock-in; unstake BCK anytime.
        </li>
        <li>
          View your USDC earnings under "USDC Interest Earned".
        </li>
        <li>
          Check BCK deposits in the "Balance Of BCK in BCK Savings Account" card.
        </li>
        <li>
          Click "Withdraw Rewards" to claim USDC.
        </li>
      </ul>
    </div>
  );
}
