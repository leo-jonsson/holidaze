import Typography from "@/app/components/common/Typography";
import Link from "next/link";

type Props = {
  city: string;
  country: string;
};

export default function Recommendations({ city, country }: Props) {
  const query = encodeURIComponent(`Things to do in ${city}, ${country}`);
  const url = `https://www.google.com/search?q=${query}`;

  return (
    <div className="mt-6">
      <Typography.H2
        label={`Enjoy your stay in ${city}`}
        className="text-xl mb-1"
      />
      <span className="text-sm mr-1">
        Curious about what to do around {city}?
      </span>
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline text-sm"
      >
        Read more on Google
      </Link>
      .
    </div>
  );
}
