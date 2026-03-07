"use client"

import { useRouter } from "next/navigation"

export default function AdminSidebar({ isOpen, setIsOpen }) {

const router = useRouter()

return(

<div className={`fixed top-0 left-0 h-full bg-pink-500 text-white transition-all duration-300
${isOpen ? "w-64 p-6" : "w-0 p-0 overflow-hidden"}`}>

{isOpen && (
<>
<h1 className="text-3xl font-bold mb-10 underline">ADMIN</h1>

<ul className="space-y-4 text-xl">

<li
className="cursor-pointer hover:text-black"
onClick={()=>router.push("/admin/dashboard")}
>
Dashboard
</li>

<li
className="cursor-pointer hover:text-black"
onClick={()=>router.push("/admin/users")}
>
Users
</li>

<li
className="cursor-pointer hover:text-black"
onClick={()=>router.push("/admin/orders")}
>
Orders
</li>

<li
className="cursor-pointer hover:text-black"
onClick={()=>router.push("/admin/products")}
>
Products
</li>

<li
className="cursor-pointer hover:text-black"
onClick={()=>router.push("/admin/add-category")}
>
Add Category
</li>

<li
className="cursor-pointer hover:text-black"
onClick={()=>router.push("/admin/add-product")}
>
Add Products
</li>

<li
className="cursor-pointer hover:text-black"
onClick={()=>router.push("/admin/reviews")}
>
Reviews
</li>

</ul>

<button
onClick={()=>setIsOpen(false)}
className="mt-10 bg-white text-pink-500 px-4 py-2 rounded-xl"
>
Close
</button>

</>
)}

</div>

)
}