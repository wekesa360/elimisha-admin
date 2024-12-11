// src/components/layout/root-layout.tsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Sidebar } from "./sidebar";
import { Toaster } from "react-hot-toast";
import { useTheme } from "@/lib/hooks/use-theme";

export function RootLayout({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    if (isLoaded && !isSignedIn && location.pathname !== "/") {
      navigate("/");
    }
  }, [isLoaded, isSignedIn, location, navigate]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-64 p-8">
        {children}
      </main>
      <Toaster 
        position="top-center"
        toastOptions={{
          className: 'bg-background text-foreground border border-border',
          duration: 3000,
        }}
      />
    </div>
  );
}