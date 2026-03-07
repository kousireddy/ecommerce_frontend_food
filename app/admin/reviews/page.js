"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/common/AdminSidebar";
import { IoMenu } from "react-icons/io5";
import { IoMdStar } from "react-icons/io";

export default function AdminReviews() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  // Fetch products with nested reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews/all-reviews/`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex bg-gray-100">
        <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <button
          onClick={() => setIsOpen(true)}
          className={`fixed top-5 left-5 bg-pink-500 text-white px-3 py-2 rounded-xl shadow
          ${isOpen ? "hidden" : "block"}`}
        >
          <IoMenu size={22} />
        </button>

        <div
          className={`flex-1 flex justify-center items-center transition-all duration-300
          ${isOpen ? "ml-64" : "ml-0"}`}
        >
          <p className="text-gray-600 text-lg">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Open Sidebar Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-5 left-5 bg-pink-500 text-white px-3 py-2 rounded-lg shadow
        ${isOpen ? "hidden" : "block"}`}
      >
        <IoMenu size={22} />
      </button>

      {/* Main Content */}
      <div
        className={`flex-1 p-15 transition-all duration-300
        ${isOpen ? "ml-64" : "ml-0"}`}
      >

        <h2 className="text-3xl font-bold mb-6 text-pink-500">
          Admin Reviews Dashboard
        </h2>

        {products.length === 0 && (
          <p className="text-gray-500">No products found.</p>
        )}

        {products.map((product) => (
          <div
            key={product.id}
            className="border-2 rounded-xl p-6 mb-6 shadow bg-pink-100 hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-xl mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-3"><span className="font-bold">Price: </span>{product.price} INR</p>

            <h4 className="font-semibold mb-2">Reviews:</h4>

            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-3">
                {product.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border p-3 rounded-xl bg-gray-50"
                  >
                    <p>
                      <span className="font-semibold">User:</span> {review.user}
                    </p>
                    <p className="flex items-center gap-1">
                      <span className="font-semibold">Rating:</span>
                      <IoMdStar className="text-yellow-500 text-2xl" />
                      {review.rating}
                    </p>
                    <p><span className="font-bold">Comments: </span>{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet</p>
            )}
          </div>
        ))}

      </div>
    </div>
  );
}