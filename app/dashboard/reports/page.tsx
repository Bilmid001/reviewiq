"use client";

import { Download, FileBarChart, Printer } from "lucide-react";
import { Shell } from "@/components/shell";
import { demoProducts, demoReviews } from "@/lib/demo-data";

const reportTypes = [
  ["Product performance", "Review counts and average product ratings"],
  ["Sentiment overview", "Positive, negative and neutral feedback totals"],
  ["Review register", "Customer comments, ratings and source details"],
  ["Monthly feedback", "Review activity grouped by time period"],
  ["Product comparison", "Side-by-side product performance"],
  ["AI insight summary", "Themes and recommendations from analyzed reviews"],
];

export default function Reports() {
  function download() {
    const rows = [
      ["Product", "Review count", "Average rating"],
      ...demoProducts.map((product) => {
        const reviews = demoReviews.filter(
          (review) => review.product_id === product.id,
        );
        const average = reviews.length
          ? (
              reviews.reduce((total, review) => total + review.rating, 0) /
              reviews.length
            ).toFixed(2)
          : 0;
        return [product.name, reviews.length, average];
      }),
    ];
    const csv = rows.map((row) => row.join(",")).join("\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "reviewiq-product-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Shell
      title="Reports"
      subtitle="Export useful summaries for academic review and business decision-making."
    >
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {reportTypes.map(([title, description]) => (
          <div className="card p-5" key={title}>
            <div className="w-10 h-10 rounded-xl bg-mint text-emerald grid place-items-center">
              <FileBarChart />
            </div>
            <h3 className="font-bold mt-4">{title}</h3>
            <p className="text-sm muted mt-2 min-h-10">{description}</p>
            <button onClick={download} className="btn btn-light mt-4">
              <Download size={15} /> Export CSV
            </button>
          </div>
        ))}
      </div>
      <div className="card p-5 mt-5 flex items-center justify-between">
        <div>
          <b>Print report</b>
          <p className="text-sm muted mt-1">
            Use your browser&apos;s print dialog to save the current report
            pages as PDF.
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="btn btn-primary"
        >
          <Printer size={16} /> Print
        </button>
      </div>
    </Shell>
  );
}
