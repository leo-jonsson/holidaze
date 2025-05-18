import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Section: React.FC<Props> = ({ children, className }) => {
  return (
    <section
      className={cn(
        "flex flex-col justify-center items-center m-auto px-2",
        className
      )}
    >
      {children}
    </section>
  );
};

export default Section;
