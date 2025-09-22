"use client";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
export default function DashboardChart({data}){
    return <div className="h-[400px] w-full p-4 shadow rounded-lg mt-4">
              <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="1. open"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="2. high"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
          <Bar
            dataKey="3. low"
            fill="#82cad"
            activeBar={<Rectangle fill="orange" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
}