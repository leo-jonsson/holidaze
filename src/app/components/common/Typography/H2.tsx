interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: "default" | "bold";
}

const H2: React.FC<TypographyProps> = ({
  children,
  variant = "default",
  ...props
}) => {
  return (
    <h1
      className={`text-lg sm:text-xl  md:text-2xl ${
        variant === "bold" ? "text-bold" : ""
      }`}
      {...props}
    >
      {children}
    </h1>
  );
};

export default H2;
