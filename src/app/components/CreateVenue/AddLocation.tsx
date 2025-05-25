// src/app/components/CreateVenue/Step2LocationSelector.tsx
import React, { useRef } from "react";
import Typography from "../common/Typography";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";

type LocationData = {
  address: string;
  city: string;
  zip: string;
  country: string;
  lat: number;
  lng: number;
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
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

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
        onLocationChange(() => null);
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
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
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

export default Step2LocationSelector;
