interface TypographyProps extends React.HTMLAttributes<HTMLLabelElement> {
  variant?: "default" | "secondary";
  label: string;
  id?: string;
}

const Label: React.FC<TypographyProps> = ({
  label,
  variant = "default",
  id,
  ...props
}) => {
  return (
    <label
      htmlFor={id}
      className={`text-base ${
        variant === "secondary" ? "text-muted-foreground" : "text-foreground"
      }`}
      {...props}
    >
      {label}
    </label>
  );
};

export default Label;
