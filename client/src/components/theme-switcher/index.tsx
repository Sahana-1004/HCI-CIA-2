import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Laptop } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  return (
    <Button
      onClick={cycleTheme}
      variant="ghost" 
      size="icon"
      className="rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {theme === "light" ? (
        <Sun className="h-5 w-5" />
      ) : theme === "dark" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Laptop className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}