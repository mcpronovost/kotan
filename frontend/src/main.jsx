import "@/assets/styles/main.scss";
import { StrictMode, Suspense, createElement } from "react";
import { createRoot } from "react-dom/client";

import { useRouter } from "@/services/router";
import { useTranslation } from "@/services/translation";

import MokpProviders from "@/components/Providers";
import MokpCoreHeader from "@/components/core/Header";
import MokpCoreLoading from "@/components/core/Loading";
import { MokpCard, MokpLink } from "@/components/ui";

function MokpApp() {
  const { route, params } = useRouter();
  const { t } = useTranslation();

  return (
    <>
      <MokpCoreHeader />
      <main className="mokp-core-main">
        {route && route.component ? (
          <Suspense fallback={<MokpCoreLoading />}>{createElement(route.component)}</Suspense>
        ) : (
          <MokpCoreLoading />
        )}
      </main>
      <footer className="mokp-core-footer">
        &copy;&nbsp;2026 Kotan &nbsp;|&nbsp; <MokpLink route="termsofuse">{t("Terms of Use")}</MokpLink> &nbsp;|&nbsp; <MokpLink route="privacypolicy">{t("Privacy Policy")}</MokpLink>
      </footer>
    </>
  );
}

function Root() {
  return (
    <StrictMode>
      <MokpProviders>
        <MokpApp />
      </MokpProviders>
    </StrictMode>
  );
}

const mokpRoot = document.getElementById("kotan");
if (mokpRoot) {
  createRoot(mokpRoot).render(<Root />);
}
