"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { checkoutOrder } from "@/lib/api/userinterface/checkout";

export default function CheckoutPage() {

const router = useRouter();
const [showSuccess,setShowSuccess] = useState(false);

const handleCheckout = async () => {

try{

const userId = localStorage.getItem("user_id");

const data = await checkoutOrder(userId); 

console.log(data);

setShowSuccess(true);

setTimeout(()=>{
router.push("/orders");
},2000);

}catch(error){

alert(error.message);

}

};

return(

<div className="p-10 min-h-screen flex flex-col items-center justify-center">

<h2 className="text-2xl font-semibold mb-6">
Payment Checkout
</h2>

<button
onClick={handleCheckout}
className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition cursor-pointer"
>
Pay & Place Order
</button>

{showSuccess && (
<div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
<FaCheckCircle className="text-green-500 text-6xl"/>
<p>Order Placed</p>
</div>
)}

</div>

);

}