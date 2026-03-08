export async function addProduct(formData) {

  try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/add-product/`,
      {
        method: "POST",
        body: formData
      }
    )

    let data
    const contentType = res.headers.get("content-type") || ""

    if (contentType.includes("application/json")) {
      data = await res.json()
    } else {
      data = { message: await res.text() }
    }

    if (!res.ok) {
      throw new Error(data.error || data.message || "Error adding product")
    }

    return data

  } catch (error) {
    console.error("Add Product Error:", error)
    throw error
  }

}