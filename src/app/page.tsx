import Button from "./components/common/Button";
import Section from "./components/common/Section";
import Typography from "./components/common/Typography";

export default function Home() {
  return (
    <Section className="min-h-screen">
      <Typography.H1 title="Welcome" bold />
      <Button title="hej" />
    </Section>
  );
}
