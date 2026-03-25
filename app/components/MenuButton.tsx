import classNames from "classnames";

export interface MenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
}

export default function MenuButton({ isOpen, className, ...rest }: MenuButtonProps) {
  return (
    <button
      type="button"
      className={classNames(
        "md:hidden size-8 cursor-pointer border border-slate-500 rounded",
        isOpen ? "text-slate-200 hover:text-white" : "text-slate-500 hover:text-slate-900",
        className,
      )}
      {...rest}
    >
      <span className="sr-only">Toggle navigation menu</span>
      <i className={isOpen ? "fas fa-times" : "fas fa-bars"} />
    </button>
  );
}
