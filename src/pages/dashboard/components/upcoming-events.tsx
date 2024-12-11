import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import type { Event } from "@/lib/api/types";
import { Calendar, MapPin, Users } from "lucide-react";

interface UpcomingEventsProps {
  events: Event[];
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {events.map((event) => (
            <div key={event.id} className="flex items-start space-x-4">
              <div className="h-16 w-16 rounded-lg overflow-hidden">
                <img
                  src={event.imageUrl || "/placeholder.png"}
                  alt={event.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-medium">{event.title}</h4>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {format(new Date(event.date), "MMM d, yyyy")}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {event.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  {event.rsvpCount || 0} registered
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}