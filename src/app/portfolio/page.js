export const dynamic = 'force-dynamic';
import Orders from "@/components/Orders";
import PortfolioChart from "@/components/PortfolioChart";

export default async function Portfolio() {
  let data = [];
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_HOST + "/api/portfolio",
      { cache: "no-store" } // <- forces dynamic fetch
    );
    const json = await res.json();
    data = json.data;
  } catch (error) {
    console.error("Failed to fetch portfolio:", error);
  }

  return (
    <>
      <div className="text-4xl font-bold mb-4">Portfolio</div>
      <PortfolioChart data={data} />
      <Orders />
    </>
  );
}
