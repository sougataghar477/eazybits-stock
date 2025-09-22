"use server";

export async function placeOrder(currentState, formData) {
  try {
    const body = {
      symbol: formData.get("symbol"),
      qty: formData.get("qty"),
      side: formData.get("side"),
      type: formData.get("type"),
      time_in_force: formData.get("time_in_force"),
    };

    const res = await fetch("https://paper-api.alpaca.markets/v2/orders", {
      method: "POST",
      headers: {
        "APCA-API-KEY-ID": process.env.ALPACA_API_KEY_ID,
        "APCA-API-SECRET-KEY": process.env.ALPACA_API_SECRET_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return { success: true, data };
  } catch (err) {
    console.error("Order error:", err);
    return { success: false, error: err.message || "Error placing order" };
  }
}
