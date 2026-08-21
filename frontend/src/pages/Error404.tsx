import { MokpAlert, MokpGrid } from "@/components/ui";

export default function MokpError404() {
  return (
    <MokpGrid>
      <MokpAlert variant="danger" title="Page not found" ghost />
    </MokpGrid>
  );
}
