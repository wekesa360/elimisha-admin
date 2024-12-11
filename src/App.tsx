import { useState, useEffect } from 'react';
import { ClerkProvider, SignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { useClerkTheme } from '@/lib/clerk-theme';
import { ThemeProvider } from '@/components/theme-provider';
import AdminDashboard from './components/AdminDashboard';


if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key');
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function App() {
  const clerkTheme = useClerkTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeProvider>
      <ClerkProvider
        publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
        appearance={clerkTheme}
      >
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <SignedOut>
              <div className="min-h-screen flex items-center justify-center bg-background">
                <SignIn 
                  appearance={{
                    basTheme: clerkTheme,
                  }}
                />
              </div>
            </SignedOut>
            <SignedIn>
              <AdminDashboard />
            </SignedIn>
            <Toaster 
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: 'hsl(var(--background))',
                  color: 'hsl(var(--foreground))',
                  border: '1px solid hsl(var(--border))',
                },
              }}
            />
          </BrowserRouter>
        </QueryClientProvider>
      </ClerkProvider>
    </ThemeProvider>
  );
}