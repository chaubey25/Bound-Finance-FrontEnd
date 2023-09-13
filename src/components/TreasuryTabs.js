import React, { useState, useEffect } from "react";
import { getLatestProposalId, getBalances } from "./Functionview"; // import your function
import { Tab, Tabs } from "./Tabs";
import TreasuryApproveChange from "./TreasuryApproveChange";
import TreasuryDelegate from "./TreasuryDelegate";
import Reserve from "./TreasuryDAOInfo";
import TreasuryProposal from "./TreasuryProposal";
import "./Style/TreasaryTabs.css";

export default function TreasuryTabs() {
  const [latestProposalId, setLatestProposalId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [balances, setBalances] = useState({ stETH: "0", ETH: "0" });
  const [balanceErrorMessage, setBalanceErrorMessage] = useState(null);

  useEffect(() => {
    async function fetchLatestProposalId() {
      try {
        const id = await getLatestProposalId();
        setLatestProposalId(id);
      } catch (error) {
        console.error("Error fetching latest proposal ID:", error);
        setErrorMessage(error.message);
      }
    }

    fetchLatestProposalId();

    const interval = setInterval(fetchLatestProposalId, 1 * 30 * 1000);

    return () => clearInterval(interval); // Cleanup for this useEffect
  }, []);

  useEffect(() => {
    async function fetchBalances() {
      try {
        const fetchedBalances = await getBalances();
        setBalances(fetchedBalances);
      } catch (error) {
        console.error("Error fetching balances:", error);
        setBalanceErrorMessage(error.message);
      }
    }

    fetchBalances();

    const intervalForBalances = setInterval(fetchBalances, 100000);

    return () => clearInterval(intervalForBalances); // Cleanup for this useEffect
  }, []);

  return (
    <div className="w-full max-w-[1449px] p-6  mx-auto gap-5 grid grid-cols-1 lg:grid-cols-2" style={{marginBottom:"4.6rem"}}>
      <div>
        <div className="border-shadow content-for-mobile">
          <Reserve />
        </div>
      </div>
      <div className="w-full max-w-[700px] mx-auto">
        <div>
          <Tabs>
            <Tab label="Approve Changes">
              <TreasuryApproveChange />
            </Tab>
            <Tab label="Delegate">
              <TreasuryDelegate />
            </Tab>  
            <Tab label="Proposal ID Info" >
              <TreasuryProposal />
            </Tab>
          </Tabs>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex justify-content-center card-backgorund">
            <div className="p-2">
              <div className="text-center">
                <p>Latest Proposal ID that has been created</p>
                <p className="text-skyblue font-bold font-Helvetica text-2xl">
                  {latestProposalId !== null
                    ? `${latestProposalId} ID`
                    : errorMessage
                    ? errorMessage
                    : "Loading..."}
                </p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
