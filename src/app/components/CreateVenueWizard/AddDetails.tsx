import React from "react";
import Typography from "../common/Typography";
import Textarea from "../common/Textarea";
import Blurarea from "../Blurarea";
import { buttonVariants } from "../common/Button/Button";
import Input from "../common/Input";
import Label from "../common/Label";
import DollarInput from "../DollarInput";
import GuestInput from "../GuestInput";

type Step3DescriptionProps = {
  description: string;
  name: string;
  price: number;
  maxGuests: number;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onPriceChange: (value: number) => void;
  onMaxGuestsChange: (value: number) => void;
  onGenerateDescription: () => Promise<void>;
  isGeneratingDescription: boolean;
  isActive: boolean;
};

const Step3Description: React.FC<Step3DescriptionProps> = ({
  onDescriptionChange,
  onNameChange,
  onGenerateDescription,
  onPriceChange,
  onMaxGuestsChange,
  price,
  description,
  name,
  maxGuests,
  isGeneratingDescription,
  isActive,
}) => {
  return (
    <div className={`grid gap-4 mt-4 w-full ${isActive ? "" : "hidden"}`}>
      <Typography.H2 label="Step 3: Add Description" />
      <div className="grid gap-2">
        <Label>What&apos;s the name of this venue?</Label>
        <Input
          onChange={onNameChange}
          value={name}
          placeholder="My super duper cozy cabin"
        />
      </div>
      <div className="grid gap-1">
        <Label>Provide details</Label>
        <div className="relative">
          <Textarea
            placeholder="Write your venue description here..."
            value={description}
            onChange={onDescriptionChange}
            rows={12}
          />
          {isGeneratingDescription && <Blurarea />}
        </div>
      </div>
      <Label>
        We recommend that you use our new ai-tool to generate a description for
        your venue. This can result in good things! (beta)
      </Label>
      <div className="max-w-sm">
        <button
          onClick={onGenerateDescription}
          disabled={isGeneratingDescription}
          className={buttonVariants({ variant: "outline" })}
        >
          Generate with gpt-4o ✨
        </button>
      </div>
      <div className="flex md:flex-row flex-col gap-4 w-full justify-between">
        <div className="grid gap-2">
          <Label>The price / night of this venue</Label>
          <DollarInput onChange={onPriceChange} value={price} />
        </div>
        <div className="grid gap-2">
          <Label>How many guests can stay?</Label>
          <GuestInput
            onValueChange={onMaxGuestsChange}
            value={maxGuests}
            maxGuest={50}
          />
        </div>
      </div>
    </div>
  );
};

export default Step3Description;
