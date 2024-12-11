// src/pages/partners/components/partner-card.tsx
import { Card } from "@/components/ui/card";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PartnerCard({ partner, onEdit, onDelete }) {
  return (
    <Card className="group relative rounded-none">
      <div className="p-6">
        <div className="aspect-square mb-4 relative">
          <img
            src={partner.logoUrl || "/placeholder.png"}
            alt={partner.name}
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              size="icon"
              variant="secondary"
              onClick={() => onEdit(partner)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="destructive"
              onClick={() => onDelete(partner)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <h3 className="text-center font-medium">{partner.name}</h3>
      </div>
    </Card>
  );
}