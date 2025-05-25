"use client";

import { useState } from "react";
import FileUploader from "./components/common/FileUploader";
import Section from "./components/common/Section";
import Typography from "./components/common/Typography";

export default function Home() {
  const [allUploadedUrls, setAllUploadedUrls] = useState<string[]>([]);

  const handleUrlsUpdate = (urls: string[]) => {
    console.log("All uploaded URLs:", urls);
    setAllUploadedUrls(urls);
  };

  console.log(allUploadedUrls, "hej");

  return (
    <Section className="min-h-screen">
      <Typography.H1 label="Welcome" />
      <FileUploader onUrlsChange={handleUrlsUpdate} endpoint="imageUploader" />

      {allUploadedUrls?.map((url) => (
        <div key={Math.random()}>{url}</div>
      ))}
    </Section>
  );
}
