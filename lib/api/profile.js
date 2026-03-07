

export async function getUserProfile(id) {
  if (!id) return null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/profile/${id}/`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user profile");
  }

  const data = await res.json();
  console.log("Fetched data : ",data);
  return data;
}