interface TypographyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "default" | "secondary";
  label: string;
}

const Body: React.FC<TypographyProps> = ({
  label: text,
  variant = "default",
  ...props
}) => {
  return (
    <p
      className={`text-sm ${
        variant === "secondary" ? "text-muted-foreground" : "text-foreground"
      }`}
      {...props}
    >
      {text}
    </p>
  );
};

export default Body;
