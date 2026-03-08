"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/common/AdminSidebar";
import { IoMenu } from "react-icons/io5";
import { getAdminOrders, updateOrderStatus } from "@/lib/api/admin/orders";

export default function AdminOrdersPage() {

const [orders, setOrders] = useState([]);
const [error, setError] = useState("");
const [isOpen, setIsOpen] = useState(true);

const loadOrders = async () => {

try {

const userId = localStorage.getItem("user_id")

const data = await getAdminOrders(userId)

setOrders(Array.isArray(data) ? data : data.orders || [])

} catch (err) {

setError(err.message)
setOrders([])

}

}

useEffect(() => {
loadOrders()
}, [])

const handleStatusChange = async (orderId, newStatus) => {

try {

await updateOrderStatus(orderId, newStatus)

alert("Order status updated")

loadOrders()

} catch (err) {

alert(err.message)

}

}

return (

<div className="min-h-screen flex bg-gray-100">

{/* Sidebar */}
<AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

{/* Main Content */}
<div className={`flex-1 p-10 transition-all duration-300 ${isOpen ? "ml-64" : "ml-0"}`}>

{/* Open Sidebar Button */}
<button
onClick={() => setIsOpen(true)}
className={`fixed top-5 left-5 bg-pink-500 text-white px-3 py-2 rounded-xl shadow 
${isOpen ? "hidden" : "block"}`}
>
<IoMenu />
</button>

<h2 className="text-3xl font-bold mb-6">Admin Order Dashboard</h2>

{error && <p className="text-red-600 mb-4">{error}</p>}
{orders.length === 0 && !error && <p>No orders found</p>}

{orders.map((order) => (
<div
key={order.id}
className="border rounded-xl p-6 mb-6 shadow hover:shadow-lg transition bg-pink-100"
>

<h3 className="text-xl font-semibold mb-2">Order #{order.id}</h3>

<p><span className="font-bold">User: </span>{order.username}</p>
<p><span className="font-bold">Email: </span>{order.email}</p>
<p><span className="font-bold">Total : </span>{order.total_price} INR</p>
<p><span className="font-bold">Payment status: </span>{order.payment_status}</p>

<div className="mt-2">
<span className="font-semibold">Status: </span>

<select
value={order.status}
onChange={(e)=>handleStatusChange(order.id,e.target.value)}
className="p-1 border-2 border-pink-400 rounded-lg bg-white text-gray-700 
focus:outline-none focus:ring-2 focus:ring-pink-400 cursor-pointer"
>

<option value="pending">Pending</option>
<option value="processing">Processing</option>
<option value="shipped">Shipped</option>
<option value="delivered">Delivered</option>

</select>

</div>

<div className="mt-4">

<h4 className="font-semibold mb-2">Items</h4>

{order.items?.map((item,index)=>(
<p key={`${order.id}-${item.product}-${index}`}>
{item.product} {item.quantity} x ₹{item.price}
</p>
))}

</div>

</div>
))}

</div>

</div>

)

}