"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { minggu: "Minggu 1", Pendapatan: 90, Keuntungan: 50 },
  { minggu: "Minggu 2", Pendapatan: 110, Keuntungan: 65 },
  { minggu: "Minggu 3", Pendapatan: 130, Keuntungan: 80 },
  { minggu: "Minggu 4", Pendapatan: 140, Keuntungan: 90 },
];

export default function ReportBarChart() {
  return (
    <div className="w-full h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          barGap={6}
        >
          <CartesianGrid strokeDasharray="0" stroke="#E2D7C5" vertical={false} />
          <XAxis
            dataKey="minggu"
            tick={{ fill: "#6E543C", fontSize: 11, fontWeight: 500 }}
            tickLine={false}
            axisLine={{ stroke: "#CBBBA4" }}
          />
          <YAxis
            domain={[0, 150]}
            ticks={[0, 50, 100, 150]}
            tickFormatter={(val) => `${val} Jt`}
            tick={{ fill: "#6E543C", fontSize: 11, fontWeight: 500 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            formatter={(
              value: number | string | readonly (string | number)[] | undefined,
              name: string | number | readonly (string | number)[] | undefined
            ) => [
              `Rp ${value ?? 0}.000.000`,
              name === "Pendapatan" ? "Pendapatan" : "Keuntungan",
            ]}
            contentStyle={{
              backgroundColor: "#FAF7F2",
              borderColor: "#D9CBB7",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(61,40,23,0.1)",
              fontSize: "12px",
            }}
          />
          <Bar
            dataKey="Pendapatan"
            fill="#3D2817"
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
          <Bar
            dataKey="Keuntungan"
            fill="#2E7D32"
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
