"use client";

import { useActionState, useEffect } from "react";
import { placeOrder } from "@/utils/actions/placeOrder";
import OrderSuccess from "./OrderSuccess";
import { toast } from "react-toastify";

export default function AddOrderForm({ isModalOpen, setModalOpen, setOrders }) {
  const [state, formAction] = useActionState(placeOrder, null);

  // Update orders when a new order is successfully placed
  useEffect(() => {
    if (state?.success && state?.data) {
      toast.success("Success making an order")
      setOrders((prev) => [state.data, ...prev]); // add new order at top
      setModalOpen("none"); // close modal
    }
  }, [state, setOrders, setModalOpen]);

  return (
    <dialog
      open={isModalOpen === "addOrder"}
      className="p-6 shadow mt-4 rounded-lg fixed top-1/2 left-1/2 -translate-1/2 z-10"
    >
      <button
        className="absolute right-4"
        onClick={() => setModalOpen("none")}
      >
        ❌
      </button>

      <form action={formAction} className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {/* Symbol */}
        <div className="flex flex-col">
          <label htmlFor="symbol" className="mb-2 font-semibold">Symbol</label>
          <input
            id="symbol"
            name="symbol"
            type="text"
            required
            placeholder="AAPL, TSLA..."
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Quantity */}
        <div className="flex flex-col">
          <label htmlFor="qty" className="mb-2 font-semibold">Quantity</label>
          <input
            id="qty"
            name="qty"
            type="number"
            min="1"
            required
            placeholder="1"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Side */}
        <div className="flex flex-col">
          <label htmlFor="side" className="mb-2 font-semibold">Side</label>
          <select id="side" name="side" defaultValue="buy" className="border p-2 rounded w-full">
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>

        {/* Order Type */}
        <div className="flex flex-col">
          <label htmlFor="type" className="mb-2 font-semibold">Order Type</label>
          <select id="type" name="type" defaultValue="market" className="border p-2 rounded w-full">
            <option value="market">Market</option>
            <option value="limit">Limit</option>
            <option value="stop">Stop</option>
            <option value="bracket">Bracket</option>
          </select>
        </div>

        {/* Time in Force */}
        <div className="flex flex-col">
          <label htmlFor="time_in_force" className="mb-2 font-semibold">Time in Force</label>
          <select id="time_in_force" name="time_in_force" defaultValue="day" className="border p-2 rounded w-full">
            <option value="day">Day</option>
            <option value="gtc">Good Till Cancelled</option>
          </select>
        </div>

        {/* Bracket-specific fields */}
        <div className="flex flex-col">
          <label htmlFor="take_profit" className="mb-2 font-semibold">Take Profit Price</label>
          <input id="take_profit" name="take_profit" type="number" step="0.01" placeholder="Optional" className="border p-2 rounded w-full" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="stop_loss" className="mb-2 font-semibold">Stop Loss Price</label>
          <input id="stop_loss" name="stop_loss" type="number" step="0.01" placeholder="Optional" className="border p-2 rounded w-full" />
        </div>

        {/* Submit */}
        <div className="flex items-end">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded w-full transition">
            Place Order
          </button>
        </div>
      </form>
    </dialog>
  );
}
