"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { MdOutlineStar } from "react-icons/md";

export default function ReviewPage() {
  const { productId } = useParams(); // dynamic productId from URL
  const router = useRouter();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [productName, setProductName] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch product details
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${productId}/`);
        if (!res.ok) {
          const text = await res.text();
          console.error("Failed to fetch product:", text);
          setProductName("Unknown Product");
          return;
        }
        const data = await res.json();
        setProductName(data.name || "Unknown Product");
      } catch (err) {
        console.error("Error fetching product:", err);
        setProductName("Unknown Product");
      }
    };

    fetchProduct();
  }, [productId]);

  // Submit review
  const submitReview = async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      alert("User not logged in");
      return;
    }

    if (!productId) {
      alert("Product ID not found");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews/add-review/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: userId,
          product: productId,
          rating: parseInt(rating),
          comment,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Failed to submit review:", text);
        alert("Failed to submit review. Check console for details.");
        return;
      }

      const data = await res.json();
      console.log("Review submitted:", data);
      alert("Review submitted successfully!");
      router.push("/orders"); // redirect after success
    } catch (err) {
      console.error(err);
      alert("Network or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="bg-pink-50 border-2 rounded-xl p-6 w-[600px] shadow-md">
        <h2 className="text-xl font-bold mb-4">
          Write Review {productName && `for "${productName}"`}
        </h2>

        <label className="block mb-2 font-bold">Rating</label>

        <div className="flex gap-2 mb-4 text-3xl cursor-pointer">
          {[1,2,3,4,5].map((star) => (
            <MdOutlineStar
              key={star}
              onClick={() => setRating(star)}
              className={star <= rating ? "text-yellow-400" : "text-gray-400"}
            />
          ))}
        </div>

        <label className="block mb-2 font-bold">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review"
          className="border w-full p-2 mb-4 rounded"
        />

        <button
          onClick={submitReview}
          disabled={loading}
          className={`w-full px-4 py-2 rounded text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600 rounded-xl"
          }`}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
}