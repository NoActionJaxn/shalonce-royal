import classNames from "classnames";

export type CloseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function CloseButton({ onClick, className, ...rest }: CloseButtonProps) {
  return (
    <button
      type="button"
      className={classNames(
        "absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white",
        className,
      )}
      onClick={onClick}
      aria-label="Close image preview"
      {...rest}
    >
      <span className="sr-only">Close</span>
      <i className="fa-solid fa-xmark" aria-hidden="true" />
    </button>
  );
}
