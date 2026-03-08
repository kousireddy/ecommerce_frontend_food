export async function getMyOrders(userId){

const res = await fetch(
`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/my-orders/${userId}/`
)

const data = await res.json()

if(!res.ok){
throw new Error(data.error || "Failed to fetch orders")
}

return data

}