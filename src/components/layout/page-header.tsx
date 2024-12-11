import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  action?: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
  };
}

export function PageHeader({ title, action }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      {action && (
        <Button onClick={action.onClick}>
          <action.icon className="w-4 h-4 mr-2" />
          {action.label}
        </Button>
      )}
    </div>
  );
}