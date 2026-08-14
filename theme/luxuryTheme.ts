import { DefaultTheme } from "react-native-paper";

export const luxuryTheme = {
    ...DefaultTheme,
    roundness: 4,
    colors: {
        ...DefaultTheme.colors,
        primary: "#D4AF37",       // Gold accent
        accent: "#D4AF37",
        background: "#1e1e1e",      // Dark background
        surface: "#2e2e2e",         // Card background
        text: "#D4AF37",            // Gold text
        error: "#ff0000",
    },
    fonts: {
        ...DefaultTheme.fonts,
        regular: { fontFamily: "serif", fontWeight: "normal" },
        medium: { fontFamily: "serif", fontWeight: "500" },
        light: { fontFamily: "serif", fontWeight: "300" },
        thin: { fontFamily: "serif", fontWeight: "100" },
    },
};