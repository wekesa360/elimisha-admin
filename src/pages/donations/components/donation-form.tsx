import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  image: z.any().optional(),
});

type DonationFormValues = z.infer<typeof formSchema>;

interface DonationFormProps {
  initialData?: any;
  onSubmit: (data: FormData) => Promise<void>;
}

export function DonationForm({ initialData, onSubmit }: DonationFormProps) {
  console.log(initialData);
  const form = useForm<DonationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      date: initialData?.date || "",
      location: initialData?.location || "",
      description: initialData?.description || "",
    },
  });

  const handleSubmit = async (values: DonationFormValues) => {
    console.log(values);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && key !== "image") {
        formData.append(key, value);
      }
    });
    if (values.image) {
      formData.append("image", values.image);
    }
    await onSubmit(formData);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium text-foreground">
          Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          placeholder="Enter donation title"
          {...form.register("title")}
          error={form.formState.errors.title?.message}
          className={
            form.formState.errors.title 
              ? "border-destructive focus-visible:ring-destructive text-foreground" 
              : "text-foreground"
          }
        />
        {form.formState.errors.title && (
          <p className="text-sm text-destructive">
            {form.formState.errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="date" className="text-sm font-medium text-foreground">
          Date <span className="text-destructive">*</span>
        </Label>
        <Input
          id="date"
          type="date"
          {...form.register("date")}
          error={form.formState.errors.date?.message}
          className={
            form.formState.errors.date 
              ? "border-destructive focus-visible:ring-destructive" 
              : "text-foreground"
          }
        />
        {form.formState.errors.date && (
          <p className="text-sm text-destructive">
            {form.formState.errors.date.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="text-sm font-medium text-foreground">
          Location <span className="text-destructive">*</span>
        </Label>
        <Input
          id="location"
          placeholder="Enter donation location"
          {...form.register("location")}
          error={form.formState.errors.location?.message}
          className={
            form.formState.errors.location 
              ? "border-destructive focus-visible:ring-destructive" 
              : "text-foreground"
          }
        />
        {form.formState.errors.location && (
          <p className="text-sm text-destructive">
            {form.formState.errors.location.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium text-foreground">
          Description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Enter detailed description about the donation"
          {...form.register("description")}
          error={form.formState.errors.description?.message}
          className={`min-h-[120px] ${
            form.formState.errors.description 
              ? "border-destructive focus-visible:ring-destructive" 
              : "text-foreground"
          }`}
        />
        {form.formState.errors.description && (
          <p className="text-sm text-destructive">
            {form.formState.errors.description.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">
          Donation Image
        </Label>
        <ImageUpload
          value={initialData?.imageUrl}
          onChange={(file) => form.setValue("image", file)}
          onRemove={() => form.setValue("image", undefined)}
          label="Upload an image for this donation"
          maxSize={5 * 1024 * 1024} // 5MB
          accept="image/*"
          error={form.formState.errors.image?.message}
          className={
            form.formState.errors.image 
              ? "border-destructive" 
              : "text-foreground"
          }
          dropzoneText="Drag and drop an image here, or click to select one"
        />
        <p className="text-sm text-muted-foreground">
          Supported formats: PNG, JPG, GIF up to 5MB
        </p>
      </div>

      <div className="flex justify-end gap-4">
        <Button 
          variant="outline" 
          onClick={() => form.reset()}
          type="button"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={form.formState.isSubmitting}
          className="min-w-[100px]"
        >
          {form.formState.isSubmitting ? (
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              {initialData ? "Updating..." : "Creating..."}
            </div>
          ) : (
            initialData ? "Update Donation" : "Create Donation"
          )}
        </Button>
      </div>
    </form>
  );
}