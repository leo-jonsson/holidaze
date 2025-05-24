"use client";

import { UploadButton } from "@/lib/uploadthing";
import Section from "./components/common/Section";
import Typography from "./components/common/Typography";

export default function Home() {
  const test = process.env.API_KEY;

  console.log(test);
  return (
    <Section className="min-h-screen">
      <Typography.H1 label="Welcome" />
      <UploadButton
        className="ut-button:bg-primary w-fit ut-button:text-primary-foreground ut-allowed-content:text-muted-foreground"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </Section>
  );
}
