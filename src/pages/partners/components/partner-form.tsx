// src/pages/partners/components/partner-form.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui/image-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  logo: z.any().optional(),
});

export function PartnerForm({ initialData, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
    },
  });

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (values.logo) {
      formData.append("logo", values.logo);
    }
    await onSubmit(formData);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <Input label="Partner Name" {...form.register("name")} />
      <ImageUpload
        value={initialData?.logoUrl}
        onChange={(file) => form.setValue("logo", file)}
        onRemove={() => form.setValue("logo", undefined)}
        label="Partner Logo"
      />
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {initialData ? "Update Partner" : "Add Partner"}
      </Button>
    </form>
  );
}