"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";

type Props = {
  lat?: number;
  lng?: number;
  city?: string;
  country?: string;
};

const DEFAULT_COORDINATES = {
  lat: 51.5074,
  lng: -0.1278,
};

const VenueMap = ({ lat, lng, city, country }: Props) => {
  const [resolvedLatLng, setResolvedLatLng] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (lat && lng) {
      setResolvedLatLng({ lat, lng });
      return;
    }

    if (!city && !country) {
      setResolvedLatLng(DEFAULT_COORDINATES);
      return;
    }

    const fetchCoordinates = async () => {
      const address = `${city ?? ""}, ${country ?? ""}`;
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${process.env.NEXT_GOOGLE_API_KEY}`
      );
      const data = await res.json();

      if (data.status === "OK" && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setResolvedLatLng(location);
      } else {
        console.warn("Geocoding failed, using default.");
        setResolvedLatLng(DEFAULT_COORDINATES);
      }
    };

    fetchCoordinates();
  }, [lat, lng, city, country]);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_GOOGLE_API_KEY!,
  });

  if (!isLoaded || !resolvedLatLng)
    return (
      <div className="h-[500px] w-full bg-muted rounded-md animate-pulse" />
    );

  if (loadError) return <div>{loadError.message}</div>;

  return (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "500px",
        borderRadius: "8px",
      }}
      center={resolvedLatLng}
      zoom={14}
      options={{ disableDefaultUI: true, zoomControl: true }}
    >
      <Marker position={resolvedLatLng} />
    </GoogleMap>
  );
};

export default VenueMap;
