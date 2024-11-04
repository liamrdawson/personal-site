interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5;
  children: React.ReactNode;
}

export const Heading = ({ level = 1, children }: HeadingProps) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  const classes = `font-heading text-h${level} font-h${level} leading-h${level} tracking-h${level}`;
  return <HeadingTag className={classes}>{children}</HeadingTag>;
};
