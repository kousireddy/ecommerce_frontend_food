"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function CheckoutPage() {

  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCheckout = async () => {

    const userId = localStorage.getItem("user_id");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/checkout/${userId}/`,
      {
        method: "POST"
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Order placed successfully");

      setShowSuccess(true);

      setTimeout(() => {
        router.push("/orders");
      }, 2000);

    } else {
      alert(data.error || "Checkout failed");
    }
  };

  return (
    <div className="p-10 min-h-screen flex flex-col items-center justify-center">

      <h2 className="text-2xl font-semibold mb-6">
        Payment Checkout
      </h2>

      <button
        onClick={handleCheckout}
        className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
      >
        Pay & Place Order
      </button>

      {showSuccess && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
          <FaCheckCircle className="text-green-500 text-6xl" />
          <p>Order Placed</p>
        </div>
      )}

    </div>
  );
}