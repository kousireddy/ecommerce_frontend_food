"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { IoIosAdd } from "react-icons/io";
import { GrFormSubtract } from "react-icons/gr";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)
  const [userId, setUserId] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const id = localStorage.getItem("user_id")
    if (!id) {
      console.log("User not logged in")
      return
    }
    setUserId(id)
    fetchCart(id)
  }, [])

  const fetchCart = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/items/${id}/`)
    const data = await res.json()
    setCartItems(data.items || [])
    setTotal(data.total_price || 0)
  }

  const updateQty = async (itemId, action) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/update-qty/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item_id: itemId, action: action }),
    })
    fetchCart(userId)
  }

  const removeItem = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/remove/${id}/`, { method: "DELETE" })
    fetchCart(userId)
  }

  const goToCheckout = () => {
    router.push("/checkout")
  }

  const goToDashboard = () => {
    router.push("/dashboard")
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cartItems.length === 0 && <p>Your cart is empty</p>}
        <button onClick={goToDashboard} className="mt-4 bg-pink-500 text-white px-6 py-2 rounded">ADD Items to cart</button>

        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center border p-4 rounded-lg bg-pink-100">
            {/* Product Info with Image */}
            <div className="flex items-center gap-4">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.product_name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div>
                <h2 className="font-semibold text-lg">{item.product_name}</h2>
                <p className="text-gray-500">₹{item.price}</p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQty(item.id, "decrease")}
                className="bg-pink-400 px-3 py-2 rounded"
              >
                <GrFormSubtract/>
              </button>
              <p className="font-bold">{item.quantity}</p>
              <button
                onClick={() => updateQty(item.id, "increase")}
                className="bg-pink-400 px-3 py-2 rounded"
              >
                <IoIosAdd/>
              </button>

              <button
                onClick={() => removeItem(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded ml-4"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total and Checkout */}
      <div className="mt-6 text-right">
        <h2 className="text-2xl font-bold">Total: ₹{total}</h2>
        <button
          onClick={goToCheckout}
          className="mt-4 bg-black text-white px-6 py-2 rounded"
        >
          BUY
        </button>
      </div>
    </div>
  )
}