"use client";

import { UploadButton } from "@/lib/uploadthing";
import React, { useEffect, useState } from "react";

type Props = {
  onUrlsChange: (urls: string[]) => void;
  endpoint: "imageUploader" | "galleryImageUploader";
  shouldReset: boolean;
};

const FileUploader: React.FC<Props> = ({
  onUrlsChange,
  endpoint,
  shouldReset,
}) => {
  const [uploadedFileUrls, setUploadedFileUrls] = useState<string[]>([]);

  useEffect(() => {
    if (shouldReset) {
      setUploadedFileUrls([]);
    }
  }, [shouldReset]);

  return (
    <div>
      <UploadButton
        className="ut-button:bg-primary w-fit ut-button:text-primary-foreground ut-allowed-content:text-muted-foreground"
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);

          if (res && res.length > 0) {
            const newUrls = res.map((file) => file.ufsUrl);
            setUploadedFileUrls((prevUrls) =>
              shouldReset ? newUrls : [...prevUrls, ...newUrls]
            );
            onUrlsChange(
              shouldReset ? newUrls : [...uploadedFileUrls, ...newUrls]
            );
          }
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export default FileUploader;
