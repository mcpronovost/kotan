import { IconTower, IconMap2, IconSwords, IconTrophy, IconAtom2 } from "@tabler/icons-react";
import { useTranslation } from "@/services/translation";
import { MokpCard, MokpGrid } from "@/components/ui";

export default function MokpAuthRegister() {
  const { t } = useTranslation();

  return (
    <MokpGrid style={{ maxWidth: 1200 }}>
      <MokpGrid.Row>
        <MokpGrid.Col col="55">
          <MokpCard>
            <h1>Créer un compte</h1>
            <p style={{ color: "var(--mokp-card-fg-subtle)" }}>Rejoignez Kotan et bâtissez votre colonie.</p>
          </MokpCard>
        </MokpGrid.Col>
        <MokpGrid.Col col="45">
          <MokpCard style={{ padding: "48px 48px" }}>
            <h2 style={{ color: "var(--mokp-c-accent)" }}>Bienvenue dans Kotan</h2>
            <p style={{ color: "var(--mokp-card-fg-subtle)" }}>Un monde à explorer, des ressources à gérer et une colonie à faire prospérer.</p>
            <hr />
            <section style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
              <article style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 16 }}>
                <div>
                  <span
                    style={{
                      background: "linear-gradient(to bottom, var(--mokp-c-accent-muted), var(--mokp-c-accent-faint))",
                      border: "1px solid var(--mokp-card-divider)",
                      borderRadius: 12,
                      color: "var(--mokp-c-accent)",
                      lineHeight: 0,
                      display: "block",
                      padding: 16,
                    }}
                  >
                    <IconTower size={32} stroke={1} />
                  </span>
                </div>
                <div>
                  <h3>Bâtissez votre colonie</h3>
                  <p style={{ color: "var(--mokp-card-fg-subtle)" }}>
                    Développez votre colonie, améliorez vos bâtiments et assurez la survie de votre peuple.
                  </p>
                </div>
              </article>
              <article style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 16 }}>
                <div>
                  <span
                    style={{
                      backgroundColor: "var(--mokp-c-success-muted)",
                      border: "1px solid var(--mokp-card-divider)",
                      borderRadius: 12,
                      color: "var(--mokp-c-success)",
                      lineHeight: 0,
                      display: "block",
                      padding: 16,
                    }}
                  >
                    <IconMap2 size={32} stroke={1} />
                  </span>
                </div>
                <div>
                  <h3>Explorer le monde</h3>
                  <p style={{ color: "var(--mokp-card-fg-subtle)" }}>
                    Parcourez des territoires, découvrez des ressources et affrontez les dangers qui vous guettent.
                  </p>
                </div>
              </article>
              <article style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 16 }}>
                <div>
                  <span
                    style={{
                      backgroundColor: "var(--mokp-c-error-muted)",
                      border: "1px solid var(--mokp-card-divider)",
                      borderRadius: 12,
                      color: "var(--mokp-c-error)",
                      lineHeight: 0,
                      display: "block",
                      padding: 16,
                    }}
                  >
                    <IconSwords size={32} stroke={1} />
                  </span>
                </div>
                <div>
                  <h3>Alliez-vous ou combattez</h3>
                  <p style={{ color: "var(--mokp-card-fg-subtle)" }}>
                    Rejoignez une guilde, négociez avec d'autres joueurs ou imposez votre domination.
                  </p>
                </div>
              </article>
              <article style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 16 }}>
                <div>
                  <span
                    style={{
                      backgroundColor: "var(--mokp-c-express-muted)",
                      border: "1px solid var(--mokp-card-divider)",
                      borderRadius: 12,
                      color: "var(--mokp-c-express)",
                      lineHeight: 0,
                      display: "block",
                      padding: 16,
                    }}
                  >
                    <IconTrophy size={32} stroke={1} />
                  </span>
                </div>
                <div>
                  <h3>Progressez et soyez reconnu</h3>
                  <p style={{ color: "var(--mokp-card-fg-subtle)" }}>
                    Accomplissez des quêtes, gagnez des succès et grimpez dans les classements.
                  </p>
                </div>
              </article>
            </section>
            <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <article
                style={{
                  backgroundColor: "var(--mokp-card-bg-above)",
                  border: "1px solid var(--mokp-card-divider)",
                  borderRadius: "var(--mokp-radius)",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 16,
                  padding: 16,
                }}
              >
                <div>
                  <span>
                    <IconAtom2 size={32} color="var(--mokp-c-accent)" />
                  </span>
                </div>
                <div>
                  <h3 style={{ color: "var(--mokp-c-accent)" }}>Votre aventure commence ici</h3>
                  <p style={{ color: "var(--mokp-card-fg-subtle)", fontSize: "0.876rem" }}>
                    Chaque décision compte. Le futur de votre peuple dépend de vous.
                  </p>
                </div>
              </article>
            </section>
          </MokpCard>
        </MokpGrid.Col>
      </MokpGrid.Row>
    </MokpGrid>
  );
}
