import "@/assets/styles/main.scss";
import { StrictMode, Suspense, createElement } from "react";
import { createRoot } from "react-dom/client";

import { useRouter } from "@/services/router";

import MokpProviders from "@/components/Providers";
import MokpCoreHeader from "@/components/core/Header";
import MokpCoreLoading from "@/components/core/Loading";
import { MokpCard } from "@/components/ui";

function MokpApp() {
  const { route, params } = useRouter();

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
        Kotan&nbsp;&copy;&nbsp;2026 M-C Pronovost
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
