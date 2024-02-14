import React, { useEffect, useState } from "react";
import { baseURL } from "./baseUrl";
import axios from "axios";
import Loader from "./Loader";
import { NavLink } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("inr");

  const [search, setSearch] = useState("");

  const currencySymbol = currency === "inr" ? "₹" : "$";

  const url = `${baseURL}/coins/markets?vs_currency=${currency}`;
  // console.log(url);

  const getCoinsData = async () => {
    const { data } = await axios.get(url);
    console.log(data);
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    getCoinsData();
  }, [currency]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="search-bar m-4 ">
            <input
              type="text"
              placeholder="Search Here..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-blue-200 ml-2 px-2 py-2 rounded-2xl">
              <IoSearch />
            </button>
          </div>
          <div className="btns my-4 ml-4 text-lg font-medium ">
            <button
              onClick={() => setCurrency("inr")}
              className="bg-blue-200 px-6 py-2 mx-4 rounded-xl"
            >
              INR
            </button>
            <button
              onClick={() => setCurrency("usd")}
              className="bg-blue-200 px-6 py-2 mx-4 rounded-xl"
            >
              USD
            </button>
          </div>

          {/* <div className=" flex justify-between font-medium p-4 m-4 text-white">
            <div className="pic">PHOTO</div>
            <div className="name">NAME</div>
            <div className="price">PRICE</div>
            <div className="rank"># RANK</div>
          </div> */}
          {coins
            .filter((el) => {
              if (el == "") {
                return el;
              } else if (el.name.toLowerCase().includes(search.toLowerCase())) {
                return el;
              }
            })
            .map((data, index) => {
              return (
                <CoinCard
                  data={data}
                  id={data.id}
                  index={index}
                  currencySymbol={currencySymbol}
                />
              );
            })}
        </>
      )}
    </>
  );
};

const CoinCard = ({ data, id, index, currencySymbol }) => {
  const profit = data.price_change_percentage_24h > 0;

  return (
    <NavLink to={`/coins/${id}`}>
      <div
        key={index}
        className="ex-card flex justify-between items-center p-4 m-4 text-blue-200 font-medium"
      >
        <div className="pic  ">
          <img
            src={data.image}
            alt=""
            className="rounded-lg h-[80px] w-[80px]"
          />
        </div>
        <div className="name  text-center  w-[10rem]">{data.name}</div>
        <div className="price text-center  w-[7rem]">
          {currencySymbol} {data.current_price.toFixed(0)}
        </div>
        <div
          style={profit ? { color: "green" } : { color: "red" }}
          className="rank  text-center  w-[5rem] pl-4"
        >
          {profit
            ? "+" + data.price_change_percentage_24h.toFixed(2)
            : data.price_change_percentage_24h.toFixed(2)}
        </div>
      </div>
    </NavLink>
  );
};

export default Coins;
