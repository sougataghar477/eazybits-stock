export async function POST(req) {
  try {
    const body = await req.json();

    const res = await fetch(
      `https://data.alpaca.markets/v2/stocks/${body.symbol}/quotes/latest`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "APCA-API-KEY-ID": process.env.ALPACA_API_KEY_ID,
          "APCA-API-SECRET-KEY": process.env.ALPACA_API_SECRET_KEY,
        },
      }
    );

    const data = await res.json();

    console.log("Request body:", body);
    console.log("Alpaca response:", data);

    return Response.json({ msg: "Table", ap: data.quote.ap });
  } catch (err) {
    console.error("Error in POST /api/symbol:", err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
