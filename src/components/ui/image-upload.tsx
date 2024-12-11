import { useCallback, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange: (value: File | undefined) => void;
  onRemove: () => void;
  label?: string;
}

export function ImageUpload({ value, onChange, onRemove, label }: ImageUploadProps) {
  const [preview, setPreview] = useState(value);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onChange]);

  return (
    <div className="space-y-4">
      {label && <span className="text-sm font-medium">{label}</span>}
      <div className="flex items-center gap-4">
        {preview && (
          <div className="relative w-24 h-24">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => {
                onRemove();
                setPreview(undefined);
              }}
              className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <div className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <Upload className="w-4 h-4 mr-2" />
              <span className="text-sm">Choose Image</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}