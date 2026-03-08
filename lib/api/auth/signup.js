export async function signupUser(name, email, password) {

  try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/register/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password
        })
      }
    )

    const data = await res.json()   // stored in data variable

    if (!res.ok) {
      throw new Error(data.error || JSON.stringify(data))
    }

    return data

  } catch (error) {

    console.error("Signup Error:", error)
    throw error

  }

}