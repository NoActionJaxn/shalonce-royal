import React from "react";
import { imageBuilder } from "~/util/imageBuilder";

interface SanityImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  asset?: string;
}

const Image = ({ asset, ...rest }: SanityImageProps) => {
  function urlFor(source: string) {
    return imageBuilder(source);
  }

  return <img src={asset ? urlFor(asset).url() : undefined} {...rest} />;
};

Image.displayName = "Image";

export default Image;
