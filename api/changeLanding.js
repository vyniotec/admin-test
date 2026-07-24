export default async function changeLanding(newValue, path) {
  try {
    const response = await fetch(
      "https://backend-test-dun.vercel.app/api/landing",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path,
          value: newValue,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: data.message || "Error al actualizar la landing.",
      };
    }

    return {
      success: true,
      status: response.status,
      data,
    };
  } catch (error) {
    return {
      success: false,
      status: 0,
      message: error instanceof Error ? error.message : "Error de conexión.",
    };
  }
}
