import { useTranslation } from "@/services/translation";
import { MokpCard, MokpGrid } from "@/components/ui";

export default function MokpHome() {
  const { t } = useTranslation();

  return (
    <MokpGrid>
      <h1 style={{ fontFamily: "Quicksand", fontSize: "2rem", fontWeight: 500 }}>Home</h1>
      <MokpCard>
        Under construction
      </MokpCard>
    </MokpGrid>
  );
}
