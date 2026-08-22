import { useEffect } from "react";
import { useRouter } from "@/services/router";
import { useTranslation } from "@/services/translation";
import { MokpAlert, MokpCard, MokpGrid, MokpHeading } from "@/components/ui";

const terms = [
  {
    title: "Acceptance of Terms",
    content: "Acceptance of Terms content",
  },
  {
    title: "User Accounts and Security",
    content: "User Accounts and Security content",
  },
  {
    title: "Fair Play and Acceptable Use",
    content: "Fair Play and Acceptable Use content",
  },
  {
    title: "Intellectual Property Rights",
    content: "Intellectual Property Rights content",
  },
  {
    title: "User-Generated Content and Communication",
    content: "User-Generated Content and Communication content",
  },
  {
    title: "Data Privacy",
    content: "Data Privacy content",
  },
  {
    title: "Limitation of Liability",
    content: "Limitation of Liability content",
  },
];

export default function MokpLegalTermsOfUse() {
  const { routeTitle } = useRouter();
  const { t, tNode } = useTranslation();

  useEffect(() => {
    routeTitle(t("Terms of Use"));

    return () => routeTitle();
  }, []);

  return (
    <MokpGrid style={{ maxWidth: 1024 }}>
      <MokpGrid.Row wrap>
        <MokpGrid.Col>
          <MokpHeading title={t("Terms of Use")} />
          <MokpAlert
            variant="danger"
            message={t("PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY BEFORE USING THIS SITE")}
          />
        </MokpGrid.Col>
        {terms.map((term, i) => (
          <MokpGrid.Col key={i}>
            <MokpCard>
              <h2 style={{ marginBottom: 8 }}>{t(term.title)}</h2>
              <p
                style={{ color: "var(--mokp-card-fg-subtle)", fontSize: "1rem", lineHeight: 1.6, textAlign: "justify" }}
              >
                {tNode(term.content)}
              </p>
            </MokpCard>
          </MokpGrid.Col>
        ))}
      </MokpGrid.Row>
    </MokpGrid>
  );
}
