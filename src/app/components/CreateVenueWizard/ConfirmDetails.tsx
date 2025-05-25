import React, { useState } from "react";
import Typography from "../common/Typography";
import Input from "../common/Input";
import Label from "../common/Label";
import Textarea from "../common/Textarea";
import DollarInput from "../DollarInput";

type LocationData = {
  address: string;
  city: string;
  zip: string;
  country: string;
  lat: number;
  lng: number;
};

interface Step4ConfirmProps {
  description: string;
  name: string;
  price: number;
  locationData: LocationData | null;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onPriceChange: (value: number) => void;
  address: string;
  city: string;
  zip: string;
  country: string;
  onAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onZipChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCountryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isActive: boolean;
  onSubmit: () => void;
}

const Step4Confirm: React.FC<Step4ConfirmProps> = ({
  description,
  name,
  price,
  onNameChange,
  onDescriptionChange,
  onPriceChange,
  address,
  city,
  zip,
  country,
  onAddressChange,
  onCityChange,
  onZipChange,
  onCountryChange,
  isActive,
  onSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`grid gap-6 mt-4 w-full ${isActive ? "" : "hidden"}`}
      noValidate
    >
      <Typography.H2 label="Step 4: Confirm Venue Details" />
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="venue-name-confirm">Venue Name:</Label>
          <Input
            id="venue-name-confirm"
            value={name}
            onChange={onNameChange}
            placeholder="My super duper cozy cabin"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="venue-description-confirm">Description:</Label>
          <Textarea
            id="venue-description-confirm"
            placeholder="Write your venue description here..."
            value={description}
            onChange={onDescriptionChange}
            rows={8}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="venue-price-confirm">Price per night:</Label>
            <DollarInput value={price} onChange={onPriceChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="venue-address-confirm">Address:</Label>
            <Input
              required
              id="venue-address-confirm"
              value={address}
              onChange={onAddressChange}
              placeholder="Street Address"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="venue-city-confirm">City:</Label>
            <Input
              required
              id="venue-city-confirm"
              value={city}
              onChange={onCityChange}
              placeholder="City"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="venue-zip-confirm">Zip Code:</Label>
            <Input
              required
              id="venue-zip-confirm"
              value={zip}
              onChange={onZipChange}
              placeholder="Zip Code"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="venue-country-confirm">Country:</Label>
            <Input
              required
              id="venue-country-confirm"
              value={country}
              onChange={onCountryChange}
              placeholder="Country"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Step4Confirm;
