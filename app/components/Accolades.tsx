import Container from "~/components/Container";
import type { WrestlingAccolade } from "~/types/sanity";
import { LinkButton } from "./Buttons";

export interface AccoladesProps {
  accolades: WrestlingAccolade[];
  title?: string;
  className?: string;
}

export default function Accolades({ accolades, className = "" }: AccoladesProps) {
  const topThree: WrestlingAccolade[] = (accolades || [])
    .slice() // copy
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
    .slice(0, 3);

  if (topThree.length === 0) return null;

  return (
    <Container className={className} fluid>
      <Container className="mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 h-full">
          {topThree.map((item) => (
            <div key={item._id} className="flex flex-col justify-between min-h-72 py-8">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-sm opacity-80">{item.description}</p>
                <p className="text-xs opacity-60">{item.year}</p>
              </div>
              <div className="flex justify-start pt-8">
                {item.link && (
                  <LinkButton
                    to={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium"
                  >
                    Learn More
                  </LinkButton>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Container>
  );
}
