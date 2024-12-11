import { UserButton } from "@clerk/clerk-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="h-16 border-b border-border px-6 flex items-center justify-between bg-background">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-foreground">Admin Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {/* <Button variant="ghost" size="icon" className="text-foreground hover:text-foreground-subtle hover:bg-background-subtle">
          <Bell className="h-5 w-5" />
        </Button> */}
        <UserButton 
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-8 w-8",
              rootBox: "h-8",
              userButton: "text-foreground hover:text-foreground-subtle",
              userButtonPopover: "bg-background border border-border shadow-md",
              userButtonPopoverHeader: "bg-background-subtle border-b border-border",
              userButtonPopoverHeaderTitle: "text-foreground font-semibold",
              userButtonPopoverContent: "text-foreground-subtle dark:text-foreground",
              userButtonPopoverHeaderSubtitle: "text-foreground-subtle dark:text-foreground-subtle",
              userPreviewMainIdentifier: "text-foreground-subtle dark:text-foreground",
              userPreviewSecondaryIdentifier: "text-foreground-subtle",
              userPreviewTextContainer: "gap-0.5",
              userButtonPopoverCard: "bg-background border border-border shadow-md",
              userButtonPopoverActions: "text-foreground dark:text-foreground-subtle",
              userButtonPopoverActionButtonText: "text-foreground dark:text-foreground-subtle",
              userButtonPopoverActionButton: "text-foreground hover:text-foreground-subtle dark:text-foreground-subtle hover:bg-background-muted dark:hover:bg-background-subtle dark:hover:text-foreground",
              userButtonPopoverFooter: "hidden",
              pageScrollBox : "bg-background border",
              clerkBranding: "hidden",
            },
          }}
        />
      </div>
    </header>
  );
}