import React, { useState, useEffect } from "react";
import Liquidation from "./LiquidationsInfo";
import LiquidationTabs from "./LiquidationTabs";
import './Style/Liquidation.css';


export default function LiquidationCards() {


  return (
    <div>
      <div className="grid grid-cols-1 w-full max-w-[1449px] mx-auto gap-5 p-4 md:grid-cols-2 " style={{marginBottom:"2rem"}}>
        <div className="w-full max-w-[700px] mx-auto ">
          <div className="">
            <Liquidation />
          </div>
        </div>
        <div> <LiquidationTabs /></div>
       
      </div>
    </div>
  );
}
