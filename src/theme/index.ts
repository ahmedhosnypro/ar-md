import {
  BreakpointsOptions,
  PaletteOptions,
  Theme,
  ThemeOptions,
} from "@mui/material/styles";
import { createTheme, PaletteMode } from "@mui/material";
import ThemeMode from "./ThemeMode";

declare module "@mui/material/styles" {
  interface Palette {
    onPrimary: string;
    onSecondary: string;
    onBackground: string;
  }

  interface PaletteOptions {
    onPrimary?: string;
    onSecondary?: string;
    onBackground?: string;
  }
}

const lightPalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#1976d2",
  },
  secondary: {
    main: "#dc004e",
  },
  background: {
    default: "#f5f5f5",
    paper: "#ffffff",
  },
  divider: "rgba(0, 0, 0, 0.12)",
  onPrimary: "rgba(255, 255, 255, 1)",
  onSecondary: "rgba(0, 0, 0, 1)",
  onBackground: "rgba(0, 0, 0, 1)",
};

const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: "#90caf9",
  },
  secondary: {
    main: "#f48fb1",
  },
  background: {
    default: "#121212",
    paper: "#1e1e1e",
  },
  divider: "rgba(255, 255, 255, 0.12)",
  onPrimary: "rgba(255, 255, 255, 1)",
  onSecondary: "rgba(0, 0, 0, 1)",
  onBackground: "rgba(255, 255, 255, 1)",
};

const breakpoints: BreakpointsOptions = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};

const getThemeConfig = (
  mode: PaletteMode,
  direction: "rtl" | "ltr"
): ThemeOptions => ({
  direction,
  palette: {
    mode,
    ...(mode === "light" ? lightPalette : darkPalette),
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow:
            mode === "light"
              ? "0 1px 3px rgba(0,0,0,0.12)"
              : "0 1px 3px rgba(255,255,255,0.12)",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active":
          {
            transitionDelay: "5000s",
          },

        "*::-webkit-scrollbar": {
          width: "8px",
          backgroundColor: "transparent",
        },
        "*::-webkit-scrollbar-track": {
          background:
            mode === "dark"
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.05)",
          borderRadius: "8px",
          margin: "8px 0",
        },
        "*::-webkit-scrollbar-thumb": {
          background:
            mode === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
          borderRadius: "8px",
          border:
            mode === "dark"
              ? "2px solid rgba(30, 30, 30, 0.9)"
              : "2px solid rgba(255, 255, 255, 0.9)",
        },
        "*::-webkit-scrollbar-thumb:hover": {
          background:
            mode === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)",
        },
        "*": {
          scrollbarWidth: "thin",
          scrollbarColor:
            mode === "dark"
              ? "rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.05)",
        },
      },
    },
  },
});

export const createAppTheme = (
  mode: ThemeMode,
  direction: "rtl" | "ltr"
): Theme => {
  return createTheme(
    {
      ...getThemeConfig(mode as PaletteMode, direction),
      colorSchemes: { light: true, dark: true },
      breakpoints: breakpoints,
      cssVariables: true,
    }
  );
};

export const rtlLightTheme = createAppTheme(ThemeMode.Light, "rtl");

export const rtlDarkTheme = createAppTheme(ThemeMode.Dark, "rtl");

export const ltrLightTheme = createAppTheme(ThemeMode.Light, "ltr");

export const ltrDarkTheme = createAppTheme(ThemeMode.Dark, "ltr");
