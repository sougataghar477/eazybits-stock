"use client";

import { useEffect, useState } from "react";
import Orders from "@/components/Orders";
import PortfolioChart from "@/components/PortfolioChart";

export default function Portfolio() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_HOST + "/api/portfolio"
        );
        const res = await response.json();
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Failed to fetch portfolio:", error);
      }
    }

    fetchPortfolio();
  }, []);

  return (
    <>
      <div className="text-4xl font-bold mb-4">Portfolio</div>
      <PortfolioChart data={data} />
      <Orders />
    </>
  );
}
