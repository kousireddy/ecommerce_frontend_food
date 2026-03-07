"use client"

import { useState } from "react"
import { IoMenu } from "react-icons/io5"
import AdminSidebar from "@/components/common/AdminSidebar"

export default function AdminDashboard(){

const [isOpen,setIsOpen] = useState(true)

return(

<div className="min-h-screen flex bg-gray-100">

{/* Sidebar */}
<AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

{/* Open Sidebar Button */}
<button
onClick={()=>setIsOpen(true)}
className={`fixed top-5 left-5 bg-pink-500 text-white px-3 py-2 rounded-xl shadow
${isOpen ? "hidden" : "block"}`}
>
<IoMenu size={22}/>
</button>

{/* Main Content */}
<div
className={`flex-1 p-10 mt-10 transition-all duration-300
${isOpen ? "ml-64" : "ml-0"}`}
>

<h1 className="text-4xl font-bold">
Admin Dashboard
</h1>

<p className="mt-4 text-gray-600 text-xl">
Welcome Admin
</p>

</div>

</div>

)
}