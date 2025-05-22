"use client";

import {
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import {
  Theme,
  Experimental_CssVarsProvider as CssVarsProvider,
} from "@mui/material/styles";
import { Box, CircularProgress, CssBaseline, Typography } from "@mui/material";
import { rtlDarkTheme, ltrDarkTheme } from "@/theme";
import { StylesProvider } from "@mui/styles";
import AppLanguage from "@/locale/AppLanguage";
import { CacheProvider } from "@emotion/react";
import { cacheRtl, getStoredLanguage, jss, updateLanguage } from "./utils";
import { AppThemeContext, ThemeContextType } from "./AppThemeContext";

type AppThemeProviderProps = {
  children: ReactNode;
  initialLanguage?: string;
};

export const AppThemeProvider: React.FC<AppThemeProviderProps> = ({
  children,
  initialLanguage = "ar",
}) => {
  const [isThemeReady, setIsThemeReady] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<AppLanguage>(
    getStoredLanguage() as AppLanguage
  );

  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const isRtl = initialLanguage === "ar";
    return isRtl ? rtlDarkTheme : ltrDarkTheme;
  });

  // Initialize theme based on language
  useEffect(() => {
    const isRtl = currentLanguage === "ar";
    setCurrentTheme(isRtl ? rtlDarkTheme : ltrDarkTheme);
    setIsThemeReady(true);
  }, [currentLanguage]);

  const handleSetLanguage = useCallback(
    (newLanguage: string | AppLanguage) => {
      const language = newLanguage as AppLanguage;
      updateLanguage(language);
      setCurrentLanguage(language);
      const isRtl = language === "ar";
      setCurrentTheme(isRtl ? rtlDarkTheme : ltrDarkTheme);
    },
    []
  );

  const isRtl = useMemo(() => currentLanguage === "ar", [currentLanguage]);

  const contextValue = useMemo(
    () => ({
      language: currentLanguage,
      setLanguage: handleSetLanguage,
      isRtl,
    }),
    [currentLanguage, handleSetLanguage, isRtl,]
  );

  if (!isThemeReady) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <CircularProgress size={20} />
        <Typography variant="caption">::...Loading</Typography>
      </Box>
    );
  }

  return (
    <AppThemeContext.Provider value={contextValue}>
      <StylesProvider jss={jss}>
        <CacheProvider value={cacheRtl}>
          <CssVarsProvider theme={currentTheme}>
            <CssBaseline enableColorScheme />
            {children}
          </CssVarsProvider>
        </CacheProvider>
      </StylesProvider>
    </AppThemeContext.Provider>
  );
};

export const useAppTheme = (): ThemeContextType => {
  const context = useContext(AppThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used within a ThemeProvider");
  }
  return context;
};
