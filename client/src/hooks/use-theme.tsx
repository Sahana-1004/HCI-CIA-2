import { useTheme as useThemeContext } from "@/context/theme-provider";

export const useTheme = () => {
  return useThemeContext();
};
