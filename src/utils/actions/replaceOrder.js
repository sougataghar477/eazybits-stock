"use server";

export async function replaceOrder(currentState, formData) {
  try {
    const body = {
      qty: formData.get("qty"),
      time_in_force: formData.get("time_in_force"),
    };

    const res = await fetch("https://paper-api.alpaca.markets/v2/orders/"+formData.get("order_id"), {
      method: "PATCH",
      headers: {
        "APCA-API-KEY-ID": process.env.ALPACA_API_KEY_ID,
        "APCA-API-SECRET-KEY": process.env.ALPACA_API_SECRET_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log("Sample response:", data);
    return { success: true,message:'Replaced Order', data };
  } catch (err) {
    console.error("Order error:", err);
    return { success: false, message: err.message || "Error placing order" };
  }
}
