"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

import {
getUserProfile,
getProducts,
addProductToCart
} from "@/lib/api/userinterface/dashboard"

export default function Dashboard() {

const [data,setData] = useState([])
const [user,setUser] = useState({})

const router = useRouter()

const goToProfile = ()=>{
const id = localStorage.getItem("user_id")
router.push(`/profile/${id}`)
}

const goToCart = ()=>router.push("/cart")
const goToOrders = ()=>router.push("/orders")


const addToCart = async(productId)=>{

const user_id = localStorage.getItem("user_id")

if(!user_id){
alert("Please login first")
return
}

try{

const data = await addProductToCart(user_id,productId)

console.log(data)

alert("Product added to cart")

}catch(error){

console.log(error)
alert(error.message)

}

}


// Fetch user
useEffect(()=>{

const id = localStorage.getItem("user_id")

if(!id) return

async function fetchUser(){

try{

const data = await getUserProfile(id)

setUser(data)

}catch(error){

console.log(error)

}

}

fetchUser()

},[])


// Fetch products
useEffect(()=>{

async function fetchProducts(){

try{

const data = await getProducts()

setData(data || [])

}catch(error){

console.log(error)

}

}

fetchProducts()

},[])



return(

<div className="relative w-full min-h-screen bg-gray-50">

<div className="relative z-10 p-4 sm:p-8">

{/* Top Menu */}

<div className="flex flex-col sm:flex-row sm:justify-end items-center gap-4 sm:gap-6 mb-8 sm:mb-10">

{user.username && (

<div className="bg-pink-300 px-4 py-2 sm:px-8 sm:py-3 rounded-xl font-semibold text-sm sm:text-base text-center w-full sm:w-auto">

WELCOME {user.username} !!!

</div>

)}

<button
onClick={goToCart}
className="bg-pink-400 px-4 py-2 sm:px-6 sm:py-2 rounded-xl text-sm sm:text-base w-full sm:w-auto cursor-pointer"
>
CART
</button>

<button
onClick={goToOrders}
className="bg-pink-400 px-4 py-2 sm:px-6 sm:py-2 rounded-xl text-sm sm:text-base w-full sm:w-auto cursor-pointer"
>
My Orders
</button>

<button
onClick={goToProfile}
className="bg-pink-400 px-4 py-2 sm:px-6 sm:py-2 rounded-xl text-sm sm:text-base w-full sm:w-auto cursor-pointer"
>
Profile
</button>

</div>


{!data || data.length===0 && (

<p className="text-center text-gray-500">
No products found
</p>

)}


<div className="space-y-14">

{data.map((category,index)=>(
<div key={index}>

<h2 className="text-xl font-semibold mb-4 capitalize border-b-2 border-pink-400 pb-1 inline-block">
{category.category}
</h2>

<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

{category.products?.map((product)=>(
<div
key={product.id}
className={`border rounded-xl shadow-sm p-5 hover:shadow-md transition
${product.in_stock ? "bg-pink-100" : "bg-gray-300 opacity-70"}`}
>

{product.image && (

<img
src={product.image}
alt={product.name}
className="w-full h-40 object-cover rounded-xl mb-3 border-2 border-pink-600"
/>

)}

<h3 className="font-semibold text-lg mb-2">
{product.name}
</h3>

<p className="text-gray-600 mb-2">
{product.price} INR
</p>

{product.in_stock ? (
<p className="text-green-600 font-semibold mb-3">
In Stock
</p>
) : (
<p className="text-red-600 font-semibold mb-3">
Out Of Stock
</p>
)}

<button
disabled={!product.in_stock}
onClick={()=>addToCart(product.id)}
className={`w-full py-2 rounded-lg text-white
${product.in_stock
? "bg-pink-500 hover:bg-pink-600"
: "bg-gray-500 cursor-not-allowed"
}`}
>

{product.in_stock ? "Add To Cart" : "Out Of Stock"}

</button>

</div>
))}

</div>

</div>
))}

</div>

</div>

</div>

)

}