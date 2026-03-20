import { Link, useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import MenuButton from "./MenuButton";
import Container from "./Container";
import type { CallToAction } from "~/types/cta";
import type { SanityImage } from "~/types/sanity";
import Image from "./Image";

interface HeaderProps {
  logo?: SanityImage;
  menu: CallToAction[];
  isOpen?: boolean;
  toggleMenu?: () => void;
}

export default function Header({ menu, logo, isOpen = false, toggleMenu }: HeaderProps) {
  const location = useLocation();
  const headerRef = useRef<HTMLElement | null>(null);
  const [isOverDark, setIsOverDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function isPointOverDark(x: number, y: number) {
      const stack = document.elementsFromPoint(x, y);
      for (const el of stack) {
        if (el?.closest("[data-dark]")) return true;
      }
      return false;
    }

    function update() {
      setIsScrolled(window.scrollY > 0);

      const header = headerRef.current;
      if (!header) return;
      const rect = header.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.bottom + 1;
      setIsOverDark(isPointOverDark(x, y));
    }

    // Run once now and again on next frame to catch route paint
    update();
    const raf = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    document.addEventListener("scroll", update, { passive: true, capture: true });
    window.addEventListener("touchmove", update, { passive: true });
    window.addEventListener("wheel", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      document.removeEventListener("scroll", update, { capture: true });
      window.removeEventListener("touchmove", update);
      window.removeEventListener("wheel", update);
      window.removeEventListener("resize", update);
    };
  }, [isOpen, location.pathname]);
  return (
    <header
      ref={headerRef}
      className={classNames(
        "fixed top-0 left-0 w-full z-40 transition-colors duration-300",
        isScrolled
          ? isOverDark
            ? "bg-black/80 backdrop-blur-md"
            : "bg-white/80 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <Container fluid className="flex justify-between items-center h-28">
        <Link to="/" className="flex items-center gap-2">
          <div className={isOverDark ? "text-slate-100" : "text-slate-900"}>
            {logo ? (
              <div className="w-42">
                <Image className="w-full" asset={logo.asset._ref} />
              </div>
            ) : (
              <div>
                <span className="text-lg font-semibold tracking-tight">Shalancé Royal</span>
              </div>
            )}
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={classNames(
                "text-sm font-medium transition-colors",
                isOverDark
                  ? "text-slate-100 hover:text-slate-200"
                  : "text-slate-900 hover:text-slate-700",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <MenuButton isOpen={isOpen} onClick={toggleMenu} />
      </Container>
    </header>
  );
}
