import React from "react";
import Typography from "../common/Typography";
import VenueMedia from "../VenueMedia/VenueMedia";
import FileUploader from "../common/FileUploader";

type MediaItem = {
  url: string;
  alt: string;
};

type MediaArray = MediaItem[];

type Step1MediaUploaderProps = {
  media: MediaArray;
  onUrlsChange: (urls: string[]) => void;
  endpoint: "imageUploader" | "galleryImageUploader";
  shouldReset: boolean;
  isActive: boolean;
};

const Step1MediaUploader: React.FC<Step1MediaUploaderProps> = ({
  media,
  onUrlsChange,
  endpoint,
  shouldReset,
  isActive,
}) => {
  return (
    <div className={`grid gap-4 ${isActive ? "" : "hidden"}`}>
      <Typography.H2 label="Step 1: Add media" />
      <FileUploader
        shouldReset={shouldReset}
        onUrlsChange={onUrlsChange}
        endpoint={endpoint}
      />
      <VenueMedia media={media} />
    </div>
  );
};

export default Step1MediaUploader;
