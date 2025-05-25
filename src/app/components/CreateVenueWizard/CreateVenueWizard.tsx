"use client";

import React, { useState, useEffect } from "react";
import Section from "../common/Section";
import Typography from "../common/Typography";
import Button from "../common/Button";
import { LoadScript } from "@react-google-maps/api";

import Step1MediaUploader from "./AddMedia";
import Step2LocationSelector from "./AddLocation";
import Step3Description from "./AddDetails";

import { generateVenueContent } from "@/api/openai";
import Progress from "../Progress";

const libraries: ["places"] = ["places"];

type MediaItem = {
  url: string;
  alt: string;
};

type MediaArray = MediaItem[];

type LocationData = {
  address: string;
  city: string;
  zip: string;
  country: string;
  lat: number;
  lng: number;
};

const CreateVenueWizard = () => {
  const [media, setMedia] = useState<MediaArray>([]);
  const [step, setStep] = useState(1);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);

  const handleUrlsChange = (urls: string[]) => {
    const newMediaItems: MediaArray = urls.map((url) => ({
      url,
      alt: "Uploaded venue image",
    }));
    setMedia(newMediaItems);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleLocationChange = (
    updater: (prevData: LocationData | null) => LocationData | null
  ) => {
    setLocationData(updater);
  };

  const handleMarkerPositionChange = (
    position: { lat: number; lng: number } | null
  ) => {
    setMarkerPosition(position);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleGenerateDescription = async () => {
    if (media.length === 0) {
      alert("Please upload at least one image to generate a description.");
      return;
    }

    setIsGeneratingDescription(true);
    try {
      const generatedText = await generateVenueContent(
        media[0].url,
        locationData?.city ?? ""
      );
      setDescription(generatedText);
    } catch (error) {
      console.error("Error generating description:", error);
      alert("Failed to generate description. Please try again.");
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  useEffect(() => {
    if (step === 1) {
      setLocationData(null);
      setMarkerPosition(null);
      setDescription("");
    }
  }, [step]);

  useEffect(() => {
    if (
      locationData &&
      typeof locationData.lat === "number" &&
      typeof locationData.lng === "number"
    ) {
      setMarkerPosition({ lat: locationData.lat, lng: locationData.lng });
    } else {
      setMarkerPosition(null);
    }
  }, [locationData]);

  return (
    <Section className="relative my-10">
      {/* {step > 1 && (
        <Button
          label="Back"
          onClick={handlePrevStep}
          className="absolute top-0 left-0"
        />
      )} */}
      <Progress value={step} max={5} />
      <Typography.H1 label="List a venue" />

      <Step1MediaUploader
        media={media}
        onUrlsChange={handleUrlsChange}
        endpoint="galleryImageUploader"
        shouldReset={true}
        isActive={step === 1}
      />

      <LoadScript
        googleMapsApiKey={process.env.NEXT_GOOGLE_API_KEY!}
        libraries={libraries}
        onLoad={() => console.log("Google Maps script loaded")}
        onError={(error) => console.error("Google Maps script error:", error)}
      >
        <Step2LocationSelector
          locationData={locationData}
          markerPosition={markerPosition}
          onLocationChange={handleLocationChange}
          onMarkerPositionChange={handleMarkerPositionChange}
          isActive={step === 2}
        />
      </LoadScript>

      <Step3Description
        description={description}
        name={name}
        onNameChange={handleNameChange}
        onDescriptionChange={handleDescriptionChange}
        onGenerateDescription={handleGenerateDescription}
        isGeneratingDescription={isGeneratingDescription}
        isActive={step === 3}
      />

      <div className="h-10" />
      <Button
        className="fixed bottom-0 rounded-none md:rounded-lg md:bottom-2 w-full max-w-[75rem]"
        label={
          step === 2 && !locationData
            ? "Select Location"
            : step === 3 && !description
            ? "Add Description"
            : step < 6
            ? "Next"
            : "Show Summary"
        }
        onClick={handleNextStep}
        disabled={
          (step === 2 && !locationData) ||
          (step === 3 && !description) ||
          isGeneratingDescription
        }
      />
      <div className="h-2" />
    </Section>
  );
};

export default CreateVenueWizard;
