import React, { useEffect, useState } from "react";
import { getCombinedETHBalance, getWithdrawalRequest, getBalances } from "./Functionview";
import { Tabs, Tab } from "./Tabs";
import BckethCreation from "./BckethCreation";
import BckethReqWithdrawal from "./BckethReqWithdrawal";
import BCKETHcreation from "./BCKETHcreationinfo";
import LidoStETHConversion from './LidoStETHConversion';
import { Link } from 'react-router-dom';

const BCKETHTabs = () => {
    const [combinedBalance, setCombinedBalance] = useState("Loading...");
    const [withdrawalRequest, setWithdrawalRequest] = useState(null);
    const [stETHBalance, setStETHBalance] = useState("Loading...");

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                let balance = await getCombinedETHBalance();
                balance = parseFloat(balance).toFixed(4);
                setCombinedBalance(balance);
            } catch (error) {
                console.error("Failed to fetch combined ETH balance:", error);
                setCombinedBalance("Error fetching balance");
            }
        };

        const fetchWithdrawalRequest = async () => {
            try {
                const request = await getWithdrawalRequest();
                setWithdrawalRequest(request);
            } catch (error) {
                console.error("Failed to fetch withdrawal request:", error);
                setWithdrawalRequest({ error: true });
            }
        };

        const fetchStETHBalance = async () => {
            try {
                const { stETH } = await getBalances();
                setStETHBalance(parseFloat(stETH).toFixed(4));
            } catch (error) {
                console.error("Failed to fetch stETH balance:", error);
                setStETHBalance("Error fetching balance");
            }
        };

        fetchBalance();
        fetchWithdrawalRequest();
        fetchStETHBalance();

        const intervalId = setInterval(fetchBalance, 1 * 60 * 1000);
        const stETHIntervalId = setInterval(fetchStETHBalance, 1 * 60 * 1000);

        // Cleanup function
        return () => {
            clearInterval(intervalId);
            clearInterval(stETHIntervalId);
        };
    }, []);

    const wadToPrimaryUnit = (wad) => {
        return parseFloat(wad) / (10 ** 18);
    }

    return (
        <div className="w-full max-w-[1449px] p-6 mt-[50px] mx-auto gap-5 grid grid-cols-1 lg:grid-cols-2">
            <div>
                <BCKETHcreation />
                <div className="flex justify-center items-center w-full mt-8">
                    <Link to="/loan" className="BoxGradient-buttons drop-shadow-xl hover:text-white py-2 px-4 rounded">
                        Press To Start Step 2. (Lock BCKETH & CDP)
                    </Link>
                </div>
            </div>
        
            <div className="w-full max-w-[567px] mx-auto">
                <div className="w-full max-w-[600px] mt-[30px] mb-[25px]">
                    <div className="text-center w-full">
                        <p>Requested Withdrawable Funds</p>
                        <p className="text-skyblue font-bold text-2xl font-Helvetica">
                            {withdrawalRequest 
                                ? (withdrawalRequest.completed 
                                    ? "0.00 ETH" 
                                    : `${wadToPrimaryUnit(withdrawalRequest.amount).toFixed(2)} ETH`)
                                : "Loading..."}
                        </p>
                    </div>
                </div>
                <Tabs>
                    <Tab label="Create BCKETH">
                        <BckethCreation />
                    </Tab>
                    <Tab label="Withdraw BCKETH">
                        <BckethReqWithdrawal />
                    </Tab>
                    <Tab label="sTETH to ETH">
                        <LidoStETHConversion />
                    </Tab>
                </Tabs>
                <div className="w-full max-w-[600px] mt-[50px] mb-[25px] flex justify-between">
    <div className="text-center w-1/2">
        <p>Balance Of Reserve + BCKETH Contract</p>
        <p className="text-skyblue font-bold text-2xl font-Helvetica">{combinedBalance} ETH</p>
    </div>
    <div className="text-center w-1/2">
        <p>sTETH in Lido Vault</p>
        <p className="text-skyblue font-bold text-2xl font-Helvetica">{stETHBalance} sTETH</p>
    </div>
</div>

            </div>
        </div>
    );
};

export default BCKETHTabs;

