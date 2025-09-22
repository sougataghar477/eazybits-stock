"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PortfolioeChart({ data }) {
  return (
    <div className="h-[400px] w-full p-4 rounded-lg shadow">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          {/* Equity curve */}
          <Line type="monotone" dataKey="equity" stroke="#8884d8" strokeWidth={2} />
          {/* Daily profit/loss */}
          <Line type="monotone" dataKey="profit" stroke="#82ca9d" strokeWidth={2} />
          <Line type="monotone" dataKey="profit_pct" stroke="red" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
