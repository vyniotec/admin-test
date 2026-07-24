import loadLanding from "@/api/loadLanding";
import EditImage from "@/components/EditImage";
import EditText from "@/components/EditText";
import DeleteImage from "@/components/DeleteImage";

export default async function Edit() {
  const data = await loadLanding();

  return (
    <div>
      {/* titulo */}
      <EditText
        initialValue={data.hero.title}
        label="Título"
        path="hero.title"
      />
      <EditImage
        imageSrc={data.hero.image}
        alt="Imagen principal"
        path="hero.image"
      />
      <DeleteImage image={data.hero.image} />
    </div>
  );
}
