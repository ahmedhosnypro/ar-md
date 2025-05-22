"use client";

import AppLanguage from "@/locale/AppLanguage";
import { DefaultThemeMode } from "@/theme/ThemeMode";
import NextThemesProvider from "@/theme/NextThemeProvider";
import { AppThemeProvider } from "@/theme/AppThemeProvider";
import AppRouterCacheProvider from "@/theme/AppRouterCacheProvider";
import { getFromLocalStorage } from "@/utils/localstorage";

import "./globals.css";

const RootLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
  let lang = "ar";
  const storedLang = getFromLocalStorage("language", "ar");
  
  if (Object.values(AppLanguage).includes(storedLang as AppLanguage)) {
    lang = storedLang;
  }

  const dir = lang === "ar" ? "rtl" : "ltr";

  console.log("layout", { lang });

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body>
        <NextThemesProvider
          attribute="class"
          defaultTheme={DefaultThemeMode}
          enableSystem
          disableTransitionOnChange
          forcedTheme="dark"
        >
          <AppThemeProvider initialLanguage={lang}>
            <AppRouterCacheProvider>
              {children}
            </AppRouterCacheProvider>
          </AppThemeProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
};

export default RootLayout;
