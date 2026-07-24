/**
 * Sube una imagen al backend.
 * @param {File} file - Archivo seleccionado.
 * @param {string} title - Título de la imagen.
 */
export async function uploadImage(file) {
  // Convertir el archivo a Base64 (sin el prefijo data:image/...)
  const content = await new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      resolve(base64);
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const response = await fetch(
    `https://backend-test-dun.vercel.app/api/landing/image`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: "public/uploads/" + file.name,
        content,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al subir la imagen");
  }

  return data;
}
