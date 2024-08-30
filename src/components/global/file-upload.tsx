import axiosInstance from "@/lib/axios";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";

type Props = {
  apiEndpoint: "userImage" | "funnelLogo";
  onChange: (url?: string) => void;
  value?: string;
};

const FileUpload = ({ apiEndpoint, onChange, value }: Props) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null); // State for error messages
  const fileType = value?.split(".").pop();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type before upload
      if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
        setError("Invalid file type. Please upload an image or PDF.");
        return;
      }
      
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await axiosInstance.post("/media/createMedia", formData);

        if (res.status === 200) {
          const data = res.data;
          onChange(data.url);
        } else {
          setError("Failed to upload file.");
        }
      } catch (error) {
        setError("An error occurred while uploading the file.");
        console.error("Upload error:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRemove = () => {
    onChange("");
    setError(null); // Clear error on remove
  };

  return (
    <div className="flex flex-col items-center w-full">
      {value ? (
        <div className="flex flex-col items-center">
          {fileType !== "pdf" ? (
            <div className="relative w-40 h-40">
              <Image
                src={value}
                alt="uploaded image"
                className="object-contain"
                fill
              />
            </div>
          ) : (
            <div className="flex items-center p-2 mt-2 rounded-md bg-background/10">
              <FileIcon />
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
              >
                View PDF
              </a>
            </div>
          )}
          <Button onClick={handleRemove} variant="ghost" type="button">
            <X className="h-4 w-4" />
            Remove Logo
          </Button>
        </div>
      ) : (
        <div className="w-full bg-muted/30 p-4">
          <input
            type="file"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            aria-label="Upload file"
          />
          {isUploading && <p className="text-sm text-gray-500">Uploading...</p>}
          {error && <p className="text-red-500">{error}</p>} {/* Display error messages */}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
