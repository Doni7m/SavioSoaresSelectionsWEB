import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface Gallery4WineItem {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface Gallery4WinesProps {
  title?: string;
  description?: string;
  items: Gallery4WineItem[];
  onWineClick: (id: string) => void;
}

const Gallery4Wines = ({
  title = "Our Wines",
  description = "Explore our selection of wines.",
  items,
  onWineClick,
}: Gallery4WinesProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    updateSelection();
    carouselApi.on("select", updateSelection);

    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="mb-10 flex items-end justify-between">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">{title}</h2>
            <p className="max-w-lg text-muted-foreground">{description}</p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-0">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[320px] pl-[20px] lg:max-w-[360px]"
              >
                <button
                  className="group relative h-full w-full overflow-hidden rounded-xl"
                  onClick={() => onWineClick(item.id)}
                >
                  {/* Adjust max-h-72 to change image size */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-96 w-full object-contain object-center transition-transform duration-300 group-hover:scale-105 rounded-xl"
                  />
                  <figcaption className="mt-2 text-center text-lg font-semibold text-inherit">
                    {item.title}
                  </figcaption>
                </button>
                <div className="mt-1 text-center">
                  <p className="text-sm line-clamp-2 text-inherit">{item.description}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={`dot-${index}`}

              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-primary" : "bg-primary/20"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery4Wines };
