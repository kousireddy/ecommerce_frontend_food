"use client"

import { useEffect, useState } from "react"
import AdminSidebar from "@/components/common/AdminSidebar"
import { IoMenu } from "react-icons/io5"

export default function AddProduct() {

const [categories, setCategories] = useState([])
const [name, setName] = useState("")
const [price, setPrice] = useState("")
const [category, setCategory] = useState("")
const [image, setImage] = useState(null)
const [preview, setPreview] = useState(null)
const [loading, setLoading] = useState(false)
const [isOpen, setIsOpen] = useState(true)

useEffect(() => {
fetch("http://127.0.0.1:8000/api/products/categories/")
.then(res => res.json())
.then(data => setCategories(data))
.catch(err => console.error("Error fetching categories:", err))
}, [])

const handleSubmit = async (e) => {
e.preventDefault()

if (!name || !price || !category) {
alert("Please fill all fields")
return
}

const formData = new FormData()
formData.append("name", name)
formData.append("price", price)
formData.append("category", category)
if (image) formData.append("image", image)

try {

setLoading(true)

const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/add-product/`,{
method:"POST",
body:formData
})

let data
const contentType = res.headers.get("content-type") || ""

if (contentType.includes("application/json")){
data = await res.json()
}else{
data = {message: await res.text()}
}

if(!res.ok){
alert(data.error || data.message || "Error adding product")
setLoading(false)
return
}

alert("Product Added Successfully")

setName("")
setPrice("")
setCategory("")
setImage(null)
setPreview(null)
setLoading(false)

}catch(err){
console.error(err)
alert("Network Error")
setLoading(false)
}

}

return (

<div className="min-h-screen flex bg-gray-100">

{/* Sidebar */}
<AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen}/>

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
className={`flex-1 flex items-center justify-center transition-all duration-300
${isOpen ? "ml-64" : "ml-0"}`}
>

<div className="bg-white p-8 rounded-xl shadow-lg w-[420px] border-2">

<h2 className="text-3xl font-bold mb-6 text-center text-pink-500">
Add Product
</h2>

<form
onSubmit={handleSubmit}
encType="multipart/form-data"
className="space-y-4"
>

<input
type="text"
placeholder="Product Name"
value={name}
onChange={e => setName(e.target.value)}
className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
/>

<input
type="number"
placeholder="Price"
value={price}
onChange={e => setPrice(e.target.value)}
className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
/>

<select
value={category}
onChange={e => setCategory(e.target.value)}
className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
>
<option value="">Select Category</option>
{categories.map(cat=>(
<option key={cat.id} value={cat.id}>
{cat.name}
</option>
))}
</select>

<label className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer inline-block">
    Upload Image
<input
type="file"
accept="image/*"
onChange={e=>{
setImage(e.target.files[0])
setPreview(URL.createObjectURL(e.target.files[0]))
}}
className="hidden"
/>
</label>


{preview && (
<img
src={preview}
alt="preview"
className="w-full h-40 object-cover rounded-lg"
/>
)}

<button
type="submit"
disabled={loading}
className={`w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition
${loading ? "opacity-50 cursor-not-allowed" : ""}`}
>
{loading ? "Adding..." : "Add Product"}
</button>

</form>

</div>

</div>

</div>

)

}