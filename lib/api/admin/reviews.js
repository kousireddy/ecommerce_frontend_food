export async function getAllReviews() {

  try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews/all-reviews/`
    )

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || "Failed to fetch reviews")
    }

    return data

  } catch (error) {
    console.error("Fetch Reviews Error:", error)
    throw error
  }

}