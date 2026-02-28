import { motion } from "motion/react";
import { Fuel, Gauge, Settings2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onScrollToListings: () => void;
}

const HeroSection = ({ onScrollToListings }: HeroSectionProps) => {
  return (
    <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&auto=format&fit=crop&q=85"
        alt="Luxury car on scenic road"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Dark gradient overlay — stronger on the left for legibility */}
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />

      {/* Content — bottom-left aligned, like the reference */}
      <div className="relative flex h-full flex-col justify-end pb-20 pl-8 sm:pl-14 lg:pl-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-lg"
        >
          {/* Featured label */}
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-white/60">
            Featured Listing
          </p>

          {/* Price */}
          <p className="mb-2 text-2xl font-semibold text-white/90 sm:text-3xl">
            $28,000
          </p>

          {/* Car title */}
          <h1 className="mb-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            BMW 320i,
            <br />
            2021
          </h1>

          {/* Spec pills */}
          <div className="mb-8 flex flex-wrap gap-5 text-sm text-white/75">
            <span className="flex items-center gap-1.5">
              <Fuel className="h-4 w-4" />
              Petrol
            </span>
            <span className="flex items-center gap-1.5">
              <Gauge className="h-4 w-4" />
              30,000 km
            </span>
            <span className="flex items-center gap-1.5">
              <Settings2 className="h-4 w-4" />
              Automatic
            </span>
          </div>

          {/* CTA */}
          <Button
            onClick={onScrollToListings}
            size="lg"
            className="gap-2 cursor-pointer rounded-full bg-white px-7 text-sm font-semibold text-zinc-900 shadow-lg hover:bg-zinc-100"
          >
            View All Listings
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
