// src/pages/events/components/rsvp-form.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { RSVPEntry } from "@/lib/api/types";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  mpesaPhone: z.string().regex(/^254\d{9}$/, "Phone number must be in format: 254XXXXXXXXX"),
  whatsappPhone: z.string().regex(/^254\d{9}$/, "Phone number must be in format: 254XXXXXXXXX"),
});

type FormData = z.infer<typeof formSchema>;

interface RSVPFormProps {
  initialData?: RSVPEntry | null;
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
}

export function RSVPForm({ initialData, onSubmit, onCancel }: RSVPFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: initialData?.fullName || '',
      email: initialData?.email || '',
      mpesaPhone: initialData?.mpesaPhone || '',
      whatsappPhone: initialData?.whatsappPhone || '',
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
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 text-foreground">
      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="fullName"
            placeholder="Enter attendee's full name"
            {...form.register("fullName")}
            error={form.formState.errors.fullName?.message}
          />
          {form.formState.errors.fullName && (
            <p className="text-sm text-destructive mt-1">
              {form.formState.errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email">
            Email Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter email address"
            {...form.register("email")}
            error={form.formState.errors.email?.message}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-destructive mt-1">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="mpesaPhone">
            M-Pesa Phone Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="mpesaPhone"
            placeholder="254XXXXXXXXX"
            {...form.register("mpesaPhone")}
            error={form.formState.errors.mpesaPhone?.message}
          />
          {form.formState.errors.mpesaPhone && (
            <p className="text-sm text-destructive mt-1">
              {form.formState.errors.mpesaPhone.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="whatsappPhone">
            WhatsApp Phone Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="whatsappPhone"
            placeholder="254XXXXXXXXX"
            {...form.register("whatsappPhone")}
            error={form.formState.errors.whatsappPhone?.message}
          />
          {form.formState.errors.whatsappPhone && (
            <p className="text-sm text-destructive mt-1">
              {form.formState.errors.whatsappPhone.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
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
            initialData ? "Update RSVP" : "Add RSVP"
          )}
        </Button>
      </div>
    </form>
  );
}