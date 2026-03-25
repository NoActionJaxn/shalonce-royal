import classNames from "classnames";

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode | React.ReactNode[];
}

export default function PageContainer({ children, className, ...rest }: PageContainerProps) {
  return (
    <div className={classNames("flex flex-col w-full h-auto min-h-full", className)} {...rest}>
      {children}
    </div>
  );
}
