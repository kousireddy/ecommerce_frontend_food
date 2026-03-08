export async function getUsers() {

  try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/list/`
    )

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || "Failed to fetch users")
    }

    return data

  } catch (error) {
    console.error("Fetch Users Error:", error)
    throw error
  }

}