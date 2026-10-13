"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Pakaian Pria", value: 40, color: "#3D2817", label: "Pakaian Pria (40%)" },
  { name: "Pakaian Wanita", value: 28, color: "#8C6E54", label: "Pakaian Wanita (28%)" },
  { name: "Outer Batik", value: 18, color: "#D1C2AC", label: "Outer Batik (18%)" },
  { name: "Kain Batik", value: 14, color: "#2E7D32", label: "Kain Batik (14%)" },
];

export default function ReportDonutChart() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 h-[260px]">
      {/* Donut Chart */}
      <div className="w-[180px] h-[180px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              formatter={(
                val: number | string | readonly (string | number)[] | undefined,
                name: string | number | readonly (string | number)[] | undefined
              ) => [`${val ?? 0}%`, String(name ?? "")]}
              contentStyle={{
                backgroundColor: "#FAF7F2",
                borderColor: "#D9CBB7",
                borderRadius: "10px",
                fontSize: "12px",
              }}
            />
            <Pie
              data={data}
              innerRadius={50}
              outerRadius={78}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend Custom */}
      <div className="flex flex-col gap-2.5 text-xs font-medium text-[#3D2817] pr-2">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5">
            <span
              className="w-3.5 h-3.5 rounded-sm shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[11px] font-semibold text-[#422D1D]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
