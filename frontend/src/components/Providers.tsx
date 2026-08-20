import { RouterProvider } from "@/services/router";
import { TranslationProvider } from "@/services/translation";

export default function MokpProviders({ children }) {
  return (
    <>
      <>
        <RouterProvider>
          <TranslationProvider>
            <>
              <>
                {children}
              </>
            </>
          </TranslationProvider>
        </RouterProvider>
      </>
    </>
  );
}