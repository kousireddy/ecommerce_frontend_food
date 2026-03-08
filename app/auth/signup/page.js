"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupUser } from "@/lib/api/auth/signup";

export default function Signup() {

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const router = useRouter()

const handleSubmit = async(e)=>{
e.preventDefault()

try{

const data=await signupUser(name,email,password)

console.log(data)

alert("Signup successful. OTP sent to your email")

router.push(`/auth/verifyotp?email=${email}`)

}catch(err){

alert(err.message)

}

}

return(

<div className="relative min-h-screen flex items-center justify-center">

<img
src="/images/herosection-foodimg.jpg"
alt="background"
className="absolute inset-0 w-full h-full object-cover"
/>

<div className="absolute inset-0 bg-black/50"></div>

{/* Signup Card */}
<div className="relative z-10 bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-xl w-[90%] sm:w-[500px]">

<h2 className="text-center text-2xl font-bold mb-6 bg-pink-400 py-2 rounded-lg">
SIGN UP
</h2>

<form onSubmit={handleSubmit} className="flex flex-col gap-4">

<input
type="text"
placeholder="enter your full name"
className="p-3 rounded-2xl bg-white/70 outline-none"
onChange={(e)=>setName(e.target.value)}
/>

<input
type="email"
placeholder="enter your email id"
className="p-3 rounded-2xl bg-white/70 outline-none"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="create password"
className="p-3 rounded-2xl bg-white/70 outline-none"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
type="submit"
className="bg-pink-300 py-2 rounded-2xl font-semibold hover:bg-pink-400 transition"
>
submit
</button>

<p className="text-center text-md">
already have an account?
<span
onClick={()=>router.push("/auth/login")}
className="text-blue-600 ml-1 cursor-pointer"
>
login
</span>
</p>

</form>

</div>

</div>

)

}