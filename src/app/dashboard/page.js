import DashboardChart from "@/components/DashboardChart";
import dummyData from "@/utils/data.json";

export default async function Dashboard() {
  // Fetch intraday stock data for IBM from Alpha Vantage
  // "interval=60min" gives hourly candles
  // Cached for 4 hours (14400s) to reduce API calls since Alpha Vantage has strict limits
  const res = await fetch(
    "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=60min&apikey=" +
      process.env.ALPHA_VANTAGE_API_KEY,
    { next: { revalidate: 14400 } } // ISR caching in Next.js App Router
  );

  // Parse API response as JSON
  const data = await res.json();

  // Extract the "Time Series (60min)" object from the response
  const timeSeries = data["Time Series (60min)"];

  // Fallback handling:
  // If both API data and dummyData are unavailable, show an error message
  if (!timeSeries && !dummyData) {
    return (
      <div className="p-4 bg-gray-300 rounded-lg mt-4">
        <h2 className="text-red-500 font-bold">API Error</h2>
        {/* Print the raw response for debugging */}
        <span className="text-xs">{JSON.stringify(data, null, 2)}</span>
      </div>
    );
  }

  return (
    <>
      {/* Page header */}
      <div className="text-4xl font-bold mb-4">Dashboard</div>

      {/* DashboardChart expects an array of objects.
          We convert the timeSeries (or dummyData) object into an array:
          - Object.entries converts { timestamp: {open, high...}, ... } into [[time, values], ...]
          - Map reshapes into { time, ...values }
          - Slice(0,5) shows only the first 5 data points for brevity */}
      <DashboardChart
        data={Object.entries(timeSeries || dummyData)
          .map(([time, values]) => ({
            time,
            ...values,
          }))
          .slice(0, 5)}
      />
    </>
  );
}
