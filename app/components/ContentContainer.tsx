import classNames from "classnames";

export interface ContentContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode | React.ReactNode[];
}

export default function ContentContainer({ children, className, ...rest }: ContentContainerProps) {
  return (
    <div className={classNames("grow", className)} {...rest}>
      {children}
    </div>
  );
}
