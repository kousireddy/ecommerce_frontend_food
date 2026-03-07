"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"

export default function OrdersPage() {

    const [orders, setOrders] = useState([]);
    const router = useRouter()

    // Function to load orders
    const loadOrders = async () => {
        const userId = localStorage.getItem("user_id");
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/my-orders/${userId}/`);
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : data.orders || []);
    };

    useEffect(() => {
        // Initial load
        loadOrders();

        // Poll every 5 seconds
        const interval = setInterval(loadOrders, 5000);

        return () => clearInterval(interval); // cleanup on unmount
    }, []);

    return (
        <div style={{ padding: 40 }}>
            <h2 className="font-bold text-4xl">MY ORDERS</h2>

            {orders.length === 0 && <p>No orders found</p>}
            {orders.map((order) => (
                <div
                    key={order.id}
                    className="border-2 bg-pink-100 p-5 mt-5 rounded-lg"
                >
                    <h3 className="font-bold">Order #{order.id}</h3>

                    <p><span className="font-bold">Status:</span> {order.status}</p>
                    <p><span className="font-bold">Payment Status:</span> {order.payment_status}</p>
                    <p><span className="font-bold">Total:</span>{order.total_price} INR</p>

                    <h4 className="font-bold text-xl">Items</h4>
                     {order.items.map(item => (
                        <div key={item.product_id} className="flex justify-between mt-2">
                            <p><span className="font-bold">{item.product_name} :- </span>{item.quantity} × ₹{item.price}</p>
                            {order.status === "delivered" && (
                            <button
                                onClick={() => router.push(`/review/${item.product_id}`)}
                                className="bg-pink-500 text-white px-4 py-1 rounded"
                            >
                                Write Review
                            </button>
                            )}
                        </div>
                        ))}
                                                
                    {order.items?.map((item, i) => (
                        <p key={item.id ?? i}>
                            {item.product} {item.quantity} × ₹{item.price}
                        </p>
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
    );
}