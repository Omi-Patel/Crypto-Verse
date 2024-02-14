import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL } from "./baseUrl";
import { useParams } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Loader from "./Loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = ({ currency }) => {
  const [charData, setChartData] = useState([]);

  const { id } = useParams();
  const [days, setDays] = useState(1);

  const CoinChartData = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
      );
      console.log(data);
      setChartData(data.prices);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CoinChartData();
  }, [currency, id, days]);

  const myData = {
    labels: charData.map((val) => {
      const date = new Date(val[0]);
      const time =
        date.getHours() > 12
          ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
          : `${date.getHours()} : ${date.getMinutes()} AM`;
      return days === 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        label: `Price in Past ${days} Days in ${currency}`,
        data: charData.map((val) => val[1]),
        borderColor: "lightblue",
        borderWidth: 3,
      },
    ],
  };

  return (
    <>
      {charData.length === 0 ? (
        <Loader />
      ) : (
        <div>
          <Line
            data={myData}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div className="btns my-4 ml-4 text-lg font-medium ">
            <button
              onClick={() => setDays(1)}
              className="bg-blue-200 text-black px-6 py-2 m-2 rounded-xl"
            >
              24 Hours
            </button>
            <button
              onClick={() => setDays(30)}
              className="bg-blue-200 text-black px-6 py-2 m-2 rounded-xl"
            >
              1 Month
            </button>
            <button
              onClick={() => setDays(365)}
              className="bg-blue-200 text-black px-6 py-2 m-2 rounded-xl"
            >
              1 Year
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CoinChart;
