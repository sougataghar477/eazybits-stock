"use client";

import { useEffect, useState } from "react";

export default function Table({ idx, order, setModalOpen, setIndex }) {
  // Local state to hold the latest market price fetched from API
  const [marketPrice, setMarketPrice] = useState(null);

  // Fetch latest market price for the order's symbol when the component mounts
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_HOST + "/api/symbol", {
      method: "POST", // POST request to your API route
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symbol: order.symbol }), // send stock symbol in body
    })
      .then((r) => r.json())
      .then((d) => setMarketPrice(d.ap)) // update state with ask price from API
      .catch((err) => console.error("Error:", err));
  }, []); // runs only once per row

  // Statuses where the row (order) cannot be edited
  const notEditableStatuses = ["canceled", "filled", "replaced", "accepted"];

  // Calculate profit or loss
  //   If marketPrice > avg price → Profit
  //   If marketPrice < avg price → Loss
  //   If equal → Break even (0)
  //   Otherwise → "N/A"
const profitOrLoss = 
  (marketPrice != null && order.filled_avg_price != null)
    ? marketPrice > order.filled_avg_price
      ? `${Math.round((marketPrice - order.filled_avg_price) * order.qty)} (Profit)`
      : marketPrice < order.filled_avg_price
      ? `${Math.round((order.filled_avg_price - marketPrice) * order.qty)} (Loss)`
      : "0 (No Change)"
    : "N/A";


 

  return (
    <tr
      className={`hover:bg-gray-100 cursor-pointer ${
        notEditableStatuses.includes(order.status)
          ? "pointer-events-none opacity-50" // disable clicking for uneditable orders
          : ""
      }`}
      onClick={() => {
        setModalOpen("editOrder"); // open edit modal
        setIndex(idx); // set index of the selected order
      }}
    >
      {/* Each cell represents a property of the order */}
      <td className="px-4 py-2 border">{order.type}</td>
      <td className="px-4 py-2 border">{order.status}</td>
      <td className="px-4 py-2 border">{order.symbol}</td>
      <td className="px-4 py-2 border">{order.qty}</td>
      <td className="px-4 py-2 border">
        {order.filled_avg_price ? order.filled_avg_price : "N/A"}
      </td>
      <td className="px-4 py-2 border">{profitOrLoss}</td>
      <td className="px-4 py-2 border">
        {order.limit_price ? order.limit_price : "N/A"}
      </td>
      <td className="px-4 py-2 border">
        {order.stop_price ? order.stop_price : "N/A"}
      </td>
      <td className="px-4 py-2 border font-semibold">{order.side}</td>
      <td className="px-4 py-2 border">{order.time_in_force}</td>
    </tr>
  );
}
