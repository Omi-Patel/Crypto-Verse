import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL } from "./baseUrl";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { IoPulseOutline } from "react-icons/io5";
import CoinChart from "./CoinChart";

const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("inr");
  const currencySymbol = currency === "inr" ? "₹" : "$";

  const profit = coin.market_data?.price_change_percentage_24h > 0;

  const getCoin = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/coins/${id}`);
      console.log(data);
      setCoin(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCoin();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className=" coin-details text-white flex">
            <div className="coin-info m-4 w-[25%] ">
              <div className="btns my-4 ml-4 text-lg font-medium text-center">
                <button
                  onClick={() => setCurrency("inr")}
                  className="bg-blue-200 text-black px-6 py-2 mx-4 rounded-xl"
                >
                  INR
                </button>
                <button
                  onClick={() => setCurrency("usd")}
                  className="bg-blue-200 text-black px-6 py-2 mx-4 rounded-xl"
                >
                  USD
                </button>
              </div>
              <div className="time text-center">Last Updated at {coin.last_updated}</div>
              <div className="flex flex-col items-center">
                <div className="image mt-4 flex justify-center">
                  <img src={coin.image.large} alt="" className="w-[65%]" />
                </div>
                <div className="coin-name font-bold text-5xl mt-3 tracking-wider">
                  {coin.name}
                </div>
              </div>
              <div className="coin-price  mt-5 text-2xl font-medium">
                {currencySymbol} {coin.market_data.current_price[currency]}
              </div>
              <div className="coin-profit  flex gap-1 items-center mt-2 font-medium">
                {profit ? (
                  <BiSolidUpArrow color="green" />
                ) : (
                  <BiSolidDownArrow color="red" />
                )}
                {coin.market_data.price_change_percentage_24h} %
              </div>
              <div className="coin-rank text-4xl text-center font-bold mt-4">
                <span className="flex gap-2 items-center">
                  <IoPulseOutline color="orange" />
                  <span> # {coin.market_cap_rank}</span>
                </span>
              </div>
              <div className="description mt-4 tracking-wide text-md ">
                {coin.description["en"].split(".")[0]}.
              </div>
            </div>
            <div className="graph w-[70%] bg-[#212121]  rounded-2xl m-4">
              <CoinChart currency={currency} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CoinDetails;
