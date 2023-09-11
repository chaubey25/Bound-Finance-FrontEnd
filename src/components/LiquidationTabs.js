import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "./Tabs";
import LiquidationTabContent from "./LiquidationTabContent";
import LiquidationExit from "./LiquidationExit";

import { viewdebtamount, viewPendingCollateral } from "./Functionview";

export default function LiquidationTabs() {
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [debtAmount, setDebtAmount] = useState(0);
  const [collateral, setCollateral] = useState(0);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let fetchedDebtAmount = await viewdebtamount();
      let fetchedCollateral = await viewPendingCollateral();
      fetchedDebtAmount = parseFloat(fetchedDebtAmount).toFixed(2);
      fetchedCollateral = parseFloat(fetchedCollateral).toFixed(2);
      setDebtAmount(fetchedDebtAmount);
      setCollateral(fetchedCollateral);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 10 * 60 * 1000); // Every 10 minutes

    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, []);
  return (
    <>
    <div className="w-full max-w-[700px] mx-auto ">
      <Tabs>
        <Tab label="Liquidations">
          <div className="border-shadow-li"> <LiquidationTabContent /></div>
         
        </Tab>
        <Tab label="Exit BETH for BCKETH">
          <LiquidationExit />
        </Tab>
      </Tabs>
      <div className="d-flex justify-content-center">
        <div className="border-shadow-li grid md:grid-cols-2 w-full gap-4">
          <div className="text-center w-full p-3">
            <p>Bad debt Amount In The System</p>

            <p className="text-skyblue font-bold text-18 font-bold font-Helvetica text-2xl">
              ${debtAmount} BCK
            </p>
          </div>
          <div className="text-center w-[100%] p-3">
            <p>Collateral pending liquidation</p>

            <p className="text-skyblue font-bold text-18 font-bold font-Helvetica text-2xl">
              {collateral} BETH
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
