import { useEffect, useState } from "react";
import { useTranslation } from "@/services/translation";
import { MokpCard, MokpData, MokpGrid } from "@/components/ui";

export default function MokpLeaderboard() {
  const { t } = useTranslation();

  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const test = async () => {
      try {
        const response = await fetch("/api/health", { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        setUsersList(data.users);
      } catch (e) {
        if (e.name === "AbortError") {
          return;
        }
        console.error(e.message);
      }
    };

    test();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <MokpGrid>
      <h1 style={{ fontFamily: "Quicksand", fontSize: "2rem", fontWeight: 500 }}>Leaderboard</h1>
      <MokpGrid.Row>
        <MokpGrid.Col col="33" orderSm="1" orderMd="2" order="2">
          <MokpCard>first place</MokpCard>
        </MokpGrid.Col>
        <MokpGrid.Col col="33" order="1" orderMd="1" orderSm="2">
          <MokpCard>second place</MokpCard>
        </MokpGrid.Col>
        <MokpGrid.Col col="33" order="3" orderMd="3" orderSm="3">
          <MokpCard>third place</MokpCard>
        </MokpGrid.Col>
      </MokpGrid.Row>
      <MokpGrid.Row>
        <MokpGrid.Col col="75">
          <MokpCard>
            <section>
              {usersList.map((u) => (
                <MokpData key={u.id}>
                  <MokpData.Key>{u.name}</MokpData.Key>
                  <MokpData.Value>{u.id}</MokpData.Value>
                </MokpData>
              ))}
            </section>
          </MokpCard>
        </MokpGrid.Col>
        <MokpGrid.Col col="25" nop>
          <MokpGrid.Row wrap>
            <MokpGrid.Col>
              <MokpCard>(ta position)</MokpCard>
            </MokpGrid.Col>
            <MokpGrid.Col>
              <MokpCard>(récompenses de saison)</MokpCard>
            </MokpGrid.Col>
          </MokpGrid.Row>
        </MokpGrid.Col>
      </MokpGrid.Row>
    </MokpGrid>
  );
}
