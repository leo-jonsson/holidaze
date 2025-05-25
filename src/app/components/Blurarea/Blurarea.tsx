import { Loader2 } from "lucide-react";
import React from "react";

const Blurarea = () => {
  return (
    <div className="absolute inset-0 size-full bg-black/30 rounded-md backdrop-blur-lg flex items-center justify-center z-10">
      <Loader2 className="animate-spin text-white" />
    </div>
  );
};

export default Blurarea;
