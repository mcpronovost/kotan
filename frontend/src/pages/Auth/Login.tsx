import "@/assets/styles/page/login.scss";
import { useState } from "react";
import {
  IconUser,
  IconUsersGroup,
  IconLock,
  IconTower,
  IconCompass,
  IconHeartHandshake,
  IconSwords,
  IconTrophy,
  IconAtom2,
  IconUserPlus,
  IconLogin2,
} from "@tabler/icons-react";
import { api } from "@/services/api";
import { useAuth } from "@/services/auth";
import { useRouter } from "@/services/router";
import { useTranslation } from "@/services/translation";
import { MokpButton, MokpCard, MokpDivider, MokpForm, MokpGrid, MokpLink } from "@/components/ui";
import ImgBg from "@/assets/img/auth/login_bg.webp";

const WHATTODO = [
  {
    title: "Your world awaits you",
    content: "Manage your settlement, your resources and your people with ease",
    colour: "accent",
    Icon: IconTower,
  },
  {
    title: "Every decision matters",
    content: "Your choices shape the future of your people",
    colour: "success",
    Icon: IconCompass,
  },
  {
    title: "Join a community",
    content: "Collaborate, exchange, and build lasting alliances",
    colour: "danger",
    Icon: IconUsersGroup,
  },
];

export default function MokpAuthLogin() {
  const { n } = useRouter();
  const { t, tNode } = useTranslation();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const [hasError, setHasError] = useState(null);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.type === "checkbox" ? checked : value,
    }));

    /* Clear field-specific error when user starts typing */
    if (hasError?.fields?.[name]) {
      setHasError((prev) => ({
        ...prev,
        fields: {
          ...prev.fields,
          [name]: "",
        },
      }));
    }
  };

  const handleSubmit = async () => {
    setIsLoadingSubmit(true);
    setHasError(null);
    try {
      const r = await api.post("/auth/login/", formData);

      if (!r.ok) {
        console.warn(r);
        setHasError(r);
        return;
      }

      // navigate to login page on registration success
      n("login");
    } catch (e) {
      console.warn(e);

      setHasError({
        message: t("An error occurred"),
      });
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  return (
    <div
      className="mokp-page-login"
      style={{
        backgroundImage: `url("${ImgBg}")`,
      }}
    >
      <MokpGrid style={{ maxWidth: 1024 }}>
        <MokpGrid.Row>
          <MokpGrid.Col col="50" style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
            <section style={{ margin: "0 0 32px" }}>
              <IconAtom2 size={64} color="var(--mokp-c-accent)" />
              <h2 style={{ fontSize: "1.6rem" }}>{t("Great to see you again")}</h2>
              <p style={{ color: "var(--mokp-card-fg-subtle)" }}>{t("Log in and continue your adventure")}</p>
            </section>
            <section style={{ display: "flex", flexDirection: "column", gap: 32, paddingBottom: 48 }}>
              {WHATTODO.map((w, i) => (
                <article
                  key={i}
                  style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 16, maxWidth: 332 }}
                >
                  <div>
                    <span
                      style={{
                        background: "var(--mokp-card-bg)",
                        border: `1px solid var(--mokp-card-divider)`,
                        borderRadius: 12,
                        color: `var(--mokp-c-accent)`,
                        lineHeight: 0,
                        display: "block",
                        padding: 12,
                      }}
                    >
                      <w.Icon size={32} stroke={1.2} />
                    </span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1rem" }}>{t(w.title)}</h3>
                    <p style={{ color: "var(--mokp-card-fg-subtle)", fontSize: "0.876rem" }}>{t(w.content)}</p>
                  </div>
                </article>
              ))}
            </section>
          </MokpGrid.Col>
          <MokpGrid.Col col="50">
            <MokpCard>
              <h1 style={{ fontSize: "1.6rem" }}>{t("Login")}</h1>
              <p style={{ color: "var(--mokp-card-fg-subtle)", margin: "0 0 24px" }}>
                {t("Sign in to access your account")}
              </p>
              <MokpDivider label={<IconAtom2 size={15} color="var(--mokp-c-accent)" />} />
              <section>
                <MokpForm onSubmit={handleSubmit} loading={isLoadingSubmit}>
                  <MokpForm.Field
                    name="username"
                    label={t("Username")}
                    placeholder={t("Enter your username")}
                    value={formData.username}
                    error={hasError?.fields?.["username"]}
                    icon={IconUser}
                    onChange={handleChange}
                  />
                  <MokpForm.Field
                    type="password"
                    name="password"
                    label={t("Password")}
                    placeholder={t("Enter your password")}
                    value={formData.password}
                    error={hasError?.fields?.["password"]}
                    icon={IconLock}
                    onChange={handleChange}
                  />
                  {hasError?.message && (
                    <MokpForm.Alert errorTitle={t("An error occurred")} error={t(hasError?.message)} />
                  )}
                  <div>
                    <MokpButton
                      type="submit"
                      label={t("Log in")}
                      variant="accent"
                      prependIcon={IconLogin2}
                      loading={isLoadingSubmit}
                      block
                    />
                    <MokpDivider label={t("or")} />
                    <MokpButton label={t("Create an account")} route="register" prependIcon={IconUserPlus} block />
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
        </MokpGrid.Row>
      </MokpGrid>
    </div>
  );
}
