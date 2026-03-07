"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function VerifyOTP() {

const router = useRouter()
const searchParams = useSearchParams()

const email = searchParams.get("email")

const [otp,setOtp] = useState("")
const [message,setMessage] = useState("")

const handleVerify = async (e) => {
e.preventDefault()

const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/verify-otp/`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email: email,
otp: otp
})
})

const data = await res.json()

if(res.ok){
setMessage("Email verified successfully")
setTimeout(()=>{
router.push("/auth/login")
},2000)
}
else{
setMessage(data.error || "Invalid OTP")
}

}

return(

<div className="relative min-h-screen flex items-center justify-center">

<img
src="/images/herosection-foodimg.jpg"
alt="background"
className="absolute inset-0 w-full h-full object-cover"
/>


<div className="absolute inset-0 bg-black/50 flex items-center justify-center">

<div className="relative z-10 bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-xl w-[90%] sm:w-[500px]">
<h2 className="text-center text-2xl font-bold mb-6 bg-pink-400 py-2 rounded-lg">
Verify OTP
</h2>

<p className="text-sm text-white mb-4 text-center">
OTP sent to {email}
</p>

<form onSubmit={handleVerify}>

<input
type="text"
placeholder="Enter 6 digit OTP"
value={otp}
onChange={(e)=>setOtp(e.target.value)}
className="w-full border border-white text-white p-3 rounded mb-4"
/>

<button
className="w-full bg-pink-300 text-black p-3 rounded hover:bg-gray-800"
>
Verify OTP
</button>

</form>

{message && (
<p className="mt-4 text-center text-green-600">
{message}
</p>
)}

</div>

</div>

</div>

)
}