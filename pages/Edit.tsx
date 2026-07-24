import loadLanding from "@/api/loadLanding";
import EditImage from "@/components/EditImage";
import EditText from "@/components/EditText";
import { Landing } from "@/types";

export default async function Edit() {
  const data: Landing = await loadLanding();

  return (
    <div>
      <EditText initialValue={data.phone} label="Telefono" path=".phone" />
      <EditText
        initialValue={data.whatsapp}
        label="Whatsapp"
        path=".whatsapp"
      />
      <EditImage imageSrc={data.logo} alt="Logo" path=".logo" />
      <EditText
        initialValue={data.hero.title}
        label="Título"
        path="hero.title"
      />
      <EditText
        initialValue={data.hero.subtitle}
        label="Subtitulo"
        path="hero.subtitle"
      />
      <EditImage
        imageSrc={data.hero.image}
        alt="Imagen principal"
        path="hero.image"
      />
    </div>
  );
}
