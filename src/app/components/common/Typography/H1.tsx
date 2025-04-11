interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement> {
  bold?: boolean;
}

const H1: React.FC<TypographyProps> = ({ title, bold = false, ...props }) => {
  return (
    <h1
      className={`text-2xl sm:text-4xl md:text-7xl ${bold ?? "text-bold"}`}
      {...props}
    >
      {title}
    </h1>
  );
};

export default H1;
