import { IconLock, IconTower, IconMap2, IconSwords, IconTrophy, IconAtom2 } from "@tabler/icons-react";
import { useTranslation } from "@/services/translation";
import { MokpCard, MokpForm, MokpGrid } from "@/components/ui";
import ImgBg from "@/assets/img/bg.webp";

const WHATTODO = [
  {
    title: "Bâtissez votre colonie",
    content: "Développez votre colonie, améliorez vos bâtiments et assurez la survie de votre peuple.",
    colour: "accent",
    Icon: IconTower,
  },
  {
    title: "Explorez le monde",
    content: "Parcourez des territoires, découvrez des ressources et affrontez les dangers qui vous guettent.",
    colour: "success",
    Icon: IconMap2,
  },
  {
    title: "Alliez-vous ou combattez",
    content: "Rejoignez une guilde, négociez avec d'autres joueurs ou imposez votre domination.",
    colour: "error",
    Icon: IconSwords,
  },
  {
    title: "Progressez et soyez reconnu",
    content: "Accomplissez des quêtes, gagnez des succès et grimpez dans les classements.",
    colour: "express",
    Icon: IconTrophy,
  },
];

export default function MokpAuthRegister() {
  const { t } = useTranslation();

  return (
    <MokpGrid style={{ maxWidth: 1200 }}>
      <MokpGrid.Row>
        <MokpGrid.Col col="55">
          <MokpCard style={{ height: "100%" }}>
            <h1>Créer un compte</h1>
            <p style={{ color: "var(--mokp-card-fg-subtle)" }}>Rejoignez Kotan et bâtissez votre colonie.</p>
            <section>
              <MokpForm>
                <MokpForm.Field
                  name="username"
                  label={t("Username")}
                  helptext={t("Between 3 and 16 characters.")}
                  icon={IconAtom2}
                  required
                />
                <MokpForm.Field
                  type="email"
                  name="email"
                  label={t("Email")}
                  helptext={t("We'll never share your email.")}
                  icon={IconSwords}
                  required
                />
                <MokpForm.Field
                  type="password"
                  name="password"
                  label={t("Password")}
                  helptext={t("Atleast 8 characters.")}
                  icon={IconLock}
                  required
                />
                <MokpForm.Field
                  type="password"
                  name="password"
                  label={t("Confirm Password")}
                  icon={IconLock}
                  required
                />
                <MokpForm.Field
                  name="name"
                  label={t("Name")}
                  helptext={t("Public name.")}
                  icon={IconAtom2}
                  required
                />
              </MokpForm>
            </section>
          </MokpCard>
        </MokpGrid.Col>
        <MokpGrid.Col col="45">
          <MokpCard
            style={{
              backgroundImage: `url("${ImgBg}")`,
              backgroundPosition: "bottom center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              height: "100%",
              padding: "48px",
            }}
          >
            <h2 style={{ color: "var(--mokp-c-accent)" }}>Bienvenue dans Kotan</h2>
            <p style={{ color: "var(--mokp-card-fg-subtle)" }}>
              Un monde à explorer, des ressources à gérer et une colonie à faire prospérer.
            </p>
            <hr style={{ margin: "16px 0" }} />
            <section style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 32 }}>
              {WHATTODO.map((todo, i) => (
                <article key={i} style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 16 }}>
                  <div>
                    <span
                      style={{
                        background: `linear-gradient(to bottom, var(--mokp-c-${todo.colour}-faint), transparent)`,
                        border: `1px solid var(--mokp-c-${todo.colour}-muted)`,
                        borderRadius: 12,
                        color: `var(--mokp-c-${todo.colour})`,
                        lineHeight: 0,
                        display: "block",
                        padding: 12,
                      }}
                    >
                      <todo.Icon size={36} stroke={1} />
                    </span>
                  </div>
                  <div>
                    <h3>{todo.title}</h3>
                    <p style={{ color: "var(--mokp-card-fg-subtle)", fontSize: "0.876rem" }}>{todo.content}</p>
                  </div>
                </article>
              ))}
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
                    <IconAtom2 size={40} color="var(--mokp-c-accent-subtle)" />
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
