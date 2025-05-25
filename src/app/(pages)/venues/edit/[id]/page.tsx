"use client";

import Section from "@/app/components/common/Section";
import EditVenueForm from "@/app/components/EditVenueForm";
import { useParams } from "next/navigation";
import React from "react";

const EditVenuePage = () => {
  const params = useParams();
  const venueId = typeof params.id === "string" ? params.id : undefined;

  if (!venueId) {
    return null;
  }

  return (
    <Section>
      <EditVenueForm venueId={venueId} />
    </Section>
  );
};

export default EditVenuePage;
