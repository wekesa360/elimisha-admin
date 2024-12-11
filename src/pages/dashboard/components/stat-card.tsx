import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  change?: {
    value: string;
    positive: boolean;
  };
}

export function StatCard({ title, value, icon: Icon, description, change }: StatCardProps) {
  return (
    <Card className="rounded-none">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="p-2 bg-primary/10 rounded-full">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </div>
        <div className="flex items-end justify-between mt-4">
          <div>
            <div className="text-2xl font-bold">{value}</div>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          {change && (
            <div className={`text-sm ${change.positive ? 'text-emerald-500' : 'text-red-500'}`}>
              {change.value}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
