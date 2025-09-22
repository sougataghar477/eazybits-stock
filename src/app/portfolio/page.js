import Orders from "@/components/Orders";
import PortfolioChart from "@/components/PortfolioChart";
export default async function Portfolio(){
    const data = await fetch(process.env.NEXT_PUBLIC_HOST+"/api/portfolio");
    const res = await data.json();
    console.log(res.data)
    return <>
    <div className="text-4xl font-bold mb-4">Portfolio</div>
    <PortfolioChart data={res.data}/>
    <Orders/>
    </>
}