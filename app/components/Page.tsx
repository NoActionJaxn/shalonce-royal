import classNames from "classnames";
import React from "react";

export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  shouldSnap?: boolean;
  snapEnd?: boolean;
  noPadding?: boolean;
}

const Page = ({
  children,
  className = "",
  shouldSnap = true,
  snapEnd = false,
  noPadding = false,
  ...rest
}: PageProps) => {
  return (
    <div
      data-page
      className={classNames(
        "min-h-screen w-full",
        {
          "snap-start": shouldSnap && !snapEnd,
          "snap-end": shouldSnap && snapEnd,
          "py-20": !noPadding,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Page;
