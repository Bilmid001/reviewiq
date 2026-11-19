"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowUpRight,
  MessageSquare,
  Package,
  Star,
  ThumbsUp,
} from "lucide-react";
import { Shell } from "@/components/shell";
import { StatCard } from "@/components/stat-card";
import { demoProducts, demoReviews } from "@/lib/demo-data";
import { sentimentRows, summarize } from "@/lib/analytics";

const DashboardCharts = dynamic(
  () => import("@/components/dashboard-charts"),
  { ssr: false },
);

export default function Dashboard() {
  const summary = summarize(demoReviews);
  const sentiment = sentimentRows(demoReviews);
  const trend = Array.from({ length: 7 }, (_, index) => ({
    day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index],
    reviews: [12, 18, 14, 25, 21, 32, 28][index],
  }));

  return (
    <Shell
      title="Dashboard"
      subtitle="A clear overview of customer feedback and product performance."
    >
      <div className="flex justify-end mb-5">
        <span className="pill positive">DEMO DATA · SAMPLE WORKSPACE</span>
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Total reviews"
          value={summary.total.toLocaleString()}
          detail="Across all sample products"
          icon={MessageSquare}
        />
        <StatCard
          label="Products tracked"
          value={demoProducts.length}
          detail="Across 5 product categories"
          icon={Package}
        />
        <StatCard
          label="Average rating"
          value={`${summary.average.toFixed(1)} / 5`}
          detail="Customer star ratings"
          icon={Star}
          tone="amber"
        />
        <StatCard
          label="Positive sentiment"
          value={`${Math.round((summary.positive / summary.total) * 100)}%`}
          detail="Based on analyzed sample reviews"
          icon={ThumbsUp}
        />
      </div>

      <DashboardCharts sentiment={sentiment} trend={trend} />

      <div className="grid xl:grid-cols-2 gap-5 mt-5">
        <div className="card p-5">
          <div className="flex justify-between items-center">
            <h2 className="font-bold">Recent customer reviews</h2>
            <Link
              href="/dashboard/reviews"
              className="text-xs text-emerald font-semibold"
            >
              View all <ArrowUpRight size={13} className="inline" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full mt-3">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Review</th>
                  <th>Sentiment</th>
                </tr>
              </thead>
              <tbody>
                {demoReviews.slice(0, 5).map((review) => (
                  <tr key={review.id}>
                    <td className="font-semibold whitespace-nowrap">
                      {review.customer_name}
                    </td>
                    <td className="max-w-[220px] truncate">
                      {review.content}
                    </td>
                    <td>
                      <span
                        className={`pill ${
                          review.sentiment === "positive"
                            ? "positive"
                            : review.sentiment === "negative"
                              ? "negative"
                              : "neutral"
                        }`}
                      >
                        {review.sentiment}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex justify-between">
            <h2 className="font-bold">Product performance</h2>
            <Link
              href="/dashboard/products"
              className="text-xs text-emerald font-semibold"
            >
              Manage products
            </Link>
          </div>
          <div className="space-y-4 mt-5">
            {demoProducts.slice(0, 5).map((product, index) => (
              <div key={product.id}>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">{product.name}</span>
                  <span className="muted">
                    {(4.7 - index * 0.25).toFixed(1)} / 5
                  </span>
                </div>
                <div className="h-2 bg-[#edf2ee] rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-emerald rounded-full"
                    style={{ width: `${94 - index * 5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 card p-5 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <div className="font-bold">Ready to analyze new feedback?</div>
          <p className="text-sm muted mt-1">
            Import a CSV or Excel spreadsheet and start reviewing customer
            sentiment.
          </p>
        </div>
        <Link href="/dashboard/import" className="btn btn-primary">
          Import reviews <ArrowUpRight size={16} />
        </Link>
      </div>
    </Shell>
  );
}
