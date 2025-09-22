export async function GET() {
  try {
    const res = await fetch('https://paper-api.alpaca.markets/v2/orders?status=all', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'APCA-API-KEY-ID': process.env.ALPACA_API_KEY_ID,
        'APCA-API-SECRET-KEY': process.env.ALPACA_API_SECRET_KEY,
      },
    });

    if (!res.ok) throw new Error(`Alpaca API error: ${res.status} ${res.statusText}`);
    const data = await res.json();
    // Step 1: simulate filled prices for unfilled orders
    

    return new Response(JSON.stringify({ orders:data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
