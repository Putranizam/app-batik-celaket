"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { tanggal: "20 JUN", omzet: 3 },
  { tanggal: "21 JUN", omzet: 7 },
  { tanggal: "22 JUN", omzet: 5.5 },
  { tanggal: "23 JUN", omzet: 8 },
  { tanggal: "24 JUN", omzet: 7.2 },
  { tanggal: "25 JUN", omzet: 11 },
  { tanggal: "26 JUN", omzet: 15 },
];

export default function DashboardSalesChart() {
  return (
    <div className="w-full h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 15, right: 15, left: -15, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="0" stroke="#E2D7C5" vertical={true} />
          <XAxis
            dataKey="tanggal"
            tick={{ fill: "#6E543C", fontSize: 11, fontWeight: 500 }}
            tickLine={false}
            axisLine={{ stroke: "#CBBBA4" }}
          />
          <YAxis
            domain={[0, 20]}
            ticks={[0, 5, 10, 15, 20]}
            tickFormatter={(val) => `${val} JT`}
            tick={{ fill: "#6E543C", fontSize: 11, fontWeight: 500 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            formatter={(value: number | string | readonly (string | number)[] | undefined) => [
              `Rp ${value ?? 0}.000.000`,
              "Penjualan",
            ]}
            contentStyle={{
              backgroundColor: "#FAF7F2",
              borderColor: "#D9CBB7",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(61,40,23,0.1)",
              fontSize: "12px",
            }}
          />
          <Line
            type="monotone"
            dataKey="omzet"
            stroke="#533722"
            strokeWidth={2}
            dot={{
              r: 4,
              fill: "#3D2817",
              stroke: "#FAF7F2",
              strokeWidth: 2,
            }}
            activeDot={{ r: 6, fill: "#21140E" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
