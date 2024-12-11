// src/pages/posters/components/poster-card.tsx
import { Card } from "@/components/ui/card";
import { Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Poster } from "@/lib/api/types";

interface PosterCardProps {
  poster: Poster;
  onEdit: (poster: Poster) => void;
  onDelete: (poster: Poster) => void;
  onToggle: (poster: Poster) => void;
  onPreview: (poster: Poster) => void;
}

export function PosterCard({ poster, onEdit, onDelete, onToggle, onPreview }: PosterCardProps) {
  return (
    <Card className="overflow-hidden group rounded-none">
      <div className="aspect-video relative">
        <img
          src={poster.imageUrl}
          alt={poster.title}
          className="w-full h-full object-cover"
          onClick={() => onPreview(poster)}
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button
            size="icon"
            variant="secondary"
            onClick={() => onEdit(poster)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            onClick={() => onToggle(poster)}
          >
            {poster.active ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </Button>
          <Button
            size="icon"
            variant="destructive"
            onClick={() => onDelete(poster)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium mb-2">{poster.title}</h3>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>Start: {format(new Date(poster.startDate), "MMM d, yyyy")}</p>
          <p>End: {format(new Date(poster.endDate), "MMM d, yyyy")}</p>
          <p className={poster.active ? "text-green-600" : "text-red-600"}>
            {poster.active ? "Active" : "Inactive"}
          </p>
        </div>
      </div>
    </Card>
  );
}