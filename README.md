# Holidaze

This project is a venue booking platform built with Next.js, integrating with the Noroff API for venue data and booking functionality. It utilizes several modern technologies to provide a rich and interactive user experience, including OpenAI via the Vercel AI SDK, Google Maps API, Shadcn UI for components, and Framer Motion for animations.

## Features

- **Venue Listing:** Browse a list of available venues fetched from the Noroff API.
- **Venue Details:** View detailed information about each venue, including descriptions, amenities, and booking options.
- **Booking Functionality:** Users can book venues based on available dates and guest capacity (integrates with the Noroff API).
- **User Authentication:** Secure user authentication to manage bookings and profile information.
- **AI Integration (OpenAI via Vercel AI SDK):** (Potential future feature or current limited use) Could be used for features like:
    - Generate a description for a venue in creation mode
- **Google Maps API:** Display venue locations on an interactive map.
- **Shadcn UI:** Provides a set of accessible and customizable UI components built on top of Tailwind CSS.
- **Framer Motion:** Enhance the user interface with smooth and engaging animations.

## Technologies Used

- **Next.js:** React framework for server-side rendering, static site generation, and API routes.
- **Noroff API:** Provides venue data and booking endpoints.
- **OpenAI (via Vercel AI SDK):** For integrating AI capabilities.
- **Google Maps API:** For displaying maps and venue locations.
- **Shadcn UI:** Component library based on Tailwind CSS.
- **Tailwind CSS:** Utility-first CSS framework for rapid styling.
- **Framer Motion (Motion):** Animation library for React.
- **Vercel:** Deployment platform.

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Noroff API Key
- Google Maps API Key
- OpenAI API Key
- Uploadthing API Secret / Token

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/leo-jonsson/holidaze
   cd holidaze
   code .
   ```

2. **Insert .env variables:**
    ***Look at .env.example
   ```bash
   NEXT_PUBLIC_API_KEY = heregoesthekey
   NEXT_PUBLIC_GOOGLE_API_KEY = heregoestheotherkey
   UPLOADTHING_TOKEN = heregoesthethirdkey
   OPENAI_API_KEY = heregoesthefourthkey
   ```   

3. **Run it locally:**

   ```bash
   npm run dev
   ```

