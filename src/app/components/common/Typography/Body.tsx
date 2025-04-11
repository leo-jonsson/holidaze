interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: "default" | "secondary";
}

const Body: React.FC<TypographyProps> = ({
  children,
  variant = "default",
  ...props
}) => {
  return (
    <h1
      className={`text-sm ${
        variant === "secondary" ? "text-muted-foreground" : "text-foreground"
      }`}
      {...props}
    >
      {children}
    </h1>
  );
};

export default Body;
