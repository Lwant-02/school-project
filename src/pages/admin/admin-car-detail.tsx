import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Loader,
  Pencil,
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  DollarSign,
} from "lucide-react";
import { getCarById } from "@/api/cars";
import type { Car } from "@/types/car";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const parseCreatedAt = (val: string | number): Date => {
  const n = Number(val);
  if (!isNaN(n)) return new Date(n < 1e10 ? n * 1000 : n);
  return new Date(val as string);
};

const Spec = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3">
    <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  </div>
);

export const AdminCarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCarById(id!)
      .then(setCar)
      .catch(() => setError("Failed to load car."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="space-y-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="gap-2 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <p className="text-sm text-destructive">{error || "Car not found."}</p>
      </div>
    );
  }

  return (
    <div className="w-full px-5 space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => navigate("/admin/dashboard/cars")}
          className="cursor-pointer shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground flex-1 truncate">
          {car.title}
        </h1>
        <Link to={`/admin/dashboard/cars/${car.id}`}>
          <Button className="gap-2 cursor-pointer w-32 h-10">
            <Pencil className="h-3.5 w-3.5" /> Edit
          </Button>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-xl border border-border overflow-hidden shadow-sm"
      >
        {/* Image */}
        <div className="relative h-64 bg-muted">
          <img
            src={car.image}
            alt={car.title}
            className={`h-full w-full object-cover ${car.status === "sold" ? "grayscale" : ""}`}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://placehold.co/600x256?text=No+Image";
            }}
          />
          <div className="absolute top-3 right-3">
            <Badge
              className={
                car.status === "available"
                  ? "bg-green-500/90 text-white hover:bg-green-500/90"
                  : "bg-red-500/90 text-white hover:bg-red-500/90"
              }
            >
              {car.status === "available" ? "Available" : "Sold"}
            </Badge>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 space-y-5 bg-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {car.brand}
              </p>
              <h2 className="text-xl font-bold text-foreground">{car.title}</h2>
            </div>
            <div className="text-2xl font-bold text-foreground shrink-0">
              ${car.price.toLocaleString()}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Spec icon={Calendar} label="Year" value={car.year} />
            <Spec
              icon={Gauge}
              label="Mileage"
              value={`${car.mileage.toLocaleString()} km`}
            />
            <Spec icon={Fuel} label="Fuel" value={car.fuelType} />
            <Spec
              icon={Settings2}
              label="Transmission"
              value={car.transmission}
            />
            <Spec
              icon={DollarSign}
              label="Price"
              value={`$${car.price.toLocaleString()}`}
            />
          </div>

          {car.description && (
            <div>
              <p className="text-sm font-medium text-foreground mb-1.5">
                Description
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {car.description}
              </p>
            </div>
          )}

          <p className="text-xs text-muted-foreground border-t border-border pt-4">
            Listed on{" "}
            {parseCreatedAt(car.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </motion.div>
    </div>
  );
};
