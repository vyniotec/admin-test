"use client";
import deleteImage from "@/api/deleteImage";
import toast from "react-hot-toast";

export default function DeleteImage({ image }: { image: string }) {
  const cleanUrl = () => {
    const path = image.split("/uploads/")[1];
    return path;
  };

  const handleDelete = async () => {
    try {
      const path = cleanUrl();
      await deleteImage({
        path: "public/uploads/" + path,
      });

      toast.success("Imagen eliminada correctamente");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error al eliminar la imagen",
      );
    }
  };

  return (
    <div>
      <h1>{image}</h1>
      <button onClick={handleDelete}>delete</button>
    </div>
  );
}
