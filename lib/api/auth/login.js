export async function loginUser(email, password) {

  try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/login/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    )

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.non_field_errors || "Invalid email or password")
    }

    return data

  } catch (error) {
    console.error("Login Error:", error)
    throw error
  }

}