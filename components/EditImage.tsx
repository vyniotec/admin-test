"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import deleteImage from "@/api/deleteImage";

import { uploadImage } from "@/api/uploadImage";
import placeholder from "@/public/placeholder.png";

import changeLanding from "@/api/changeLanding";

interface EditImageProps {
  imageSrc: string;
  alt: string;
  path: string;
}

export default function EditImage({ imageSrc, alt, path }: EditImageProps) {
  const router = useRouter();

  const [openReplace, setOpenReplace] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<StaticImageData | string>(placeholder);
  const [loading, setLoading] = useState(false);
  const [principalImage, setPrincipalImage] = useState(imageSrc);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0] ?? null;

    if (!selectedFile) {
      setFile(null);
      setPreview(placeholder);
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      // 5 MB
      toast.error("La imagen no puede pesar más de 5 MB.");

      // Limpia el input para que el usuario pueda volver a seleccionar
      e.target.value = "";

      setFile(null);
      setPreview(placeholder);
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  }

  async function handleUpload() {
    if (!file) return;

    setLoading(true);

    try {
      const uploadRes = await uploadImage(file);
      if (uploadRes.success) {
        const imageUrl = `http://backend-test-dun.vercel.app/uploads/${file.name}`;

        const result = await changeLanding(imageUrl, path);

        if (result.success) {
          const cleanUrl = () => {
            const cleanLink = imageSrc.split("/uploads/")[1];
            return cleanLink;
          };
          const cleanLink = cleanUrl();

          const resDelete = await deleteImage({
            path: "public/uploads/" + cleanLink,
          });

          if (resDelete.success) {
            toast.success("Imagen subida correctamente.");
            setPrincipalImage(URL.createObjectURL(file));
            setOpenReplace(false);
            setFile(null);
            setPreview(placeholder);

            router.refresh();
          } else {
            toast.error(resDelete.message);
          }
        } else {
          toast.error(result.message);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Ocurrió un error al subir la imagen.");
    } finally {
      setLoading(false);
    }
  }

  function confirmUpload() {
    if (!file) return;

    toast.custom((t) => (
      <div className="bg-white rounded-lg shadow-lg border p-4 w-80">
        <p className="font-semibold mb-2">¿Estás seguro?</p>

        <p className="text-sm text-gray-600 mb-4">
          Esta acción reemplazará la imagen actual.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 rounded border"
          >
            Cancelar
          </button>

          <button
            onClick={() => {
              toast.dismiss(t.id);
              handleUpload();
            }}
            className="px-3 py-1 rounded bg-blue-600 text-white"
          >
            Sí, reemplazar
          </button>
        </div>
      </div>
    ));
  }

  function handleCancel() {
    setOpenReplace(false);
    setFile(null);
    setPreview(placeholder);
  }

  return !openReplace ? (
    <div className="flex flex-col gap-2 max-w-md">
      <h1>Imagen del hero</h1>

      <Image
        width={300}
        height={300}
        src={principalImage}
        alt={alt}
        className="w-[300px] h-[300px] object-cover rounded-lg"
      />

      <button
        onClick={() => setOpenReplace(true)}
        className="rounded bg-blue-600 text-white px-4 py-2"
      >
        Reemplazar imagen
      </button>
    </div>
  ) : (
    <div className="flex flex-col gap-2 max-w-md">
      <h1>Imagen del hero</h1>

      <div className="relative w-[300px] h-[300px]">
        <Image
          src={preview}
          alt={alt}
          width={300}
          height={300}
          className="absolute inset-0 w-full h-full object-cover rounded-lg z-0"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={confirmUpload}
          disabled={!file || loading}
          className="rounded bg-green-600 text-white px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Subiendo..." : "Subir imagen"}
        </button>

        <button
          onClick={handleCancel}
          disabled={loading}
          className="rounded bg-gray-500 text-white px-4 py-2"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
