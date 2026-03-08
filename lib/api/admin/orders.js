export async function getAdminOrders(userId) {
  try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/admin-orders/${userId}/`
    )

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || "Failed to load orders")
    }

    return data

  } catch (error) {
    console.error("Fetch Orders Error:", error)
    throw error
  }
}


export async function updateOrderStatus(orderId, status) {

  try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/update-status/${orderId}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      }
    )

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || "Failed to update order")
    }

    return data

  } catch (error) {
    console.error("Update Order Error:", error)
    throw error
  }

}