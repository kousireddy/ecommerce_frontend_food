"use client"
import { useState } from "react"
import AdminSidebar from "@/components/common/AdminSidebar"
import { IoMenu } from "react-icons/io5"

export default function AddCategory(){

const [name,setName] = useState("")
const [isOpen, setIsOpen] = useState(true);

const handleSubmit = async(e)=>{
e.preventDefault()

await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/add-category/`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({name})
})

alert("Category Added")
setName("")
}

return(

<div className="min-h-screen flex bg-gray-100">

{/* Sidebar */}
<AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

{/* Open button */}
<button
onClick={() => setIsOpen(true)}
className={`fixed top-5 left-5 bg-pink-500 text-white px-3 py-2 rounded-xl shadow 
${isOpen ? "hidden" : "block"}`}
>
<IoMenu size={22}/>
</button>

{/* Main Content */}
<div
className={`flex-1 flex items-center justify-center transition-all duration-300 
${isOpen ? "ml-64" : "ml-0"}`}
>

<div className="bg-white p-8 rounded-xl shadow-lg w-96 border-2">

<h2 className="text-3xl font-bold mb-6 text-center text-pink-500">
Add Category
</h2>

<form onSubmit={handleSubmit} className="flex flex-col gap-4">

<input
className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
type="text"
placeholder="Category name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<button
type="submit"
className="py-2 px-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition cursor-pointer"
>
Add Category
</button>

</form>

</div>

</div>

</div>

)
}