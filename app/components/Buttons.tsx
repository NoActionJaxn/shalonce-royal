import classNames from "classnames";
import { Link, type LinkProps } from "react-router";

interface RootButtonProps {
  fullWidth?: boolean;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, RootButtonProps {}

export interface LinkButtonProps extends LinkProps, RootButtonProps {}

export function Button({ fullWidth = false, className = "", ...rest }: ButtonProps) {
  return (
    <button
      className={classNames(
        "inline-flex items-center justify-center bg-gray-950 px-5 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2",
        { "w-full": fullWidth },
        className,
      )}
      {...rest}
    />
  );
}

export function LinkButton({ fullWidth = false, className = "", ...rest }: LinkButtonProps) {
  return (
    <Link
      className={classNames(
        "inline-flex items-center justify-center bg-gray-950 px-5 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2",
        { "w-full": fullWidth },
        className,
      )}
      {...rest}
    />
  );
}
