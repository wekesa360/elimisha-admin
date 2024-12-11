import { ClerkProvider as BaseClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { useTheme } from "@/lib/hooks/use-theme";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  if (!publishableKey) {
    throw new Error("Missing publishable key");
  }

  const lightColors = {
    primary: "rgb(125, 211, 252)",
    primaryLight: "rgb(186, 230, 253)",
    primaryDark: "rgb(3, 105, 161)",
    background: "rgb(255, 255, 255)",
    foreground: "rgb(15, 23, 42)",
    foregroundMuted: "rgb(100, 116, 139)",
  };

  const darkColors = {
    primary: "rgb(56, 189, 248)",
    primaryLight: "rgb(125, 211, 252)",
    primaryDark: "rgb(3, 105, 161)",
    background: "rgb(15, 23, 42)",
    foreground: "rgb(241, 245, 249)",
    foregroundMuted: "rgb(148, 163, 184)",
  };

  const colors = theme === "dark" ? darkColors : lightColors;

  return (
    <BaseClerkProvider
      publishableKey={publishableKey}
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        variables: {
          colorPrimary: colors.primary,
          colorTextOnPrimaryBackground: colors.background,
          colorBackground: colors.background,
          colorInputBackground: colors.background,
          colorInputText: colors.foreground,
          colorText: colors.foreground,
        },
        elements: {
          formButtonPrimary: 
            `bg-[${colors.primary}] text-[${colors.background}] hover:bg-[${colors.primaryDark}]`,
          card: `bg-[${colors.background}]`,
          headerTitle: `text-[${colors.foreground}]`,
          headerSubtitle: `text-[${colors.foregroundMuted}]`,
          socialButtonsBlockButton:
            `bg-[${colors.background}] border-[${colors.foregroundMuted}] text-[${colors.foreground}] hover:bg-[${colors.primaryLight}]`,
          socialButtonsBlockButtonText: `text-[${colors.foreground}] font-medium`,
          dividerLine: `bg-[${colors.foregroundMuted}]`,
          dividerText: `text-[${colors.foregroundMuted}]`,
          formField: `text-[${colors.foreground}]`,
          formFieldLabel: `text-[${colors.foregroundMuted}]`,
          formFieldInput:
            `bg-[${colors.background}] border-[${colors.foregroundMuted}] text-[${colors.foreground}] focus:border-[${colors.primary}]`,
          footerActionLink: `text-[${colors.primary}] hover:text-[${colors.primaryDark}]`,
          footerActionText: `text-[${colors.foregroundMuted}]`,
          userPreviewMainIdentifier: `text-[${colors.foreground}]`,
          userPreviewSecondaryIdentifier: `text-[${colors.foregroundMuted}]`,
          userButtonPopoverCard: `bg-[${colors.background}] border-[${colors.foregroundMuted}] shadow-md`,
          userButtonPopoverActions: `bg-[${colors.primaryLight}]`,
          userButtonPopoverActionButton:
            `text-[${colors.foreground}] hover:text-[${colors.primary}] hover:bg-[${colors.primaryLight}]`,
          userButtonPopoverActionButtonIcon: `text-[${colors.foregroundMuted}]`,
          userButtonPopoverActionButtonText: `text-[${colors.foreground}]`,
          userButtonPopoverFooter: "hidden",
        },
        layout: {
          socialButtonsIconButton: "w-8 h-8",
          socialButtonsBlockButton: "flex-1",
          userButtonBox: "w-10 h-10",
        },
      }}
    >
      {children}
    </BaseClerkProvider>
  );
}