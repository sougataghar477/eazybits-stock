"use client";

import { useActionState, useState, useEffect } from "react";
import { replaceOrder } from "@/utils/actions/replaceOrder";
import { deleteOrder } from "@/utils/actions/deleteOrder";
import { toast } from "react-toastify";

export default function EditOrderForm({ data, isModalOpen, setModalOpen, setOrders }) {
  const [replacedState, replaceFormAction] = useActionState(replaceOrder, null);
  const [replacedStateAfterDeletion, deleteFormAction] = useActionState(deleteOrder, null);

  const [qty, setQty] = useState(data.qty);
  const [timeInForce, setTimeInForce] = useState(data.time_in_force);

  // Reset form fields when switching orders
  useEffect(() => {
    setQty(data.qty);
    setTimeInForce(data.time_in_force);
  }, [data.id, data.qty, data.time_in_force]);

  useEffect(() => {
    // Handle order replacement success/error
    if (replacedState?.success && replacedState.data.replaces === data.id) {
      setOrders((prev) => {
        const index = prev.findIndex((o) => o.id === replacedState.data.replaces);
        if (index === -1) return prev;
        const updated = [...prev];
        updated[index] = { ...updated[index], ...replacedState.data };
        return updated;
      });
      toast.success(replacedState.message || "Order replaced successfully");
    } else if (replacedState?.error && replacedState.data?.replaces === data.id) {
      toast.error(replacedState.error);
    }

    // Handle order deletion success/error
    if (replacedStateAfterDeletion?.message && replacedStateAfterDeletion.deletedId === data.id) {
      setOrders((prev) => {
        const index = prev.findIndex((o) => o.id === replacedStateAfterDeletion.deletedId);
        if (index === -1) return prev;
        const updated = [...prev];
        updated[index] = { ...updated[index], status: "canceled" };
        return updated;
      });
      setModalOpen("none");
      toast.success("Deleted Order");
    } else if (replacedStateAfterDeletion?.error && replacedStateAfterDeletion.deletedId === data.id) {
      toast.error(replacedStateAfterDeletion.error);
    }
  }, [replacedState, replacedStateAfterDeletion, setOrders, setModalOpen, data.id]);

  return (
    <dialog
      open={isModalOpen === "editOrder"}
      className="p-6 shadow mt-4 rounded-lg fixed top-1/2 left-1/2 -translate-1/2 z-10"
    >
      <button className="absolute right-4" onClick={() => setModalOpen("none")}>
        ❌
      </button>

      <form
        action={replaceFormAction}
        className="grid gap-6 grid-cols-1 md:grid-cols-3 items-stretch"
      >
        <input type="hidden" name="order_id" value={data.id} />

        <div className="flex flex-col">
          <p className="mb-2 font-semibold">Order ID:</p>
          <p>{data.id}</p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="qty" className="mb-2 font-semibold">Quantity</label>
          <input
            id="qty"
            name="qty"
            type="number"
            min="1"
            required
            value={qty}
            className="border p-2 rounded w-full"
            onChange={(e) => setQty(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="time_in_force" className="mb-2 font-semibold">Time in Force</label>
          <select
            id="time_in_force"
            name="time_in_force"
            value={timeInForce}
            onChange={(e) => setTimeInForce(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="day">Day</option>
            <option value="gtc">Good Till Cancelled</option>
          </select>
        </div>

        <div className="flex items-end col-span-full">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 disabled:hover:bg-blue-600 text-white px-6 py-2 rounded w-full transition"
          >
            Edit Order
          </button>
        </div>
      </form>

      <form className="mt-4" action={deleteFormAction}>
        <input type="hidden" name="order_id" value={replacedState?.data?.id || data.id} />
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 disabled:hover:bg-red-600 text-white px-6 py-2 rounded w-full transition self-stretch"
        >
          Delete Order
        </button>
      </form>
    </dialog>
  );
}
