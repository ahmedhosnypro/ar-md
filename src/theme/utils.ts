"use client";

import { jssPreset } from "@mui/styles";
import rtl from "jss-rtl";
import { create } from "jss";
import AppLanguage from "@/locale/AppLanguage";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localstorage";


declare global {
  interface Window {
    __INITIAL_LANGUAGE__?: string;
    __INITIAL_THEME__?: string;
  }
}


// Create rtl cache
export  const cacheRtl = createCache({
  key: "rtl-cache",
  stylisPlugins: [prefixer, rtlPlugin],
});

export  const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

// Utility functions
export const updateLanguage = (language: string): void => {
  if (Object.values(AppLanguage).includes(language as AppLanguage)) {
    saveToLocalStorage("language", language);
    document.documentElement.lang = language;
    document.body.dir = language === "ar" ? "rtl" : "ltr";
  }
};

export const getStoredLanguage = (): string => {
  if (typeof window !== "undefined") {
    // First try localStorage
    const savedLanguage = getFromLocalStorage("language", null);
    if (
      savedLanguage &&
      Object.values(AppLanguage).includes(savedLanguage as AppLanguage)
    ) {
      return savedLanguage;
    }
    // Then try window.__INITIAL_LANGUAGE__
    if (window.__INITIAL_LANGUAGE__) {
      return window.__INITIAL_LANGUAGE__;
    }
  }
  // Default to ar if nothing else is found
  return AppLanguage.default;
};