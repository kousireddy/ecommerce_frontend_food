export async function getProductsWithReviews() {
  try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/category-products-with-reviews/`
    )

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || "Failed to fetch products")
    }

    return data

  } catch (error) {
    console.error("Fetch Products Error:", error)
    throw error
  }
}


export async function deleteProductById(id) {

  try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/delete/${id}/`,
      {
        method: "DELETE"
      }
    )

    if (!res.ok) {
      throw new Error("Failed to delete product")
    }

    return true

  } catch (error) {
    console.error("Delete Product Error:", error)
    throw error
  }

}


export async function updateProductStock(id, status) {

  try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/update-stock/${id}/`,
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

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || "Failed to update stock")
    }

    return data

  } catch (error) {
    console.error("Stock Update Error:", error)
    throw error
  }

}