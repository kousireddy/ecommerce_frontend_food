export async function addCategory(name) {

  try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/add-category/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    )

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || "Failed to add category")
    }

    return data

  } catch (error) {
    console.error("Add Category Error:", error)
    throw error
  }

}