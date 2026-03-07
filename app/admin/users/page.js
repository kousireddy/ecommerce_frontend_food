"use client"

import { useEffect, useState } from "react"
import AdminSidebar from "@/components/common/AdminSidebar"
import { IoMenu } from "react-icons/io5";

export default function UsersPage(){

const [users,setUsers] = useState([])
const [isOpen,setIsOpen] = useState(true)

useEffect(()=>{

fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/list/`)
.then(res=>res.json())
.then(data=>setUsers(data))

},[])

return(

<div className="min-h-screen flex bg-gray-100">

{/* Sidebar */}
<AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen}/>

{/* Main Content */}
<div className={`flex-1 p-10 transition-all duration-300 ${isOpen ? "ml-80" : "ml-0"}`}>

  {/* Open Sidebar Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-5 left-5 bg-pink-500 text-white px-3 py-2 rounded-xl shadow 
        ${isOpen ? "hidden" : "block"}`}
      >
        <IoMenu />
      </button>

<h1 className="text-3xl font-bold m-6">
Registered Users
</h1>

<div className="bg-white shadow rounded-lg overflow-hidden border-2">

<table className="w-full">

<thead className="bg-pink-200">

<tr>
<th className="p-3 text-left">ID</th>
<th className="p-3 text-left">Username</th>
<th className="p-3 text-left">Email</th>
</tr>

</thead>

<tbody>

{users.map((user)=>(
<tr key={user.id} className="border-t">

<td className="p-3">{user.id}</td>
<td className="p-3">{user.username}</td>
<td className="p-3">{user.email}</td>

</tr>
))}

</tbody>

</table>

</div>

</div>

</div>

)
}