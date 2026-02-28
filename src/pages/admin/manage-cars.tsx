import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  CheckCheck,
} from "lucide-react";
import { getCars, deleteCar, updateCar } from "@/api/cars";
import type { Car } from "@/types/car";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const ManageCars = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Car | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = () => {
    setLoading(true);
    getCars()
      .then(setCars)
      .catch(() => setError("Failed to load cars."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleMarkSold = async (car: Car) => {
    try {
      const updated = await updateCar(car.id, { status: "sold" });
      setCars((prev) => prev.map((c) => (c.id === car.id ? updated : c)));
    } catch {
      setError("Failed to update status.");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteCar(deleteTarget.id);
      setCars((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch {
      setError("Failed to delete car.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6 px-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manage Cars</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {loading
              ? "Loading…"
              : `${cars.length} listing${cars.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <Link to="/admin/dashboard/cars/new">
          <Button className="gap-2 cursor-pointer w-32 h-10">
            <Plus className="h-4 w-4" />
            Add Car
          </Button>
        </Link>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

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
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 7 }).map((__, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-5 w-full rounded" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : cars.map((car, i) => (
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
                          {car.status === "available" && (
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => handleMarkSold(car)}
                            >
                              <CheckCheck className="h-4 w-4 mr-2" />
                              Mark as Sold
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive cursor-pointer focus:text-destructive"
                            onClick={() => setDeleteTarget(car)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Listing</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {deleteTarget?.title}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              disabled={deleting}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
              className="cursor-pointer"
            >
              {deleting ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
