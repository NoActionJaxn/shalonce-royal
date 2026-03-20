import { Link } from "react-router";
import classNames from "classnames";
import type { CallToAction } from "~/types/cta";

export interface MobileMenuProps {
  menu: CallToAction[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function MobileMenu({ menu, isOpen, setIsOpen }: MobileMenuProps) {
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={classNames(
        "fixed inset-0 z-30 flex flex-col transition-opacity duration-200 bg-slate-950 md:hidden",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      )}
    >
      <nav className="flex flex-1 flex-col items-center justify-center gap-6">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="text-2xl font-semibold transition-colors text-white hover:text-slate-300"
            onClick={closeMenu}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
