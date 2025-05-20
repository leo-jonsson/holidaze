interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement> {
  bold?: boolean;
}

const H2: React.FC<TypographyProps> = ({
  label: title,
  bold = false,
  ...props
}) => {
  return (
    <h2
      className={`text-lg sm:text-xl md:text-3xl ${
        bold ? "font-bold" : "font-medium"
      }`}
      {...props}
    >
      {title}
    </h2>
  );
};

export default H2;
