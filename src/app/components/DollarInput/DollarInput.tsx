import React from "react";
import Input from "../common/Input";

interface DollarInputProps {
  value: number;
  onChange: (value: number) => void;
}

function DollarInput({ value, onChange }: DollarInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const stringValue = e.target.value;
    const numberValue = parseFloat(stringValue);
    if (!isNaN(numberValue)) {
      onChange(numberValue);
    } else {
      onChange(0);
    }
  };

  return (
    <div className="relative max-w-[20rem] w-full">
      <Input
        className="peer ps-6 pe-12"
        placeholder="0.00"
        type="text"
        value={value.toString()}
        onChange={handleInputChange}
      />
      <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
        $
      </span>
      <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
        Swedish Dollars
      </span>
    </div>
  );
}

export { DollarInput };
