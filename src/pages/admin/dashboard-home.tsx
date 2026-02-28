import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Car,
  CheckCircle2,
  XCircle,
  ArrowRight,
  MoreHorizontal,
  Eye,
  Pencil,
} from "lucide-react";
import { getCars } from "@/api/cars";
import type { Car as CarType } from "@/types/car";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const StatCard = ({
  label,
  value,
  icon: Icon,
  color,
  delay,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="rounded-xl border border-border bg-card p-5 shadow-sm flex items-center gap-4"
  >
    <div className={`rounded-lg p-3 ${color}`}>
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
  </motion.div>
);

export const DashboardHome = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCars()
      .then(setCars)
      .catch(() => setError("Failed to load cars"))
      .finally(() => setLoading(false));
  }, []);

  const available = cars.filter((c) => c.status === "available").length;
  const sold = cars.filter((c) => c.status === "sold").length;
  const recent = cars.slice(0, 5);

  return (
    <div className="space-y-8 px-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Overview</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            A quick look at your fleet today.
          </p>
        </div>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Total Listings"
            value={cars.length}
            icon={Car}
            color="bg-primary/10 text-primary"
            delay={0}
          />
          <StatCard
            label="Available"
            value={available}
            icon={CheckCircle2}
            color="bg-green-500/10 text-green-600"
            delay={0.07}
          />
          <StatCard
            label="Sold"
            value={sold}
            icon={XCircle}
            color="bg-red-500/10 text-red-500"
            delay={0.14}
          />
        </div>
      )}

      {/* Recent listings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground">
            Recent Listings
          </h2>
          <Link
            to="/admin/dashboard/cars"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="space-y-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-12 rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : (
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-16">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recent.map((car, i) => (
                  <motion.tr
                    key={car.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="group border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    <TableCell>
                      <img
                        src={car.image}
                        alt={car.title}
                        className="h-10 w-14 object-cover rounded-md border border-border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/56x40?text=No+img";
                        }}
                      />
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      {car.title}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {car.brand}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {car.year}
                    </TableCell>
                    <TableCell className="font-semibold">
                      ${car.price.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          car.status === "available"
                            ? "bg-green-500/90 text-white hover:bg-green-500/90"
                            : "bg-red-500/90 text-white hover:bg-red-500/90"
                        }
                      >
                        {car.status === "available" ? "Available" : "Sold"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="cursor-pointer"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() =>
                              navigate(`/admin/dashboard/cars/${car.id}/view`)
                            }
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() =>
                              navigate(`/admin/dashboard/cars/${car.id}`)
                            }
                          >
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};
