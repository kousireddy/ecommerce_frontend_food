"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMyOrders } from "@/lib/api/userinterface/orders";

export default function OrdersPage() {

const [orders,setOrders] = useState([])
const router = useRouter()

// Load orders
const loadOrders = async()=>{

try{

const userId = localStorage.getItem("user_id")

if(!userId) return

const data = await getMyOrders(userId)   

setOrders(Array.isArray(data) ? data : data.orders || [])

}catch(error){

console.log(error)

}

}

useEffect(()=>{

loadOrders()

const interval = setInterval(loadOrders,5000)

return ()=>clearInterval(interval)

},[])


return(

<div className="p-10">

<h2 className="font-bold text-4xl">MY ORDERS</h2>

{orders.length === 0 && (
<p>No orders found</p>
)}

{orders.map((order)=>(
<div
key={order.id}
className="border-2 bg-pink-100 p-5 mt-5 rounded-lg"
>

<h3 className="font-bold">
Order #{order.id}
</h3>

<p>
<span className="font-bold">Status:</span> {order.status}
</p>

<p>
<span className="font-bold">Payment Status:</span> {order.payment_status}
</p>

<p>
<span className="font-bold">Total:</span> {order.total_price} INR
</p>

<h4 className="font-bold text-xl">
Items
</h4>

{order.items?.map((item)=>(
<div
key={item.product_id}
className="flex justify-between mt-2"
>

<p>
<span className="font-bold">
{item.product_name} :- </span>
 {item.quantity} x ₹{item.price}
</p>

{order.status === "delivered" && (
<button
onClick={()=>router.push(`/review/${item.product_id}`)}
className="bg-pink-500 text-white px-4 py-1 rounded"
>
Write Review
</button>
)}

</div>
))}

{/* Total Amount */}

<div className="mt-4 pt-3 border-t">

<p className="text-lg font-bold">
Total Amount: ₹{order.total_price}
</p>

</div>

</div>
))}

</div>

)

}