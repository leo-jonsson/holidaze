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
import Step4Confirm from "./ConfirmDetails";
import { createVenue } from "@/api/venues"; // Import the createVenue function
import { Venue } from "@/api/types/venues"; // Import the Venue type if needed

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
  const [price, setPrice] = useState(0);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

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

  const handlePriceChange = (value: number) => {
    setPrice(value);
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

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    setLocationData((prevData) =>
      prevData ? { ...prevData, address: e.target.value } : null
    );
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setLocationData((prevData) =>
      prevData ? { ...prevData, city: e.target.value } : null
    );
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZip(e.target.value);
    setLocationData((prevData) =>
      prevData ? { ...prevData, zip: e.target.value } : null
    );
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
    setLocationData((prevData) =>
      prevData ? { ...prevData, country: e.target.value } : null
    );
  };

  const handleCreateVenue = async () => {
    if (!locationData) {
      alert("Location data is missing.");
      return;
    }

    setIsSubmitting(true);
    try {
      const venuePayload = {
        name,
        description,
        media,
        price,
        maxGuests: 2,
        location: {
          address: locationData.address,
          city: locationData.city,
          zip: locationData.zip,
          country: locationData.country,
          lat: locationData.lat,
          lng: locationData.lng,
        },
      };

      console.log(venuePayload, "hallå");
      const newVenue = await createVenue(venuePayload);
      console.log("Venue created successfully:", newVenue);
    } catch (error) {
      console.error("Error creating venue:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (step === 1) {
      setLocationData(null);
      setMarkerPosition(null);
      setDescription("");
      setAddress("");
      setCity("");
      setZip("");
      setCountry("");
    }
  }, [step]);

  useEffect(() => {
    if (locationData) {
      setAddress(locationData.address);
      setCity(locationData.city);
      setZip(locationData.zip);
      setCountry(locationData.country);
      if (
        typeof locationData.lat === "number" &&
        typeof locationData.lng === "number"
      ) {
        setMarkerPosition({ lat: locationData.lat, lng: locationData.lng });
      } else {
        setMarkerPosition(null);
      }
    } else {
      setMarkerPosition(null);
    }
  }, [locationData]);

  return (
    <Section className="relative my-10">
      <Typography.H1 label="List a venue" />
      {step > 1 && (
        <Button
          label="Undo"
          onClick={handlePrevStep}
          className="flex ml-0 self-start my-3"
          variant="outline"
          disabled={isSubmitting}
        />
      )}
      <Progress value={step} max={5} />
      <Step1MediaUploader
        media={media}
        onUrlsChange={handleUrlsChange}
        endpoint="galleryImageUploader"
        shouldReset={true}
        isActive={step === 1}
      />
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}
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
        price={price}
        onPriceChange={handlePriceChange}
        isGeneratingDescription={isGeneratingDescription}
        isActive={step === 3}
      />
      <Step4Confirm
        description={description}
        name={name}
        price={price}
        locationData={locationData}
        onNameChange={handleNameChange}
        onDescriptionChange={handleDescriptionChange}
        onPriceChange={handlePriceChange}
        address={address}
        city={city}
        zip={zip}
        country={country}
        onAddressChange={handleAddressChange}
        onCityChange={handleCityChange}
        onZipChange={handleZipChange}
        onCountryChange={handleCountryChange}
        isActive={step === 4}
        onSubmit={handleCreateVenue}
      />

      <div className="h-10" />
      <Button
        className="fixed bottom-0 rounded-none md:rounded-lg md:bottom-2 w-full max-w-[75rem]"
        label={
          step === 2 && !locationData
            ? "Select Location"
            : step === 3 && !description
            ? "Add Description"
            : step === 4
            ? isSubmitting
              ? "Creating Venue..."
              : "Create Venue"
            : step < 6
            ? "Next"
            : "Show Summary"
        }
        onClick={step === 4 ? handleCreateVenue : handleNextStep}
        disabled={
          (step === 2 && !locationData) ||
          (step === 3 && !description) ||
          isGeneratingDescription ||
          (step === 4 && isSubmitting)
        }
      />
      <div className="h-2" />
    </Section>
  );
};

export default CreateVenueWizard;
