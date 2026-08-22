import { useState } from "react";
import {
  IconUser,
  IconMail,
  IconLock,
  IconUserCircle,
  IconTower,
  IconCompass,
  IconHeartHandshake,
  IconSwords,
  IconTrophy,
  IconAtom2,
  IconUserPlus,
  IconLogin2,
} from "@tabler/icons-react";
import { useTranslation } from "@/services/translation";
import { MokpButton, MokpCard, MokpDivider, MokpForm, MokpGrid, MokpLink } from "@/components/ui";
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
    Icon: IconCompass,
  },
  {
    title: "Combattez les menaces",
    content: "Défendez votre peuple ou imposez votre domination.",
    colour: "danger",
    Icon: IconSwords,
  },
  {
    title: "Alliez-vous aux autres",
    content: "Rejoignez une guilde, négociez avec d'autres joueurs et augmentez votre influence.",
    colour: "info",
    Icon: IconHeartHandshake,
  },
  {
    title: "Progressez et soyez reconnu",
    content: "Accomplissez des quêtes, gagnez des succès et grimpez dans le classement.",
    colour: "express",
    Icon: IconTrophy,
  },
];

export default function MokpAuthRegister() {
  const { t, tNode } = useTranslation();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password_confirm: "",
    email: "",
    playername: "",
    terms_accepted: false,
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.type === "checkbox" ? checked : value,
    }));

    /* Clear field-specific error when user starts typing
    if (hasError?.fields?.[name]) {
      setHasError((prev) => ({
        ...prev,
        fields: {
          ...prev.fields,
          [name]: "",
        },
      }));
    }*/
  };

  return (
    <MokpGrid style={{ maxWidth: 1200 }}>
      <MokpGrid.Row>
        <MokpGrid.Col col="55">
          <MokpCard style={{ height: "100%" }}>
            <h1 style={{ fontSize: "1.6rem" }}>{t("Create an account")}</h1>
            <p style={{ color: "var(--mokp-card-fg-subtle)", margin: "0 0 24px" }}>
              {t("Join Kotan and build your settlement")}
            </p>
            <section>
              <MokpForm>
                <MokpForm.Field
                  name="username"
                  label={t("Username")}
                  value={formData.username}
                  helptext={t("Between 3 and 16 characters — letters, numbers and _ only")}
                  icon={IconUser}
                  onChange={handleChange}
                />
                <MokpForm.Field
                  type="password"
                  name="password"
                  label={t("Password")}
                  value={formData.password}
                  helplist={[
                    { label: t("At least 8 characters"), test: (v) => v.length >= 8 },
                    { label: t("One uppercase letter"), test: (v) => /[A-Z]/.test(v) },
                    { label: t("One lowercase letter"), test: (v) => /[a-z]/.test(v) },
                    { label: t("One number"), test: (v) => /[0-9]/.test(v) },
                    { label: t("One special character"), test: (v) => /[^A-Za-z0-9]/.test(v) },
                  ]}
                  icon={IconLock}
                  onChange={handleChange}
                />
                <MokpForm.Field
                  type="password"
                  name="password_confirm"
                  label={t("Confirm Password")}
                  value={formData.password_confirm}
                  helptext={t("Re-enter your password")}
                  icon={IconLock}
                  onChange={handleChange}
                />
                <MokpForm.Field
                  type="email"
                  name="email"
                  label={t("Email")}
                  value={formData.email}
                  helptext={t("For account recovery — will never be shared")}
                  icon={IconMail}
                  onChange={handleChange}
                />
                <MokpForm.Field
                  name="playername"
                  label={t("Playername")}
                  value={formData.playername}
                  helptext={t("This is your public display name — you can update it later")}
                  icon={IconUserCircle}
                  onChange={handleChange}
                />
                <MokpForm.Field
                  type="checkbox"
                  name="terms_accepted"
                  label={t("Terms of Uses and Privacy Policy")}
                  value={formData.terms_accepted}
                  hideLabel
                  onChange={handleChange}
                >
                  {tNode(
                    "I confirm that I am 13 years of age or older and have read, consent and agree to Kotan's {termsLink} and {privacyLink}",
                    undefined,
                    {
                      termsLink: <MokpLink route="terms">{t("Terms of Use")}</MokpLink>,
                      privacyLink: <MokpLink route="privacy">{t("Privacy Policy")}</MokpLink>,
                    },
                  )}
                </MokpForm.Field>
                <div>
                  <MokpButton
                    label={t("Create an account")}
                    variant="accent"
                    prependIcon={IconUserPlus}
                    disabled
                    block
                  />
                  <MokpDivider label={t("or")} />
                  <MokpButton label={t("I already have an account")} prependIcon={IconLogin2} block />
                </div>
                <div>
                  <p
                    style={{
                      color: "var(--mokp-card-fg-muted)",
                      fontFamily: "Barlow, sans-serif",
                      fontSize: "0.75rem",
                    }}
                  >
                    {t("Your settlers are already waiting. Let's get started.")}
                  </p>
                </div>
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
              padding: "40px",
            }}
          >
            <h2 style={{ color: "var(--mokp-c-accent)" }}>Bienvenue dans Kotan</h2>
            <p style={{ color: "var(--mokp-card-fg-subtle)" }}>
              Un monde à explorer, des ressources à gérer et une colonie à faire prospérer.
            </p>
            <MokpDivider style={{ margin: "24px 0" }} />
            <section style={{ display: "flex", flexDirection: "column", gap: 32, marginBottom: 48 }}>
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
                    <h3 style={{ fontSize: "1rem" }}>{todo.title}</h3>
                    <p style={{ color: "var(--mokp-card-fg-subtle)", fontSize: "0.876rem" }}>{todo.content}</p>
                  </div>
                </article>
              ))}
            </section>
            <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <article
                style={{
                  background: `linear-gradient(to bottom, var(--mokp-card-bg-above), transparent)`,
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
                  <h3 style={{ color: "var(--mokp-c-accent)" }}>{t("Your journey starts now")}</h3>
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
