"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { LoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const libraries: ["places"] = ["places"];

const GoogleMapsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  // TODO: Look into how to improve rendering of google map comp
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}
      libraries={libraries}
      onError={(error) => console.error("Google Maps script error:", error)}
    >
      {children}
    </LoadScript>
  );
};

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GoogleMapsProvider>{children}</GoogleMapsProvider>
      </Provider>
    </QueryClientProvider>
  );
}
