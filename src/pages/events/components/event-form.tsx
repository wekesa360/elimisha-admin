// src/pages/events/components/event-form.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Event } from "@/lib/api/types";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  seatsAvailable: z.number().min(1, "Must have at least 1 seat available"),
  fee: z.number().min(0, "Fee cannot be negative"),
  googleMapsLink: z.string().url("Must be a valid URL").optional(),
  image: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface EventFormProps {
  initialData?: Event | null;
  onSubmit: (data: FormData) => Promise<void>;
}

export function EventForm({ initialData, onSubmit }: EventFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : "",
      location: initialData?.location || "",
      description: initialData?.description || "",
      seatsAvailable: initialData?.seatsAvailable || 1,
      fee: initialData?.fee || 0,
      googleMapsLink: initialData?.googleMapsLink || "",
    },
  });

  const handleSubmit = async (values: FormData) => {
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">
            Event Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            placeholder="Enter event title"
            {...form.register("title")}
            error={form.formState.errors.title?.message}
          />
          {form.formState.errors.title && (
            <p className="text-sm text-destructive mt-1">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="date">
            Event Date <span className="text-destructive">*</span>
          </Label>
          <Input
            id="date"
            type="date"
            {...form.register("date")}
            error={form.formState.errors.date?.message}
          />
          {form.formState.errors.date && (
            <p className="text-sm text-destructive mt-1">
              {form.formState.errors.date.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="location">
            Location <span className="text-destructive">*</span>
          </Label>
          <Input
            id="location"
            placeholder="Event location"
            {...form.register("location")}
            error={form.formState.errors.location?.message}
          />
          {form.formState.errors.location && (
            <p className="text-sm text-destructive mt-1">
              {form.formState.errors.location.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="googleMapsLink">
            Google Maps Link
          </Label>
          <Input
            id="googleMapsLink"
            placeholder="https://maps.google.com/..."
            {...form.register("googleMapsLink")}
            error={form.formState.errors.googleMapsLink?.message}
          />
          {form.formState.errors.googleMapsLink && (
            <p className="text-sm text-destructive mt-1">
              {form.formState.errors.googleMapsLink.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="seatsAvailable">
              Available Seats <span className="text-destructive">*</span>
            </Label>
            <Input
              id="seatsAvailable"
              type="number"
              min={1}
              {...form.register("seatsAvailable", { valueAsNumber: true })}
              error={form.formState.errors.seatsAvailable?.message}
            />
            {form.formState.errors.seatsAvailable && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.seatsAvailable.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="fee">
              Event Fee (KES)
            </Label>
            <Input
              id="fee"
              type="number"
              min={0}
              {...form.register("fee", { valueAsNumber: true })}
              error={form.formState.errors.fee?.message}
            />
            {form.formState.errors.fee && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.fee.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="description">
            Description <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="description"
            rows={4}
            placeholder="Enter event description"
            {...form.register("description")}
            error={form.formState.errors.description?.message}
            className="resize-none"
          />
          {form.formState.errors.description && (
            <p className="text-sm text-destructive mt-1">
              {form.formState.errors.description.message}
            </p>
          )}
        </div>

        <div>
          <Label>Event Image</Label>
          <ImageUpload
            value={initialData?.imageUrl}
            onChange={(file) => form.setValue("image", file)}
            onRemove={() => form.setValue("image", undefined)}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="min-w-[120px]"
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {initialData ? "Updating..." : "Creating..."}
            </>
          ) : (
            initialData ? "Update Event" : "Create Event"
          )}
        </Button>
      </div>
    </form>
  );
}