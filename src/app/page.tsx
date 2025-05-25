"use client";

import { useState } from "react";
import FileUploader from "./components/common/FileUploader";
import Section from "./components/common/Section";
import Typography from "./components/common/Typography";

export default function Home() {
  return (
    <Section className="min-h-screen">
      <Typography.H1 label="Welcome" />
    </Section>
  );
}
