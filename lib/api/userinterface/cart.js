export async function getCartItems(userId){

const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/items/${userId}/`)

const data = await res.json()

if(!res.ok){
throw new Error(data.error || "Failed to fetch cart")
}

return data

}


export async function updateCartQty(itemId,action){

const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/update-qty/`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
item_id:itemId,
action:action
})
})

const data = await res.json()

if(!res.ok){
throw new Error(data.error || "Failed to update quantity")
}

return data

}


export async function removeCartItem(id){

const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/remove/${id}/`,{
method:"DELETE"
})

const data = await res.json()

if(!res.ok){
throw new Error(data.error || "Failed to remove item")
}

return data

}