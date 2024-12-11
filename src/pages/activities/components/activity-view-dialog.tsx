import { Activity as ActivityIcon, Calendar, } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Activity } from "@/lib/api/types";
import { format } from "date-fns";


export function ViewDialog({ activity, isOpen, onClose }: { 
  activity: Activity | null; 
  isOpen: boolean; 
  onClose: () => void; 
}) {
  if (!activity) return null;

  return (
    <Modal
      title="View Activity"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-6">
        {activity.imageUrl && (
          <div className="relative w-full h-48 rounded-lg overflow-hidden">
            <img
              src={activity.imageUrl}
              alt={activity.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">{activity.title}</h2>
          
          <div className="flex items-center text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            {format(new Date(activity.date), "MMMM d, yyyy")}
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-foreground">Description</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {activity.description}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-foreground">Created</h3>
            <p className="text-muted-foreground">
              {format(new Date(activity.createdAt), "MMMM d, yyyy 'at' h:mm a")}
            </p>
          </div>

          {activity.updatedAt !== activity.createdAt && (
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">Last Updated</h3>
              <p className="text-muted-foreground">
                {format(new Date(activity.updatedAt), "MMMM d, yyyy 'at' h:mm a")}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}