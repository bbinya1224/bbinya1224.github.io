import { X } from "lucide-react";
import { useEffect, useState } from "react";
import type { CarouselApi } from "@/ui/carousel/carousel.types";
import { Button } from "@/ui/Button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/ui/carousel/Carousel";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/ui/Dialog";

interface ImageCarouselProps {
  images: string[];
  alt?: string;
}

export const ImageCarousel = ({
  images,
  alt = "Carousel image",
}: ImageCarouselProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [modalApi, setModalApi] = useState<CarouselApi>();

  useEffect(() => {
    if (selectedIndex !== null) {
      setCurrentSlide(selectedIndex + 1);
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (!modalApi) return;
    const updateSlide = () => {
      setCurrentSlide(modalApi.selectedScrollSnap() + 1);
    };
    updateSlide();
    modalApi.on("select", updateSlide);
    modalApi.on("reInit", updateSlide);
    return () => {
      modalApi.off("select", updateSlide);
      modalApi.off("reInit", updateSlide);
    };
  }, [modalApi]);

  if (!images || images.length === 0) {
    return null;
  }

  const renderThumbnail = (
    src: string,
    index: number,
    loading: "eager" | "lazy" = "lazy",
  ) => (
    <div
      className="group relative aspect-[16/9] w-full cursor-pointer overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"
      onClick={() => setSelectedIndex(index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setSelectedIndex(index);
        }
      }}
      aria-label={`View image ${index + 1} in fullscreen`}
    >
      <img
        src={src}
        alt={`${alt} ${index + 1}`}
        className="absolute inset-0 h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        loading={loading}
      />
    </div>
  );

  return (
    <>
      <Dialog
        open={selectedIndex !== null}
        onOpenChange={(open) => !open && setSelectedIndex(null)}
      >
        <DialogContent className="max-w-7xl border-none bg-transparent p-0 shadow-none [&>button]:hidden">
          <DialogTitle className="sr-only">Image Gallery Modal</DialogTitle>
          <DialogDescription className="sr-only">이미지를 좌우로 넘겨 볼 수 있습니다.</DialogDescription>
          <div className="relative flex h-[80vh] w-full items-center justify-center">
            {selectedIndex !== null && (
              <div className="relative w-full">
                <Carousel
                  opts={{
                    startIndex: selectedIndex,
                    loop: images.length > 1,
                  }}
                  setApi={setModalApi}
                  className="w-full"
                >
                  <CarouselContent>
                    {images.map((image, index) => (
                      <CarouselItem key={`modal-${index}`}>
                        <div className="relative flex h-[80vh] w-full items-center justify-center">
                          <img
                            src={image}
                            alt={`${alt} ${index + 1}`}
                            className="absolute inset-0 h-full w-full object-contain"
                            loading={index === currentSlide - 1 ? "eager" : "lazy"}
                            decoding="async"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {images.length > 1 && (
                    <>
                      <CarouselPrevious className="left-4 h-12 w-12 border-none bg-black/50 text-white hover:bg-black/70" />
                      <CarouselNext className="right-4 h-12 w-12 border-none bg-black/50 text-white hover:bg-black/70" />
                    </>
                  )}
                </Carousel>

                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                    {currentSlide} / {images.length}
                  </div>
                )}

                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-4 right-4 z-50 rounded-full bg-black/50 text-white hover:bg-black/70"
                  onClick={() => setSelectedIndex(null)}
                  aria-label="Close image modal"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {images.length === 1 ? (
        <div className="not-prose relative mx-auto my-8 w-full max-w-4xl overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
          {renderThumbnail(images[0], 0, "eager")}
        </div>
      ) : (
        <div className="not-prose mx-auto my-8 w-full max-w-4xl px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={`thumbnail-${index}`}>
                  <div className="relative overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-800">
                    {renderThumbnail(image, index, index === 0 ? "eager" : "lazy")}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
    </>
  );
};
