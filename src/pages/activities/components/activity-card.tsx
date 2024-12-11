import { Card } from "@/components/ui/card";
import { Calendar, Pencil, Trash } from "lucide-react";
import { format } from "date-fns";
import { Activity } from "@/lib/api/types";
import { Button } from "@/components/ui/button";

interface ActivityCardProps {
  activity: Activity;
  onView: (activity: Activity) => void;
  onEdit: (activity: Activity) => void;
  onDelete: (activity: Activity) => void;
}


export function ActivityCard({ activity, onView, onEdit, onDelete }: ActivityCardProps) {
  return (
    <Card className="overflow-hidden group rounded-none">
      <div className="aspect-video relative">
        <img
          src={activity.imageUrl || "/placeholder.png"}
          alt={activity.title}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => onView(activity)}
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button
            size="icon"
            variant="secondary"
            onClick={() => onEdit(activity)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            onClick={() => onDelete(activity)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div 
        className="p-4 cursor-pointer"
        onClick={() => onView(activity)}
      >
        <h3 className="font-semibold mb-2">{activity.title}</h3>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          {format(new Date(activity.date), "MMM d, yyyy")}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {activity.description}
        </p>
      </div>
    </Card>
  );
}