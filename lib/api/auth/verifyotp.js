export async function verifyOtp(email, otp) {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/verify-otp/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        otp: otp
      })
    }
  )

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || "Invalid OTP")
  }

  return data
}