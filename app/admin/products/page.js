"use client"

import { useEffect, useState } from "react"
import AdminSidebar from "@/components/common/AdminSidebar"
import { IoMenu } from "react-icons/io5"

export default function AdminProducts() {

  const [data, setData] = useState([])
  const [isOpen, setIsOpen] = useState(true)

  const fetchProducts = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/category-products-with-reviews/`)
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Error fetching products:", err))
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // DELETE PRODUCT
  const deleteProduct = async (id) => {

    try {

      await fetch(
        `http://127.0.0.1:8000/api/products/delete/${id}/`,
        {
          method: "DELETE"
        }
      )

      fetchProducts()

    } catch (error) {
      console.error("Delete error:", error)
    }

  }

  // UPDATE STOCK
  const updateStock = async (id, status) => {

    try {

      await fetch(
        `http://127.0.0.1:8000/api/products/update-stock/${id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            in_stock: status
          })
        }
      )

      fetchProducts()

    } catch (error) {
      console.error("Stock update error:", error)
    }

  }

  return (

    <div className="min-h-screen flex bg-gray-100">

      {/* Open Sidebar Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-5 left-5 bg-pink-500 text-white px-3 py-2 rounded-xl shadow 
        ${isOpen ? "hidden" : "block"}`}
      >
        <IoMenu />
      </button>

      {/* Sidebar */}
      <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <div
        className={`flex-1 p-15 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-0"
        }`}
      >

        <h2 className="text-2xl font-bold mb-6">
          Admin Product Dashboard
        </h2>

        {data.map((category) => (

          <div key={category.id || category.category} className="mb-8">

            {/* Category Title */}
            <h3 className="text-xl font-semibold mb-4 capitalize border-b-2 border-pink-400 pb-1 inline-block">
              {category.category}
            </h3>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

              {category.products.map((product) => (

                <div
                  key={product.id}
                  className="border p-4 rounded-xl shadow-sm hover:shadow-md transition bg-pink-100"
                >

                  {/* Product Image */}
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-xl mb-3"
                    />
                  )}

                  {/* Product Info */}
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-gray-600">{product.price} INR</p>

                  {/* STOCK STATUS */}
                  <p className="mt-2">
                    Status :
                    {product.in_stock ? (
                      <span className="text-green-600 ml-1">
                        In Stock
                      </span>
                    ) : (
                      <span className="text-red-600 ml-1">
                        Out Of Stock
                      </span>
                    )}
                  </p>

                  {/* ADMIN ACTIONS */}
                  <div className="flex flex-wrap gap-2 mt-3">

                    <button
                      onClick={() => updateStock(product.id, true)}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      In Stock
                    </button>

                    <button
                      onClick={() => updateStock(product.id, false)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Out of stock
                    </button>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}