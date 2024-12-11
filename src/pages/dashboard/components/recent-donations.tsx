import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import type { Donation } from "@/lib/api/types";

interface RecentDonationsProps {
  donations: Donation[];
}

export function RecentDonations({ donations }: RecentDonationsProps) {
  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>Recent Donations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {donations.map((donation) => (
            <div key={donation.id} className="flex items-center">
              <div className="h-12 w-12 rounded-lg overflow-hidden">
                <img 
                  src={donation.imageUrl || "/placeholder.png"} 
                  alt={donation.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-foreground">{donation.title}</p>
                <p className="text-xs text-muted-foreground">{donation.location}</p>
              </div>
              <div className="text-xs text-muted-foreground">
                {format(new Date(donation.date), "MMM d, yyyy")}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}