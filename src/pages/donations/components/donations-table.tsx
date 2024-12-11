// src/pages/donations/components/donations-table.tsx
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Donation } from "@/lib/api/types";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Eye, Calendar, MapPin } from "lucide-react";

interface DonationsTableProps {
 data: Donation[];
 onView: (donation: Donation) => void;
 onEdit: (donation: Donation) => void;
 onDelete: (donation: Donation) => void;
}

export function DonationsTable({ data, onView, onEdit, onDelete }: DonationsTableProps) {
 const columns: ColumnDef<Donation>[] = [
   {
     accessorKey: "imageUrl",
     header: "Image",
     cell: ({ row }) => (
       <div className="cursor-pointer" onClick={() => onView(row.original)}>
         <img
           src={row.getValue("imageUrl") || "/placeholder.png"}
           alt={row.getValue("title")}
           className="w-12 h-12 rounded-lg object-cover hover:opacity-80 transition-opacity"
         />
       </div>
     ),
   },
   {
     accessorKey: "title",
     header: "Title",
     cell: ({ row }) => (
       <div 
         className="cursor-pointer hover:text-primary"
         onClick={() => onView(row.original)}
       >
         <span className="font-medium text-foreground">{row.getValue("title")}</span>
         {row.original.description && (
           <p className="text-muted-foreground text-sm line-clamp-1">
             {row.original.description}
           </p>
         )}
       </div>
     ),
   },
   {
     accessorKey: "date",
     header: "Date & Location",
     cell: ({ row }) => (
       <div className="space-y-1">
         <div className="flex items-center text-sm text-foreground">
           <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
           {format(new Date(row.getValue("date")), "MMM d, yyyy")}
         </div>
         {/* <div className="flex items-center text-sm text-muted-foreground ">
           <MapPin className="w-4 h-4 mr-2" />
           {row.getValue("location")}
         </div> */}
       </div>
     ),
   },
   {
     accessorKey: "createdAt",
     header: "Created",
     cell: ({ row }) => (
       <div className="text-sm text-muted-foreground">
         {format(new Date(row.getValue("createdAt")), "MMM d, yyyy")}
       </div>
     ),
   },
   {
     id: "actions",
     header: "Actions",
     cell: ({ row }) => (
       <div className="flex items-center gap-2">
         <Button
           variant="ghost"
           size="icon"
           onClick={() => onView(row.original)}
           className="hover:text-primary"
         >
           <Eye className="w-4 h-4 text-foreground" />
         </Button>
         <Button
           variant="ghost"
           size="icon"
           onClick={() => onEdit(row.original)}
           className="hover:text-blue-500"
         >
           <Edit2 className="w-4 h-4 text-foreground" />
         </Button>
         <Button
           variant="ghost"
           size="icon"
           onClick={() => onDelete(row.original)}
           className="hover:text-red-500"
         >
           <Trash2 className="w-4 h-4 text-foreground" />
         </Button>
       </div>
     ),
   },
 ];

 return (
   <DataTable 
     columns={columns} 
     data={data} 
     searchKey="title"
   />
 );
}