import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  description: z.string().min(1, "Description is required"),
  image: z.any().optional(),
});

type ActivityFormValues = z.infer<typeof formSchema>;

interface ActivityFormProps {
  initialData?: any;
  onSubmit: (data: FormData) => Promise<void>;
}

export function ActivityForm({ initialData, onSubmit }: ActivityFormProps) {
  const form = useForm<ActivityFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      date: initialData?.date || "",
      description: initialData?.description || "",
    },
  });

  const handleSubmit = async (values: ActivityFormValues) => {
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
      <Input
        label="Title"
        {...form.register("title")}
        error={form.formState.errors.title?.message}
      />
      <Input
        type="date"
        label="Date"
        {...form.register("date")}
        error={form.formState.errors.date?.message}
      />
      <Textarea
        label="Description"
        {...form.register("description")}
        error={form.formState.errors.description?.message}
      />
      <ImageUpload
        value={initialData?.imageUrl}
        onChange={(file) => form.setValue("image", file)}
        onRemove={() => form.setValue("image", undefined)}
        label="Activity Image"
      />
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {initialData ? "Update Activity" : "Create Activity"}
      </Button>
    </form>
  );
}