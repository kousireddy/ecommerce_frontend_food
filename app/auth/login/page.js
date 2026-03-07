"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

export default function Login(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const router = useRouter()

const handleLogin = async(e)=>{
e.preventDefault()

const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/login/`,{
    method:"POST",
            headers:{
            "Content-Type":"application/json"
            },
                    body:JSON.stringify({
                    email,
                    password
            })
            })

const data = await res.json()

console.log("Response:",data)

if(res.ok){

        //storing token
        Cookies.set("access_token", data.access_token, { expires: 1 })
        Cookies.set("refresh_token", data.refresh_token, { expires: 7 })

        alert("Login Successful")
        console.log(data.user)
        
        localStorage.setItem("user_id", data.user.id)

        if(data.user.is_admin){
        router.push("/admin/dashboard")
        }else{
        router.push("/dashboard")
        }
        
        }else{
        alert(data.non_field_errors || "Invalid email or password")
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

{/* Login Card */}
<div className="relative z-10 bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-xl w-[90%] sm:w-[500px]">

<h2 className="text-center text-2xl font-bold mb-6 bg-pink-400 py-2 rounded-lg">
LOG IN
</h2>

<form onSubmit={handleLogin} className="flex flex-col gap-4">

<input
type="email"
placeholder="enter your email id"
className="p-3 rounded-2xl bg-white/70 outline-none"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="enter password"
className="p-3 rounded-2xl bg-white/70 outline-none"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
type="submit"
className="bg-pink-200 py-2 rounded-2xl font-semibold hover:bg-pink-300 transition"
>
login
</button>

<p className="text-center text-md">
don't have an account?
<span
onClick={()=>router.push("/auth/signup")}
className="text-blue-600 ml-1 cursor-pointer"
>
signup
</span>
</p>

</form>

</div>

</div>
)
}
