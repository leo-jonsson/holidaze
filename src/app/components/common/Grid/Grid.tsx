import React from "react";
import { cn } from "@/lib/utils"; 

type Props = {
  cols: number;
  className?: string;
};

const Grid: React.FC<Props> = ({ cols, className }) => {
  return (
    <div
      className={cn(
        "grid gap-4 max-w-full w-full",
        `sm:grid-cols-${Math.max(cols - 2, 1)}`,
        `md:grid-cols-${Math.max(cols - 1, 1)}`,
        `lg:grid-cols-${cols}`,
        className
      )}
    />
  );
};

export default Grid;
