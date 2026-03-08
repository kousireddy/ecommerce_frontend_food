export async function getUserProfile(userId){

const res = await fetch(
`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/profile/${userId}/`
)

const data = await res.json()

if(!res.ok){
throw new Error(data.error || "Failed to fetch user profile")
}

return data

}


export async function getProducts(){

const res = await fetch(
`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/user-products/`
)

const data = await res.json()

if(!res.ok){
throw new Error(data.error || "Failed to fetch products")
}

return data

}


export async function addProductToCart(user_id,product_id){

const res = await fetch(
`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/add/`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
user_id:user_id,
product_id:product_id,
quantity:1
})
}
)

const data = await res.json()

if(!res.ok){
throw new Error(data.error || "Failed to add product")
}

return data

}