"use client";

import Section from "@/app/components/common/Section";
import Typography from "@/app/components/common/Typography";
import Venues from "@/app/components/Venues/Venues";

export default function VenuePage() {
  return (
    <Section className="min-h-screen py-16">
      <Typography.H1 label="All venues" />
      <Venues />
    </Section>
  );
}
