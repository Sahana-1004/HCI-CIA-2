import { useTheme as useThemeContext, ThemeContext } from "@/context/theme-provider";

export const useTheme = () => {
  try {
    return useThemeContext();
  } catch (e) {
    // Return default values if context is not available
    return {
      theme: "light" as const,
      setTheme: () => {}
    };
  }
};
