import { AuthProvider } from "@/services/auth";
import { RouterProvider } from "@/services/router";
import { TranslationProvider } from "@/services/translation";

export default function MokpProviders({ children }) {
  return (
    <>
      <AuthProvider>
        <RouterProvider>
          <TranslationProvider>
            <>
              <>
                {children}
              </>
            </>
          </TranslationProvider>
        </RouterProvider>
      </AuthProvider>
    </>
  );
}