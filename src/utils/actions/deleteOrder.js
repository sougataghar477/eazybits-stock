"use server";

export async function deleteOrder(currentState, formData) {
    console.log(formData)
  try {
 

    const res = await fetch("https://paper-api.alpaca.markets/v2/orders/"+formData.get("order_id"), {
      method: "DELETE",
      headers: {
        "APCA-API-KEY-ID": process.env.ALPACA_API_KEY_ID,
        "APCA-API-SECRET-KEY": process.env.ALPACA_API_SECRET_KEY,
        "Content-Type": "application/json",
      },
    });

    const data = await res.text();
    console.log("Y",JSON.stringify(data));
    
        return { success: true, message:'Deleted order',deletedId:formData.get("order_id") };
 
  } catch (err) {
    console.error("Order error:", err);
    return { success: false, error: err.message || "Error placing order" };
  }

}
