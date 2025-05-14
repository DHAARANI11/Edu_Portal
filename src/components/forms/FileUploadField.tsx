
import React, { ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { UploadIcon, X } from 'lucide-react';

interface FileUploadFieldProps {
  label: string;
  id: string;
  accept?: string;
  onChange: (file: File | null) => void;
  value: File | null;
}

export const FileUploadField = ({
  label,
  id,
  accept = "image/*",
  onChange,
  value,
}: FileUploadFieldProps) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    onChange(file || null);
  };

  const handleRemoveFile = () => {
    onChange(null);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor={id}
          className={`flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer ${
            value ? 'bg-primary/10 border-primary' : 'bg-muted/50 hover:bg-muted border-border'
          } transition-colors`}
        >
          {!value ? (
            <div className="flex flex-col items-center justify-center py-6 px-4">
              <UploadIcon className="w-8 h-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground font-medium">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                {accept === "image/*" ? "SVG, PNG, JPG or GIF" : accept.replace(/\./g, "").toUpperCase()}
              </p>
            </div>
          ) : (
            <div className="flex items-center p-4 w-full">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {value.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(value.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemoveFile();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          <Input
            id={id}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};
