// app/api/performance/route.js
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://paper-api.alpaca.markets/v2/account/portfolio/history?period=1M&timeframe=1D",
    {
      headers: {
        "APCA-API-KEY-ID": process.env.ALPACA_API_KEY_ID,
        "APCA-API-SECRET-KEY": process.env.ALPACA_API_SECRET_KEY,
      },
    }
  );

  const history = await res.json();

  const data = history.timestamp.map((t, i) => ({
    date: new Date(t * 1000).toISOString().slice(0, 10),
    equity: history.equity[i],
    profit: history.profit_loss?.[i] ?? null,
    profit_pct: history.profit_loss_pct?.[i] ?? null,
  }));

  return Response.json({ data });
}
