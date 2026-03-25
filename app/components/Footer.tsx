import type { CallToAction } from "~/types/cta";
import Container from "./Container";
import { Link } from "react-router";
import classNames from "classnames";

export interface FooterProps {
  logo?: React.ComponentType;
  menu?: CallToAction[];
  socials?: CallToAction[];
  description?: string;
}

export default function Footer({
  logo: Logo,
  menu = [],
  socials = [],
  description = "Shaloncé Royal",
}: FooterProps) {
  return (
    <footer className="bg-black py-12 mt-16">
      <Container fluid className="h-full">
        <div className="grid grid-cols-1 md:grid-cols-3 min-h-64 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="text-slate-200">
                {Logo && (
                  <div>
                    <Logo />
                  </div>
                )}
                <div>
                  <span className="text-lg font-semibold tracking-tight">Shaloncé Royal</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-span-1">
            {menu.length > 0 && (
              <nav className="mb-4 md:mb-0 space-y-2">
                <h2 className="text-slate-200 font-semibold">Menu</h2>
                <ul className="flex flex-col">
                  {menu.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className="text-sm font-medium text-slate-300 hover:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
          <div className="col-span-1 flex flex-col justify-between">
            <div>{description && <p className="text-sm text-slate-300 mb-4">{description}</p>}</div>
            {socials.length > 0 && (
              <div className="flex items-center justify-end gap-4">
                <h2 className="text-xs text-slate-300 uppercase">Follow Me</h2>
                <ul className="flex flex-wrap gap-4">
                  {socials.map((item) => (
                    <li key={item.path}>
                      <Link to={item.path} className="text-slate-300 text-xl">
                        <span className="sr-only">{item.label}</span>
                        <i className={classNames(item.icon?.prefix, item.icon?.iconName)} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
}
