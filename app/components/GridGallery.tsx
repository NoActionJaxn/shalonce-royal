import { useState } from "react";
import Image from "~/components/Image";
import type { SanityImage } from "~/types/sanity";
import CloseButton from "./CloseButton";

export interface GridGalleryProps {
  title?: string;
  images: SanityImage[];
}

export default function GridGallery({ title, images }: GridGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleOpen = (index: number) => {
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  const selectedImage = selectedIndex != null && images ? images[selectedIndex] : undefined;

  return (
    <>
      {title && <h2 className="text-2xl font-bold px-4 pt-8">{title}</h2>}
      <section aria-label="Gallery" className="py-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {images.map((image, index) => (
            <figure key={index} className="relative aspect-square overflow-hidden cursor-pointer">
              <Image
                asset={image.asset._ref}
                className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
                onClick={() => handleOpen(index)}
              />
            </figure>
          ))}
        </div>
      </section>
      {selectedImage && (
        <div
          className="fixed m-0! inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          onClick={handleClose}
        >
          <div className="relative max-h-full max-w-4xl">
            <CloseButton onClick={handleClose} />
            <figure>
              <Image
                asset={selectedImage.asset._ref}
                className="max-h-[80vh] w-auto object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </figure>
          </div>
        </div>
      )}
    </>
  );
}
