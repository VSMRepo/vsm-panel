"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Event = {
  id: string;
  store_id: string;
  createdAt: string;
  time_exported: string;
  app_version?: string;
  compacted?: boolean;
  reports?: boolean;
};

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
];

type LogsChartProps = {
  events: Event[];
  groupByKey: keyof Event; // chave que será usada no agrupamento
  title?: string;
};

export default function LogsChart({
  events,
  groupByKey,
  title,
}: LogsChartProps) {
  const dataGrouped = events.reduce((acc, curr) => {
    const key = curr[groupByKey] ?? "Indefinido";
    const existing = acc.find((item) => item[groupByKey] === key);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ [groupByKey]: String(key), count: 1 });
    }
    return acc;
  }, [] as Array<Record<string, string | number> & { count: number }>);

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 rounded-lg shadow-md bg-base-100">
      {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={dataGrouped}
            dataKey="count"
            nameKey={groupByKey}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {dataGrouped.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
