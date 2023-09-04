// LidoStETHConversion.js

import React, { useEffect, useState } from "react";
import { executeLidoWithdraw } from './Functionview';

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
        <div className="card-backgorund p-3">
            <p className="text-24 font-bold font-mont text-center">
                Convert Lido StETH to ETH
            </p>
            <div className="mt-3">
                <div className="text-center w-full mb-4">
                    <p className="text-skyblue font-bold text-xl font-Helvetica">
                   Lacking ETH for your withdrawal? No worries! Convert sTETH to ETH using LidoVault. This may take 1-3 days to show up in BCKETH. Once done, hit 'Execute Withdrawal'.
                    </p>
                </div>
                <div className="p-3 text-center">
                    <button
                        onClick={handleExecuteWithdraw}
                        className="BoxGradient-buttons w-full drop-shadow-xl mt-2 hover:drop-shadow-sm font"
                        disabled={isLoading}
                    >
                        Convert sTETH to ETH from Lido Vault
                    </button>
                </div>
            </div>
        </div>
    );
}
