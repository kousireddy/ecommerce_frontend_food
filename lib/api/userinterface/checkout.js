export async function checkoutOrder(userId) {

const res = await fetch(
`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/checkout/${userId}/`,
{
method: "POST"
}
)

const data = await res.json()

if(!res.ok){
throw new Error(data.error || "Checkout failed")
}

return data

}