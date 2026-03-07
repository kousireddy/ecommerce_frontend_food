"use client"

import { useRouter } from "next/navigation"

export default function Home() {

  const router = useRouter()

  return (
    <div className="min-h-screen">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-4 bg-pink-200 shadow">
        <h1 className="text-4xl font-semibold">
          Food
        </h1>

        <div className="space-x-4">
          <button
            onClick={() => router.push("/auth/login")}
            className="bg-pink-400 hover:bg-pink-500 font-bold px-5 py-2 rounded-xl"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/auth/signup")}
            className="bg-pink-400 hover:bg-pink-500 font-bold px-5 py-2 rounded-xl"
          >
            Signup
          </button>
        </div>
      </nav>


      {/* Hero Section */}
      <div className="relative h-[90vh] w-full">

        {/* Image */}
        <img
          src="/images/herosection-foodimg.jpg"
          alt="food"
          className="w-full h-full object-cover"
        />

        {/* Overlay Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/50 px-10 py-6 rounded text-center">
            <h1 className="text-4xl italic">
              FOOD LOVERS WELCOME TO YOUR WORLD OF LOVE.....
            </h1>

            <p className="mt-2 italic text-right">
              Make your day more delicious
            </p>
          </div>
        </div>

      </div>

    </div>
  )
}