import type { SanityBlock, SanityImage } from "~/types/sanity";
import Container, { type ContainerProps } from "./Container";
import RichText from "./RichText";
import { imageBuilder } from "~/util/imageBuilder";
import classNames from "classnames";

export interface HeroProps extends Omit<ContainerProps, "content"> {
  title: string;
  subTitle: string;
  content: SanityBlock[];
  backgroundImage?: SanityImage;
}

export default function Hero({
  title,
  subTitle,
  content,
  backgroundImage,
  className,
  ...rest
}: HeroProps) {
  return (
    <Container className={classNames("relative py-8", className)} fluid {...rest}>
      {backgroundImage && (
        <div
          aria-hidden
          className="absolute inset-0 hidden md:block bg-no-repeat bg-contain"
          style={{
            backgroundImage: `url(${imageBuilder(backgroundImage.asset._ref).url()})`,
            backgroundPosition: "center bottom",
          }}
        />
      )}
      <Container className="grid grid-cols-1 md:grid-cols-2 min-h-75 md:h-100 lg:h-150 gap-16 py-20">
        <div />
        <div className="">
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl">{title}</h1>
              <h2 className="text-2xl">{subTitle}</h2>
            </div>
            <RichText value={content} />
          </div>
        </div>
      </Container>
    </Container>
  );
}
