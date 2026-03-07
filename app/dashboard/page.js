"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function Dashboard() {

  const [data, setData] = useState([])
  const [user, setUser] = useState({})
  const router = useRouter()

  const goToProfile = () => {
    const id = localStorage.getItem("user_id")
    router.push(`/profile/${id}`)
  }

  const goToCart = () => router.push("/cart")
  const goToOrders = () => router.push("/orders")

  // Add to cart
  const addToCart = async (productId) => {

    const user_id = localStorage.getItem("user_id")

    if (!user_id) {
      alert("Please login first")
      return
    }

    try {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/add/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id,
            product_id: productId,
            quantity: 1
          })
        }
      )

      if (!res.ok) throw new Error("Failed to add product")

      const data = await res.json()
      console.log(data)

      alert("Product added to cart")

    } catch (error) {

      console.log("Cart error:", error)
      alert("Something went wrong")

    }

  }

  // Fetch user profile
  useEffect(() => {

    const id = localStorage.getItem("user_id")

    if (!id) return

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/profile/${id}/`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("User fetch error:", err))

  }, [])

  // Fetch products
  useEffect(() => {

    async function fetchProducts() {

      try {

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/user-products/`
        )

        const json = await res.json()

        console.log("Dashboard Data:", json)

        setData(json || [])

      } catch (error) {

        console.log("Fetch error:", error)

      }

    }

    fetchProducts()

  }, [])

  return (

    <div className="relative w-full min-h-screen bg-gray-50">

      <div className="relative z-10 p-4 sm:p-8">

        {/* Top Menu */}

        <div className="flex flex-col sm:flex-row sm:justify-end items-center gap-4 sm:gap-6 mb-8 sm:mb-10">

          {user.username && (

            <div className="bg-pink-300 px-4 py-2 sm:px-8 sm:py-3 rounded-xl font-semibold text-sm sm:text-base text-center w-full sm:w-auto">

              WELCOME {user.username} !!!

            </div>

          )}

          <button
            onClick={goToCart}
            className="bg-pink-400 px-4 py-2 sm:px-6 sm:py-2 rounded-xl text-sm sm:text-base w-full sm:w-auto"
          >
            CART
          </button>

          <button
            onClick={goToOrders}
            className="bg-pink-400 px-4 py-2 sm:px-6 sm:py-2 rounded-xl text-sm sm:text-base w-full sm:w-auto"
          >
            My Orders
          </button>

          <button
            onClick={goToProfile}
            className="bg-pink-400 px-4 py-2 sm:px-6 sm:py-2 rounded-xl text-sm sm:text-base w-full sm:w-auto"
          >
            Profile
          </button>

        </div>

        {/* Empty state */}

        {!data || data.length === 0 ? (
          <p className="text-center text-gray-500">
            No products found
          </p>
        ) : null}

        {/* Categories */}

        <div className="space-y-14">

          {data.map((category, index) => (

            <div key={index}>

              <h2 className="text-xl font-semibold mb-4 capitalize border-b-2 border-pink-400 pb-1 inline-block">

                {category.category}

              </h2>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {category.products?.map((product) => (

                  <div
                    key={product.id}
                    className={`border rounded-xl shadow-sm p-5 hover:shadow-md transition
                    ${product.in_stock ? "bg-pink-100" : "bg-gray-300 opacity-70"}`}
                  >

                    {/* Image */}

                    {product.image && (

                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-40 object-cover rounded-xl mb-3 border-2 border-pink-600"
                      />

                    )}

                    {/* Product name */}

                    <h3 className="font-semibold text-lg mb-2">

                      {product.name}

                    </h3>

                    {/* Price */}

                    <p className="text-gray-600 mb-2">

                      {product.price} INR

                    </p>

                    {/* Stock status */}

                    {product.in_stock ? (

                      <p className="text-green-600 font-semibold mb-3">

                        In Stock

                      </p>

                    ) : (

                      <p className="text-red-600 font-semibold mb-3">

                        Out Of Stock

                      </p>

                    )}

                    {/* Add to cart */}

                    <button
                      disabled={!product.in_stock}
                      onClick={() => addToCart(product.id)}
                      className={`w-full py-2 rounded-lg text-white
                      ${product.in_stock
                        ? "bg-pink-500 hover:bg-pink-600"
                        : "bg-gray-500 cursor-not-allowed"
                      }`}
                    >

                      {product.in_stock ? "Add To Cart" : "Out Of Stock"}

                    </button>

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}