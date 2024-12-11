import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navigation } from '@/config/navigation';
import { ChevronLeft, ChevronRight, Menu, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useGlobalStore } from '@/lib/store';
import { useMediaQuery } from '@/lib/hooks/use-media-query';
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../theme-provider';
import LogoDark from '@/img/logo-dark.png';
import LogoLight from '@/img/logo-light.png';

export function Sidebar() {
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { sidebarOpen, setSidebarOpen } = useGlobalStore();
  const { theme } = useTheme();

  const handleSignOut = () => {
    signOut(() => navigate("/"));
  };
  
  // check theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile, setSidebarOpen]);

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupName)
        ? prev.filter(name => name !== groupName)
        : [...prev, groupName]
    );
  };

  return (
    <>
      {isMobile && !sidebarOpen && (
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      )}

      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-background border-r border-border transition-all duration-300 ease-in-out",
          sidebarOpen ? "w-64" : "w-20",
          isMobile && !sidebarOpen && "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          {sidebarOpen ? (
            <Link to="/" className="flex items-center space-x-2">
              
              <img src={theme === 'light' ? LogoDark : LogoLight } alt="Logo" className="h-16 w-60 my-2 " />
            </Link>
          ) : (
            <div className="w-8 h-8" /> // Placeholder for spacing
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex text-foreground hover:text-foreground-subtle"
          >
            {sidebarOpen ? 
              <ChevronLeft className="h-4 w-4" /> : 
              <ChevronRight className="h-4 w-4" />
            }
          </Button>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="text-foreground hover:text-foreground-subtle"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex flex-col justify-between h-[calc(100%-4rem)]">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = item.href === location.pathname;
              const isExpanded = expandedGroups.includes(item.name);

              if (item.children) {
                return (
                  <div key={item.name}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-between text-foreground hover:text-foreground-subtle hover:bg-background-subtle",
                        !sidebarOpen && "px-2",
                        isExpanded && "bg-background-subtle"
                      )}
                      onClick={() => sidebarOpen && toggleGroup(item.name)}
                    >
                      <div className="flex items-center">
                        <item.icon className="h-4 w-4 mr-3" />
                        {sidebarOpen && <span>{item.name}</span>}
                      </div>
                      {sidebarOpen && (
                        <ChevronLeft className={cn(
                          "h-4 w-4 transition-transform",
                          isExpanded && "rotate-180"
                        )} />
                      )}
                    </Button>
                    {sidebarOpen && isExpanded && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className={cn(
                              "flex items-center px-4 py-2 text-sm rounded-md text-foreground hover:text-foreground-subtle hover:bg-background-subtle",
                              child.href === location.pathname && "bg-background-subtle text-primary"
                            )}
                          >
                            <child.icon className="h-4 w-4 mr-3" />
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center rounded-md text-foreground hover:text-foreground-subtle hover:bg-background-subtle",
                    !sidebarOpen ? "px-2 py-2 justify-center" : "px-4 py-2",
                    isActive && "bg-background-subtle text-primary"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {sidebarOpen && <span className="ml-3">{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          <div className={cn(
            "p-4 border-t border-border",
            !sidebarOpen && "flex justify-center"
          )}>
            <Button
              variant="ghost"
              className="w-full justify-start text-foreground hover:text-foreground-subtle hover:bg-background-subtle"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-3" />
              {sidebarOpen && <span>Sign Out</span>}
            </Button>
          </div>
        </div>
      </div>

      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}