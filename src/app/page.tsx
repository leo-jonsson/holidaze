import Link from "next/link";
import Section from "./components/common/Section";
import Typography from "./components/common/Typography";

export default function Home() {
  return (
    <Section className="min-h-[80vh]">
      <Link href={"/venues"}>
        <Typography.H1 label="Holidaze" />
      </Link>
    </Section>
  );
}
