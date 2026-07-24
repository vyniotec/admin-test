"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import changeLanding from "@/api/changeLanding";

interface EditTextProps {
  initialValue: string;
  label: string;
  path: string;
}

export default function EditText({ initialValue, label, path }: EditTextProps) {
  const router = useRouter();

  const [value, setValue] = useState("");

  const handleSave = () => {
    toast.custom((t) => (
      <div
        className={`bg-white rounded-lg shadow-lg border p-4 transition-all ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}
      >
        <p className="mb-3 font-medium">¿Estas seguro?</p>

        <button
          className="px-4 py-2 rounded bg-blue-600 text-white"
          onClick={async () => {
            toast.dismiss(t.id);

            try {
              const result = await changeLanding(value, path);

              if (result) {
                toast.success("Guardado correctamente");
              } else {
                toast.error("Ocurrió un error");
              }
            } catch {
              toast.error("Ocurrió un error");
            } finally {
              router.refresh();
            }
          }}
        >
          Confirmar
        </button>
      </div>
    ));
  };

  return (
    <div className="flex flex-col gap-2 max-w-md">
      <label htmlFor="edit">{label}</label>

      <input
        id="edit"
        value={value}
        placeholder={initialValue}
        onChange={(e) => setValue(e.target.value)}
        className="border rounded px-3 py-2"
      />

      <button
        onClick={handleSave}
        disabled={value.trim().length < 3}
        className="rounded bg-blue-600 text-white px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Guardar
      </button>
    </div>
  );
}
