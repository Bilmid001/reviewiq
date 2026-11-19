"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type DashboardChartsProps = {
  sentiment: { name: string; value: number }[];
  trend: { day: string; reviews: number }[];
};

const sentimentColors = ["#16a36a", "#eab34b", "#df625d"];

export default function DashboardCharts({
  sentiment,
  trend,
}: DashboardChartsProps) {
  return (
    <div className="grid xl:grid-cols-3 gap-5 mt-5">
      <div className="card p-5 xl:col-span-2">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-bold">Review activity</h2>
            <p className="text-xs muted mt-1">
              Sample review volume over the week
            </p>
          </div>
          <span className="text-xs muted">Last 7 days</span>
        </div>
        <div className="h-[260px] mt-5">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trend}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#edf1ee"
              />
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar
                dataKey="reviews"
                fill="#16a36a"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card p-5">
        <h2 className="font-bold">Sentiment distribution</h2>
        <p className="text-xs muted mt-1">Current sample review set</p>
        <div className="h-[190px] mt-3">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sentiment}
                dataKey="value"
                nameKey="name"
                innerRadius={54}
                outerRadius={82}
                paddingAngle={4}
              >
                {sentiment.map((item, index) => (
                  <Cell
                    key={item.name}
                    fill={sentimentColors[index % sentimentColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-3">
          {sentiment.map((item, index) => (
            <div key={item.name} className="flex justify-between text-sm">
              <span className="flex items-center gap-2">
                <i
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    background:
                      sentimentColors[index % sentimentColors.length],
                  }}
                />
                {item.name}
              </span>
              <b>{item.value}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
