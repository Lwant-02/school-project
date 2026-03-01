import type { Car } from "@/types/car";
import CarCard from "./car-card";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchX } from "lucide-react";
import { motion } from "motion/react";

interface CarGridProps {
  cars: Car[];
  isLoading?: boolean;
}

const CarCardSkeleton = () => (
  <div className="flex flex-col overflow-hidden rounded-xl border border-border">
    <Skeleton className="h-52 w-full rounded-none" />
    <div className="flex flex-col gap-3 p-4">
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-5 w-48" />
      <Skeleton className="h-7 w-28" />
      <div className="flex gap-4">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-14" />
      </div>
      <Skeleton className="mt-2 h-9 w-full" />
    </div>
  </div>
);

const CarGrid = ({ cars, isLoading = false }: CarGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center gap-4 py-24 text-center"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <SearchX className="h-9 w-9 text-muted-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">ไม่พบรถยนต์</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            ลองปรับการค้นหาหรือตัวกรองของคุณ
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {cars.map((car, index) => (
        <CarCard key={car.id} car={car} index={index} />
      ))}
    </div>
  );
};

export default CarGrid;
