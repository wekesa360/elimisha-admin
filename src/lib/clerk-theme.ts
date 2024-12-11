// src/lib/clerk-theme.ts
import { dark } from "@clerk/themes";
import { useTheme } from "@/lib/hooks/use-theme";

const colors = {
  light: {
    primary: "hsl(180, 70%, 40%)", // Our new primary teal color
    secondary: "hsl(45, 90%, 65%)", // Warm yellow
    accent: "hsl(330, 70%, 65%)", // Soft pink
    background: {
      default: "hsl(0, 0%, 95%)",
      subtle: "hsl(0, 0%, 90%)",
      muted: "hsl(0, 0%, 85%)",
    },
    foreground: "hsl(0, 0%, 13%)",
    card: "hsl(180, 75%, 97%)",
    border: "hsl(180, 30%, 70%)",
    ring: "hsl(180, 70%, 40%)",
    input: {
      background: "hsl(180, 75%, 97%)",
      border: "hsl(180, 30%, 70%)",
    },
  },
  dark: {
    primary: "hsl(180, 70%, 50%)", // Slightly brighter teal for dark mode
    secondary: "hsl(45, 90%, 65%)", // Warm yellow (same as light mode)
    accent: "hsl(330, 70%, 65%)", // Soft pink (same as light mode)
    background: {
      default: "hsl(0, 0%, 25%)", // Dark gray instead of pure black
      subtle: "hsl(0, 0%, 28%)",
      muted: "hsl(0, 0%, 22%)",
    },
    foreground: "hsl(0, 0%, 95%)",
    card: "hsl(0, 0%, 18%)",
    border: "hsl(0, 0%, 90%)",
    ring: "hsl(180, 70%, 50%)",
    input: {
      background: "hsl(0, 0%, 18%)",
      border: "hsl(0, 0%, 30%)",
    },
  },
};

export function useClerkTheme() {
  const { theme } = useTheme();
  const currentTheme = theme === "dark" ? colors.dark : colors.light;

  const baseTheme = {
    variables: {
      colorPrimary: currentTheme.primary,
      colorTextOnPrimary: theme === "dark" ? "hsl(0, 0%, 13%)" : "#FFFFFF",
      colorBackground: currentTheme.background.default,
      colorText: currentTheme.foreground,
      colorInputBackground: currentTheme.input.background,
      colorInputText: currentTheme.foreground,
      colorDanger: theme === "dark" ? "hsl(350, 80%, 55%)" : "hsl(350, 80%, 55%)",
    },
    elements: {
      // Root elements
      rootBox: `bg-[${currentTheme.background.default}]`,
      card: `bg-[${currentTheme.background.subtle}] border-[${currentTheme.border}] shadow-sm`,
      
      // Form elements
      formButtonPrimary: `bg-primary hover:bg-primary/90 text-primary-foreground`,
      formFieldInput: `bg-[${currentTheme.input.background}] border-[${currentTheme.border}]`,
      formFieldLabel: `text-[${currentTheme.foreground}]`,
      
      // Header elements
      headerTitle: `text-[${currentTheme.foreground}] text-xl font-semibold`,
      headerSubtitle: `text-[${currentTheme.foreground}/80]`,
      
      // Footer elements
      footerActionLink: "text-primary hover:text-primary/90",
      footerActionText: `text-[${currentTheme.foreground}/60]`,
      
      // Social buttons
      socialButtonsIconButton: `bg-[${currentTheme.background.muted}] border-[${currentTheme.border}] hover:bg-[${currentTheme.background.subtle}]`,
      socialButtonsBlockButton: `bg-[${currentTheme.background.muted}] border-[${currentTheme.border}] hover:bg-[${currentTheme.background.subtle}]`,
      
      // Divider
      dividerLine: `bg-[${currentTheme.border}]`,
      dividerText: `text-[${currentTheme.foreground}/60]`,
      
      // Alerts and messages
      alert: `bg-[${currentTheme.background.muted}] border-[${currentTheme.border}]`,
      alertText: `text-[${currentTheme.foreground}]`,
      
      // Other elements
      navbar: `bg-[${currentTheme.background.subtle}]`,
      avatarBox: `bg-[${currentTheme.background.muted}]`,
      avatarImageBox: `border-[${currentTheme.border}]`,
    },
  };

  return {
    ...baseTheme,
    baseTheme: theme === "dark" ? dark : undefined
  };
}