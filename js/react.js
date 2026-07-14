const API_URL = "https://backend-test-dun.vercel.app/api/landing";

const newTitle = document.getElementById("newTitle");

async function changeTitle() {
  console.log(newTitle.value);
  const response = await fetch(API_URL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      path: "hero.title",
      value: newTitle.value,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.log("response: ", response);
    throw data;
  }

  return data;
}
