import React, { useState, useEffect } from "react";
import { tubContract, BCKETHContract } from "./Functionview";
import { Link } from "react-router-dom";
import img1 from "../../src/assests/images/token illustration.png";
import "./Style/HomePage.css";

const Web3 = require("web3");

const web3 = new Web3(Web3.givenProvider);

const DisplaySystemInfo = () => {
  const [interestDistributed, setInterestDistributed] = useState(0);
  const [rawCollateral, setRawCollateral] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);
  const [interestInDollars, setInterestInDollars] = useState(0);
  const [collateralInDollars, setCollateralInDollars] = useState(0);

  // useEffect(() => {
  //     const fetchSystemInfo = async () => {
  //         const contract = await tubContract();
  //         const bck = await BCKETHContract();
  //          // Calculate the dollar value
  //          const ethPriceInUsd = await contract.methods.tag().call();
  //          const ethPriceInUsdFloat = ethPriceInUsd / 1000000000000000000000000000;
  //         console.log(ethPriceInUsdFloat, 'ethprice')

  //         // 1. Get total interest distributed using the InterestDistributed event
  //           // 1. Get total interest distributed using the InterestDistributed event
  //         let totalInterest = 0;
  //         const web3Events = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ALCHEMYHTTPLINK));
  //         const eventContract = new web3Events.eth.Contract(contract.options.jsonInterface, contract.options.address);
  //         const events = await eventContract.getPastEvents('InterestDistributed', { fromBlock: 0, toBlock: 'latest' });
  //         for (const event of events) {
  //             totalInterest += parseFloat(web3.utils.fromWei(event.returnValues.value, 'ether'));
  //             console.log(totalInterest, "THIS IS THE TOTAL INTEREST EARNT");
  //         }

  //         const totalInterestadjusted = totalInterest * ethPriceInUsdFloat
  //         setInterestDistributed(totalInterest.toFixed(2));

  //         const bckdeposit = await bck.methods.totalDeposits().call();

  //         // 2. Get raw collateral
  //         const collateral = await contract.methods.pie().call();
  //         console.log((web3.utils.fromWei(bckdeposit, 'ether')) , 'this is the collateral in ETH')
  //         const collateralUSD = parseFloat(web3.utils.fromWei(bckdeposit, 'ether')) * ethPriceInUsdFloat
  //         setRawCollateral(collateralUSD.toFixed(2));

  //         // 3. Get total debt
  //         const debt = await contract.methods.din().call();
  //         setTotalDebt(parseFloat(web3.utils.fromWei(debt, 'ether')).toFixed(2));

  //     }

  //     fetchSystemInfo();

  //     // 4. Update data every 10 minutes (or choose your own interval)
  //     const intervalId = setInterval(fetchSystemInfo, 150000);

  //     // Clear interval on component unmount
  //     return () => clearInterval(intervalId);
  // }, []);

  useEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        const contract = await tubContract();
        const bck = await BCKETHContract();

        // Calculate the dollar value
        const ethPriceInUsd = await contract.methods.tag().call();
        const ethPriceInUsdFloat = ethPriceInUsd / 1000000000000000000000000000;
        console.log(ethPriceInUsdFloat, "ethprice");

        // 1. Get total interest distributed using the InterestDistributed event
        let totalInterest = 0;
        const web3Events = new Web3(
          new Web3.providers.HttpProvider(process.env.REACT_APP_ALCHEMYHTTPLINK)
        );
        const eventContract = new web3Events.eth.Contract(
          contract.options.jsonInterface,
          contract.options.address
        );
        const events = await eventContract.getPastEvents(
          "InterestDistributed",
          { fromBlock: 0, toBlock: "latest" }
        );
        for (const event of events) {
          totalInterest += parseFloat(
            web3.utils.fromWei(event.returnValues.value, "ether")
          );
          console.log(totalInterest, "THIS IS THE TOTAL INTEREST EARNT");
        }

        const totalInterestadjusted = totalInterest * ethPriceInUsdFloat;
        setInterestDistributed(totalInterest.toFixed(2));

        const bckdeposit = await bck.methods.totalDeposits().call();

        // 2. Get raw collateral
        const collateral = await contract.methods.pie().call();
        console.log(
          web3.utils.fromWei(bckdeposit, "ether"),
          "this is the collateral in ETH"
        );
        const collateralUSD =
          parseFloat(web3.utils.fromWei(bckdeposit, "ether")) *
          ethPriceInUsdFloat;
        setRawCollateral(collateralUSD.toFixed(2));

        // 3. Get total debt
        const debt = await contract.methods.din().call();
        setTotalDebt(parseFloat(web3.utils.fromWei(debt, "ether")).toFixed(2));
      } catch (error) {
        console.error("An error occurred while fetching system info:", error);
        // You can handle the error here, e.g., show an error message to the user.
      }
    };

    fetchSystemInfo();

    // 4. Update data every 10 minutes (or choose your own interval)
    const intervalId = setInterval(fetchSystemInfo, 150000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    // <div className="flex justify-center items-center h-screen">
    //   <div className="flex flex-col items-center w-full max-w-xl px-8">
    //     <p className="text-3xl text-gradient font-bold font-mont mb-4">
    //       Bound Finance
    //       <hr />
    //       Crypto Side
    //     </p>
    //     <p className="font-mont text-2xl break-normal text-purple-400 mb-8">
    //       System Information
    //     </p>

    //     <div className="flex flex-row items-center justify-center gap-8 flex-wrap mb-8">
    //       <div className="text-center">
    //         <p className="font-mont text-xl text-skyblue mb-2">
    //           Total Interest Distributed
    //         </p>
    //         <p className="text-gray-300 font-bold font-Helvetica text-4xl">
    //           ~{interestDistributed} ETH
    //         </p>
    //       </div>
    //       <div className="text-center">
    //         <p className="font-mont text-xl text-skyblue mb-2">
    //           BCKETH Collateral
    //         </p>
    //         <p className="text-gray-300 font-bold font-Helvetica text-4xl">
    //           ${rawCollateral}
    //         </p>
    //       </div>
    //       <div className="text-center">
    //         <p className="font-mont text-xl text-skyblue mb-2">
    //           Total BCK Drawn
    //         </p>
    //         <p className="text-gray-300 font-bold font-Helvetica text-4xl">
    //           ${totalDebt} BCK
    //         </p>
    //       </div>
    //     </div>

    //     <div className="flex justify-center items-center w-full mt-8">
    //       <Link
    //         to="/bcketh"
    //         className="BoxGradient-buttons drop-shadow-xl hover:text-white py-2 px-4 rounded"
    //       >
    //         Get Started
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <>
      <div className="container mb-5">
        <div className="row mt-5">
          <div className="col-md-4 order-1">
            <p className="bound-home m-0">Bound</p>
            <p className="finance m-0">Finance</p>
            <div className="line-straight"></div>
            <p className="crypto m-0"> Crypto Side</p>
            <div className="order-3 btn-get d-none d-md-block">
              <button>GET STARTED</button>
            </div>
          </div>
          <div className="col-md-8 order-2 order-md-2">
            <img src={img1} alt="" className="" />
          </div>
          <div className="order-3 btn-get mt-3 mb-3 d-md-none">
              <button className="btn-started">GET STARTED</button>
            </div>
        </div>

        <div className="row ">
          <div className="col-md-12">
            <p className="system">System Information</p>
            <div className="line-straight-two"></div>
          </div>
        </div>
        
        <div className="d-flex justify-content-around align-item-center mt-5 boxes-content">
          <div className="">
            <p className=" gradient-color boxes">
              <span className="test-eth">67 ETH</span>
            </p>
            <div className="total-interest-second">
              <p className="tot">Total</p>
              <p className="interest">Interest Distributed</p>
            </div>
          </div>
          <div className="">
            <p className=" gradient-color boxes">
              <span className="test-eth text-light">$234</span>
            </p>
            <div className="total-interest-second">
              <p className="bcketh">BCKETH Collateral</p>
            </div>
          </div>
          <div className="">
            <p className=" gradient-color boxes">
              <span className="test-eth">$45BCK</span>
            </p>
            <div className="total-interest-second">
              <p className="bcketh">Total BCK Drawn</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DisplaySystemInfo;
