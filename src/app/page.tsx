import Section from "./components/common/Section";
import Typography from "./components/common/Typography";

export default function Home() {
  const test = process.env.API_KEY;

  console.log(test);
  return (
    <Section className="min-h-screen">
      <Typography.H1 label="Welcome" />
    </Section>
  );
}
