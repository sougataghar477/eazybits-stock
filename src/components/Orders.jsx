"use client"; 
// Client Component because it uses React hooks like useState/useEffect

import { useEffect, useMemo, useState } from "react";
import EditOrderForm from "./EditOrderForm";
import AddOrderForm from "./AddOrderForm";
import Table from "./Table";
import { FiFilter } from "react-icons/fi";

export default function Orders() {
  // State for storing all fetched orders
  const [orders, setOrders] = useState([]);

  // Currently applied filter (e.g., "filled", "canceled", etc.)
  const [filteredOption, setFilteredOption] = useState("");

  // Controls which modal is open: "addOrder", "editOrder", or "none"
  const [isModalOpen, setModalOpen] = useState("none");

  // Tracks the index of the order being edited
  const [indexOfItem, setIndex] = useState(null);

  // Statuses where editing is disabled
  const notEditableStatuses = ["canceled", "filled", "replaced", "accepted"];

  // Current page index for pagination
  const [pageIndex, setPageIndex] = useState(1);

  // Fetch orders once on mount
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_HOST + "/api/orders")
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setOrders(
          data.orders.map((order) => ({
            id: order.id,
            type: order.type,
            symbol: order.symbol,
            qty: order.qty,
            filled_avg_price: order.filled_avg_price,
            side: order.side,
            status: order.status,
            limit_price: order.limit_price,
            stop_price: order.stop_price,
            time_in_force: order.time_in_force,
          }))
        );
      });
  }, []);

  // Memoized calculation: filter + paginate orders
  const paginatedOrders = useMemo(
    () =>
      filteredOption === ""
        ? orders.slice((pageIndex - 1) * 10, pageIndex * 10) // no filter → just paginate
        : orders
            .filter((order) => order.status === filteredOption) // filter by status
            .slice((pageIndex - 1) * 10, pageIndex * 10), // then paginate
    [orders, pageIndex, filteredOption]
  );

  return (
    <div className="shadow p-4 mt-4 rounded-lg">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">Orders</h1>

      {/* Add Order Button */}
      <button
        onClick={() => setModalOpen("addOrder")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded mb-4 transition"
      >
        Add Order
      </button>

      {/* Edit Order Form Modal (only shows if an order is selected) */}
      {orders?.[indexOfItem] && (
        <EditOrderForm
          setOrders={setOrders}
          data={orders[indexOfItem]}
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
        />
      )}

      {/* Add Order Modal */}
      <AddOrderForm
        setOrders={setOrders}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      />

      {/* Info message */}
      <p>
        Click on an order to edit. Order status with{" "}
        {notEditableStatuses.toString()} can’t be edited.
      </p>

      {/* Filter dropdown */}
      <span className="flex items-center gap-1 font-bold">
        Filter
        <FiFilter /> :
      </span>
      <select
        className="border px-4 py-2 rounded-lg mt-4"
        value={filteredOption}
        onChange={(e) => {
          setPageIndex(1); // reset to page 1 when filter changes
          setFilteredOption(e.target.value);
        }}
      >
        {/* Options: non-editable statuses, plus custom ones */}
        {[...notEditableStatuses, "new", "expired"].map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
        {/* Reset filter option */}
        <option value="">Clear Filter</option>
      </select>

      {/* Orders Table */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Symbol</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Profit/Loss</th>
              <th className="px-4 py-2 border">Limit Price</th>
              <th className="px-4 py-2 border">Stop Price</th>
              <th className="px-4 py-2 border">Side</th>
              <th className="px-4 py-2 border">Time in Force</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length > 0 ? (
              // Render each row via Table component
              paginatedOrders.map((order, idx) => (
                <Table
                  idx={idx}
                  key={idx}
                  order={order}
                  setModalOpen={setModalOpen}
                  setIndex={setIndex}
                />
              ))
            ) : (
              // Empty state
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-4 text-gray-500 border"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <p className="mt-4">
        {new Array(
          Math.ceil(
            filteredOption
              ? orders.filter((order) => order.status === filteredOption)
                  .length / 10
              : orders.length / 10
          )
        )
          .fill(0)
          .map((_, i) => i + 1) // page numbers
          .map((page) => (
            <span
              onClick={() => {
                setPageIndex(page);
              }}
              className={
                "mr-4 cursor-pointer " +
                (pageIndex === page ? "font-bold text-xl" : "")
              }
              key={page}
            >
              {page}
            </span>
          ))}
      </p>
    </div>
  );
}
