import { Venue } from "@/api/types/venues";
import React from "react";
import Typography from "../common/Typography";
import Link from "next/link";
import { buttonVariants } from "../common/Button/Button";

// TODO, fix venue typing

type Step5Props = {
  isActive: boolean;
  venue: {
    id: string;
    name: string;
  };
};

const Step5Success: React.FC<Step5Props> = ({ isActive, venue }) => {
  return (
    <div
      className={`${
        isActive ? "" : "hidden"
      } flex flex-col justify-between h-full min-h-[400px]`}
    >
      <div className="grid">
        <Typography.H1 label="Success!" />
        <Typography.H2 label={`New listing created for ${venue.name}`} />
      </div>
      <Link
        href={`/venues/${venue.id}`}
        className={buttonVariants({ variant: "default" })}
      >
        Check it out!
      </Link>
    </div>
  );
};

export default Step5Success;
