import React from "react";
import { NavLink } from "react-router-dom";
import { FaBitcoin } from "react-icons/fa6";

const Header = () => {
  return (
    <>
      <div>
        <header className="text-gray-600 body-font">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center bg-black text-white">
            <div className="text-6xl">
              <FaBitcoin />
            </div>
            <span className="mx-4 text-3xl font-bold">CryptoVerse</span>

            <nav className="menu md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center gap-16">
              <NavLink to={"/"}>Home</NavLink>
              <NavLink to={"/exchanges"}>Exchanges</NavLink>
              <NavLink to={"/coins"}>Coins</NavLink>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
