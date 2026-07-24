export default async function deleteImage({ path }) {
  const response = await fetch(
    `https://backend-test-dun.vercel.app/api/landing/image`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al eliminar la imagen");
  }

  return data;
}
