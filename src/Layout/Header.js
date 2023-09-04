import React from "react";
// import { ConnectWallet } from "../components/Functions";
import { NavLink } from "react-router-dom";
import WalletConnect from "../components/WalletConnect";
// import stacking from "../Pages/stakingBCK"

const Nav_Links = [
  {
    id: 1,
    title: "CREATE BCKETH",
    path:"/bcketh",
  },
  {
    id: 5,
    title: "CDP",
    path:"/loan",
  },
  {
    id: 2,
    title: "STAKING BCK",
    path: '/staking',
  },
  {
    id: 3,
    title: "TREASURY DAO",
    path: "/dao",
  },
  {
    id: 4,
    title: "LIQUIDATION",
    path: "/liquidation",
  },
];

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <div className="navbar-theme sticky py-3 z-20 top-0 left-0 right-0">
        <div className="w-full max-w-[1449px] px-4 md:px-0 mx-auto">
            <div className="flex justify-between items-center">

                <div className="flex items-center gap-3 w-full max-w-[510px] lg:max-w-[580px] lg:mr-8"> {/* Added lg:mr-8 */}
                    <div>
                        <NavLink
                            className="text-decoration-none hover:text-white-200 font-mont flex flex-col items-end leading-none"
                            to={"/"}
                        >
                            <p className="text-30" style={{ fontWeight: 600 }}>Bound.</p>
                            <p className="text-[#35beff] tracking-[px] text-15 pt-[2px]">Finance</p>
                            <p className="text-red-400 text-12 text-18">(Testnet)</p>
                        </NavLink>
                    </div>

                    <button 
                        onClick={() => setDropdownOpen(!dropdownOpen)} 
                        className="order-3 px-1 py- border-0 outline-none focus:outline-none bg-transparent text-4xl lg:hidden"
                    >
                        &#x2630; {/* Hamburger menu icon */}
                    </button>

                    <div className={`items-center px-5 gap-4 object-right font-dm-sans font-semibold ${dropdownOpen ? 'block' : 'hidden'} lg:flex`}>
                        {Nav_Links.map((items, index) => (
                            <div key={index} className="md:inline-block">
                                <NavLink
                                    onClick={() => setDropdownOpen(false)}
                                    to={items.path}
                                    className="text-decoration-none text-nav-links hover:text-[#fff] text-13 whitespace-nowrap block md:inline"
                                >
                                    {items.title}
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <WalletConnect />
                </div>

            </div>
        </div>
    </div>
);
 }
