interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement> {
  bold?: boolean;
  label: string;
}

const H1: React.FC<TypographyProps> = ({
  label: title,
  bold = false,
  ...props
}) => {
  return (
    <h1
      className={`text-2xl sm:text-4xl md:text-7xl ${
        bold ? "font-bold" : "font-medium"
      }`}
      {...props}
    >
      {title}
    </h1>
  );
};

export default H1;
