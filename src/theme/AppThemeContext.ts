"use client";

import {
  createContext,
} from "react";
import AppLanguage from "@/locale/AppLanguage";

export type ThemeContextType = {
  language: AppLanguage;
  setLanguage: (language: string | AppLanguage) => void;
  isRtl: boolean;
};

export  const AppThemeContext = createContext<ThemeContextType | undefined>(undefined);

