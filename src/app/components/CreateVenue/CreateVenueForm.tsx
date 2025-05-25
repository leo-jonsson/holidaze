"use client";

import React, { useState, useRef, useEffect } from "react";
import Section from "../common/Section";
import Typography from "../common/Typography";
import VenueMedia from "../VenueMedia/VenueMedia";
import FileUploader from "../common/FileUploader";
import Button from "../common/Button";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

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

const CreateVenueForm = () => {
  const [media, setMedia] = useState<MediaArray>([]);
  const [step, setStep] = useState(1);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

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

  useEffect(() => {
    if (step === 1) {
      setLocationData(null);
      setMarkerPosition(null);
    }
  }, [step]);

  // Effect to sync marker position with locationData
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
      <div className={`grid gap-4 mt-4 ${isActive ? "" : "hidden"}`}>
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

  type Step2LocationSelectorProps = {
    locationData: LocationData | null;
    markerPosition: { lat: number; lng: number } | null;
    onLocationChange: (
      updater: (prevData: LocationData | null) => LocationData | null
    ) => void;
    onMarkerPositionChange: (
      position: { lat: number; lng: number } | null
    ) => void;
    isActive: boolean;
  };

  const Step2LocationSelector: React.FC<Step2LocationSelectorProps> = ({
    markerPosition,
    onLocationChange,
    onMarkerPositionChange,
    isActive,
  }) => {
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(
      null
    );

    const handlePlaceSelect = () => {
      if (autocompleteRef.current) {
        const place = autocompleteRef.current.getPlace();
        if (place && place.geometry && place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          onMarkerPositionChange({ lat, lng });
          extractLocationData(place);
        } else {
          console.warn("Autocomplete selected a non-place result:", place);
          onLocationChange(() => null); // Pass an updater function
          onMarkerPositionChange(null);
        }
      }
    };

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        onMarkerPositionChange({ lat, lng });
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            extractLocationData(results[0]);
          } else {
            console.error("Geocoder failed due to:", status);
            onLocationChange(() => null);
          }
        });
      }
    };

    const extractLocationData = (
      place: google.maps.places.PlaceResult | google.maps.GeocoderResult
    ) => {
      const addressComponents =
        (place as google.maps.places.PlaceResult).address_components ||
        (place as google.maps.GeocoderResult).address_components;

      let address = "";
      let streetNumber = "";
      let route = "";
      let city = "";
      let zip = "";
      let country = "";

      if (addressComponents) {
        addressComponents.forEach((component) => {
          const types = component.types;
          if (types.includes("street_number")) {
            streetNumber = component.long_name;
          }
          if (types.includes("route")) {
            route = component.long_name;
          }
          if (types.includes("locality")) {
            city = component.long_name;
          }
          if (types.includes("postal_code")) {
            zip = component.long_name;
          }
          if (types.includes("country")) {
            country = component.long_name;
          }
        });
      }
      address = `${streetNumber} ${route}`.trim();

      const lat = place.geometry?.location?.lat() || markerPosition?.lat || 0;
      const lng = place.geometry?.location?.lng() || markerPosition?.lng || 0;

      onLocationChange(() => ({
        address,
        city,
        zip,
        country,
        lat,
        lng,
      }));
    };

    const mapContainerStyle = {
      width: "100%",
      height: "500px",
    };

    const center = {
      lat: 0,
      lng: 0,
    };

    return (
      <div className={`grid gap-4 mt-4 w-full ${isActive ? "" : "hidden"}`}>
        <Typography.H2 label="Step 2: Set Location" />
        <div className="grid md:grid-cols-2 gap-4 w-full">
          <div>
            <Autocomplete
              onLoad={(autocomplete) =>
                (autocompleteRef.current = autocomplete)
              }
              onPlaceChanged={handlePlaceSelect}
            >
              <input
                type="text"
                placeholder="Search for a location"
                className="w-full p-2 border rounded-md mb-4"
              />
            </Autocomplete>
          </div>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={markerPosition || center}
            zoom={markerPosition ? 12 : 2}
            onClick={handleMapClick}
            options={{ disableDefaultUI: true, zoomControl: true }}
          >
            {markerPosition && <Marker position={markerPosition} />}
          </GoogleMap>
        </div>
      </div>
    );
  };

  type Step3EmptyProps = {
    isActive: boolean;
  };

  const Step3Empty: React.FC<Step3EmptyProps> = ({ isActive }) => {
    return (
      <div className={`grid gap-4 mt-4 ${isActive ? "" : "hidden"}`}>
        <Typography.H2 label="Step 3: Hello World" />
        <Typography.Label label="This is an empty step." />
      </div>
    );
  };

  type Step4EmptyProps = {
    isActive: boolean;
  };

  const Step4Empty: React.FC<Step4EmptyProps> = ({ isActive }) => {
    return (
      <div className={`grid gap-4 mt-4 ${isActive ? "" : "hidden"}`}>
        <Typography.H2 label="Step 4: Another Empty Step" />
        <Typography.Label label="Hello World again!" />
      </div>
    );
  };

  type Step5SummaryProps = {
    media: MediaArray;
    locationData: LocationData | null;
    isActive: boolean; // New prop to indicate if this step is active
  };

  const Step5Summary: React.FC<Step5SummaryProps> = ({
    media,
    locationData,
    isActive,
  }) => {
    return (
      <div className={`grid gap-4 mt-4 ${isActive ? "" : "hidden"}`}>
        <Typography.H2 label="Saved Data:" />
        {media.length > 0 && (
          <div>
            <Typography.H2 label="Media:" />
            {media.map((item, index) => (
              <Typography.H2 key={index} label={item.url} />
            ))}
          </div>
        )}
        {locationData && (
          <div>
            <Typography.H2 label="Location:" />
            <Typography.H2 label={`Address: ${locationData.address}`} />
            <Typography.H2 label={`City: ${locationData.city}`} />
            <Typography.H2 label={`Zip: ${locationData.zip}`} />
            <Typography.H2 label={`Country: ${locationData.country}`} />
            <Typography.H2 label={`Latitude: ${locationData.lat}`} />
            <Typography.H2 label={`Longitude: ${locationData.lng}`} />
          </div>
        )}
      </div>
    );
  };

  return (
    <Section className="relative my-10">
      {step > 1 && (
        <Button
          label="Back"
          onClick={handlePrevStep}
          className="absolute top-0 left-0"
        />
      )}
      <Typography.H1 label="List a venue" />

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
          isActive={step === 2} // Pass isActive prop
        />
      </LoadScript>

      <Step3Empty isActive={step === 3} />
      <Step4Empty isActive={step === 4} />
      <Step5Summary
        media={media}
        locationData={locationData}
        isActive={step === 5}
      />

      <div className="h-10" />
      <Button
        className="fixed bottom-0 rounded-none md:rounded-lg md:bottom-2 w-full max-w-[75rem]"
        label={
          step === 2 && !locationData
            ? "Select Location"
            : step < 5
            ? "Next"
            : "Show Summary"
        }
        onClick={handleNextStep}
        disabled={step === 2 && !locationData}
      />
      <div className="h-2" />
    </Section>
  );
};

export default CreateVenueForm;
