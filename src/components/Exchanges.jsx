import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "./baseUrl";
import Loader from "./Loader";

const Exchanges = () => {
  const [loading, setLoading] = useState(true);
  const [exchanges, setExchanges] = useState([]);

  const url = `${baseURL}/exchanges`;
  // console.log(url);

  const getExchangesData = async () => {
    const { data } = await axios.get(url);
    console.log(data);
    setExchanges(data);
    setLoading(false);
  };

  useEffect(() => {
    getExchangesData();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* <div className="">Exchanges</div> */}
          <div className=" flex justify-between font-medium p-4 m-4 text-white">
            <div className="pic">PHOTO</div>
            <div className="name">NAME</div>
            <div className="price">PRICE</div>
            <div className="rank"># RANK</div>
          </div>
          {exchanges.map((ele, index) => {
            return (
              <a href={ele.url} target="_blank" key={index}>
                <div className="ex-card flex justify-between items-center p-4 m-4 text-blue-200 font-medium">
                  <div className="pic  ">
                    <img
                      src={ele.image}
                      alt=""
                      className="rounded-lg h-[80px] w-[80px]"
                    />
                  </div>
                  <div className="name  text-center  w-[10rem]">{ele.name}</div>
                  <div className="price text-center  w-[5rem]">
                    {ele.trade_volume_24h_btc.toFixed(0)}
                  </div>
                  <div className="rank  text-center  w-[5rem]">
                    #{ele.trust_score_rank}
                  </div>
                </div>
              </a>
            );
          })}
        </>
      )}
    </>
  );
};

export default Exchanges;
