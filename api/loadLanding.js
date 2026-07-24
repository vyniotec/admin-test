export default async function loadLanding() {
  try {
    const res = await fetch("https://backend-test-dun.vercel.app/api/landing");

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const response = await res.json();

    if (!response.success) {
      throw new Error("No se pudo obtener la landing.");
    }

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error cargando la landing:", error);
  }
}
