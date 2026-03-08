"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { getUserProfile } from "@/lib/api/userinterface/profile"

export default function Profile() {

  const { id } = useParams()
  const [user, setUser] = useState(null)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {

    if (!id) return

   const fetchUser = async () => {
      try {
        const data = await getUserProfile(id)
        setUser(data)
      } catch (err) {
        console.error(err)
        setError("Failed to load profile")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>
  const goToDashboard = () => {
    router.push("/dashboard")
  }



  return (
    <div className="min-h-screen flex items-center justify-center">
      
      <div className="bg-pink-100 shadow-lg p-12 rounded-xl">
        
        <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

        <p><b>Username:</b> {user.username}</p>
        <p><b>Email:</b> {user.email}</p>

        <div className="flex justify-center mt-6">
          <button
            onClick={goToDashboard}
            className="border p-4 rounded-xl bg-pink-500 text-white cursor-pointer"
          >
            Go to Dashboard
          </button>
        </div>

      </div>

    </div>
  )
}