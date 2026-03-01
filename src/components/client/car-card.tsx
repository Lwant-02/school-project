import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Fuel, Gauge, Calendar, ArrowRight, Zap, Cog } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Car } from "@/types/car";

interface CarCardProps {
  car: Car;
  index: number;
}

const fuelIcon = (fuel: Car["fuelType"]) => {
  if (fuel === "Electric") return <Zap className="h-3.5 w-3.5" />;
  return <Fuel className="h-3.5 w-3.5" />;
};

const CarCard = ({ car, index }: CarCardProps) => {
  const isSold = car.status === "sold";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
    >
      <Card className="group flex h-full flex-col cursor-pointer overflow-hidden border-border/60 p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {/* Image */}
        <div className="relative h-52 overflow-hidden bg-muted">
          <img
            src={car.image}
            alt={car.title}
            className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              isSold ? "grayscale" : ""
            }`}
          />

          {/* Status badge */}
          <div className="absolute right-3 top-3">
            <Badge
              className={
                isSold
                  ? "bg-red-500/90 text-white hover:bg-red-500/90"
                  : "bg-green-500/90 text-white hover:bg-green-500/90"
              }
            >
              {isSold ? "ขายแล้ว" : "มีจำหน่าย"}
            </Badge>
          </div>

          {/* Year bubble */}
          <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {car.year}
          </div>
        </div>

        <CardContent className="flex flex-1 flex-col gap-3 p-4">
          {/* Title & brand */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {car.brand}
            </p>
            <h3 className="mt-0.5 line-clamp-1 text-base font-semibold leading-snug text-foreground">
              {car.title}
            </h3>
          </div>

          {/* Price */}
          <div className="text-2xl font-bold text-foreground">
            ${car.price.toLocaleString()}
          </div>

          {/* Specs row */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {car.year}
            </span>
            <span className="flex items-center gap-1">
              <Gauge className="h-3.5 w-3.5" />
              {car.mileage.toLocaleString()} km
            </span>
            <span className="flex items-center gap-1">
              {fuelIcon(car.fuelType)}
              {car.fuelType}
            </span>
            <span className="flex items-center gap-1">
              <Cog className="h-3.5 w-3.5" />
              {car.gear}
            </span>
          </div>
        </CardContent>

        <CardFooter className="px-4 pb-4 pt-0">
          <Link to={`/car/${car.id}`} className="w-full">
            <Button
              variant={isSold ? "secondary" : "default"}
              className="w-full gap-2 h-11 cursor-pointer"
              disabled={isSold}
            >
              {isSold ? "ไม่มีจำหน่าย" : "ดูรายละเอียด"}
              {!isSold && <ArrowRight className="h-4 w-4" />}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CarCard;
