import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui/image-upload";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {toast, Toaster} from "react-hot-toast";

const today = new Date().toISOString().split('T')[0];

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    startDate: z.string().min(1, "Start date is required")
        .refine(date => date >= today, "Start date cannot be in the past"),
    endDate: z.string().min(1, "End date is required")
        .refine(date => date >= today, "End date cannot be in the past"),
    active: z.boolean(),
    image: z.any().optional(),
}).refine(data => data.endDate >= data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"]
});

export function PosterForm({ initialData, onSubmit } : { initialData?: any, onSubmit: (data: FormData) => Promise<void> }) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || "",
            startDate: initialData?.startDate || "",
            endDate: initialData?.endDate || "",
            active: initialData?.active || true,
        },
    });

    const handleSubmit = async (values:any) => {
        if (values.startDate > values.endDate) {
            toast.error("End date must be after start date");
            return;
        }
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (value !== undefined && key !== "image") {
                formData.append(key, String(value));
            }
        });
        if (values.image) {
            formData.append("image", values.image);
        }
        await onSubmit(formData);
    };

    const errors = form.formState.errors;

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="title" className="text-foreground">Title</Label>
                <Input
                    id="title"
                    {...form.register("title")}
                    className="text-foreground bg-background-subtle"
                />
                {errors.title && (
                    <p className="text-destructive text-sm">{errors.title.message}</p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-foreground">Start Date</Label>
                    <Input
                        id="startDate"
                        type="date"
                        {...form.register("startDate")}
                        className="text-foreground bg-background-subtle"
                    />
                    {errors.startDate && (
                        <p className="text-destructive text-sm">{errors.startDate.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-foreground">End Date</Label>
                    <Input
                        id="endDate"
                        type="date"
                        {...form.register("endDate")}
                        className="text-foreground bg-background-subtle"
                    />
                    {errors.endDate && (
                        <p className="text-destructive text-sm">{errors.endDate.message}</p>
                    )}
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <Switch
                    checked={form.watch("active")}
                    onCheckedChange={(checked) => form.setValue("active", checked)}
                />
                <Label className="text-foreground">Make poster active</Label>
            </div>

            <div className="space-y-2">
                <Label className="text-foreground">Poster Image</Label>
                <ImageUpload
                    value={initialData?.imageUrl}
                    onChange={(file) => form.setValue("image", file)}
                    onRemove={() => form.setValue("image", undefined)}
                />
            </div>

            <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full"
            >
                {form.formState.isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                    </>
                ) : (
                    initialData ? "Update Poster" : "Create Poster"
                )}
            </Button>
        </form>
    );
}

export default PosterForm;