import { ArrowLeft, ArrowRight, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "./Button"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { motion, AnimatePresence } from "framer-motion"

export interface Gallery4Item {
  id: string
  title: string
  description: string
  href: string
  image: string
}

export interface Gallery4Props {
  title?: string
  description?: string
  items: Gallery4Item[]
}

const Gallery4 = ({
  title = "Gallery",
  description = "Browse through the gallery.",
  items,
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const [activeImage, setActiveImage] = useState<string | null>(null)

  useEffect(() => {
    if (!carouselApi) return

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
      setCurrentSlide(carouselApi.selectedScrollSnap())
    }

    updateSelection()
    carouselApi.on("select", updateSelection)

    // Autoplay: desliza a cada 5s
    const autoplay = setInterval(() => {
      carouselApi.scrollNext()
    }, 5000)

    return () => {
      carouselApi.off("select", updateSelection)
      clearInterval(autoplay)
    }
  }, [carouselApi])

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
                  onClick={() => setActiveImage(item.image)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105 rounded-xl aspect-[16/9]"
                  />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-primary" : "bg-primary/20"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
          >
            <div className="relative max-w-5xl w-full max-h-full">
              <motion.img
                src={activeImage}
                alt="Preview"
                className="rounded-lg max-h-[80vh] mx-auto"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              />
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-2 right-2 bg-white text-black p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export { Gallery4 }
