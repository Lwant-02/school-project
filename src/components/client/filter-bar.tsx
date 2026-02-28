import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { FuelType, Transmission, CarStatus } from "@/types/car";

export interface FilterState {
  search: string;
  brand: string;
  fuelType: FuelType | "all";
  transmission: Transmission | "all";
  status: CarStatus | "all";
  sortBy: "newest" | "price-asc" | "price-desc" | "mileage";
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  totalResults: number;
}

const BRANDS = [
  "Toyota",
  "Honda",
  "BMW",
  "Tesla",
  "Ford",
  "Mercedes-Benz",
  "Mazda",
  "Nissan",
];

const FilterBar = ({
  filters,
  onFilterChange,
  totalResults,
}: FilterBarProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const update = (partial: Partial<FilterState>) =>
    onFilterChange({ ...filters, ...partial });

  const hasActiveFilters =
    filters.brand !== "all" ||
    filters.fuelType !== "all" ||
    filters.transmission !== "all" ||
    filters.status !== "all";

  const clearAll = () =>
    onFilterChange({
      search: "",
      brand: "all",
      fuelType: "all",
      transmission: "all",
      status: "all",
      sortBy: "newest",
    });

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-background/95 py-6 backdrop-blur-md">
      <div className="layout">
        {/* Search row */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by title, brand or model…"
              className="pl-9 h-11 focus:ring-1!"
              value={filters.search}
              onChange={(e) => update({ search: e.target.value })}
            />
            {filters.search && (
              <button
                onClick={() => update({ search: "" })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <Button
            variant={showFilters ? "default" : "outline"}
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2 shrink-0 h-11"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary-foreground text-[10px] font-bold text-primary">
                !
              </span>
            )}
          </Button>

          {/* Sort */}
          <Select
            value={filters.sortBy}
            onValueChange={(val) =>
              update({ sortBy: val as FilterState["sortBy"] })
            }
          >
            <SelectTrigger className="w-40 shrink-0 h-11!">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-asc">Lowest Price</SelectItem>
              <SelectItem value="price-desc">Highest Price</SelectItem>
              <SelectItem value="mileage">Lowest Mileage</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Expandable filter row */}
        {showFilters && (
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {/* Brand */}
            <Select
              value={filters.brand}
              onValueChange={(val) => update({ brand: val })}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {BRANDS.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Fuel */}
            <Select
              value={filters.fuelType}
              onValueChange={(val) =>
                update({ fuelType: val as FilterState["fuelType"] })
              }
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Fuel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fuel Types</SelectItem>
                <SelectItem value="Petrol">Petrol</SelectItem>
                <SelectItem value="Diesel">Diesel</SelectItem>
                <SelectItem value="Electric">Electric</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>

            {/* Transmission */}
            <Select
              value={filters.transmission}
              onValueChange={(val) =>
                update({ transmission: val as FilterState["transmission"] })
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Transmission" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transmissions</SelectItem>
                <SelectItem value="Automatic">Automatic</SelectItem>
                <SelectItem value="Manual">Manual</SelectItem>
              </SelectContent>
            </Select>

            {/* Status */}
            <Select
              value={filters.status}
              onValueChange={(val) =>
                update({ status: val as FilterState["status"] })
              }
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="gap-1 text-muted-foreground"
              >
                <X className="h-3.5 w-3.5" />
                Clear all
              </Button>
            )}
          </div>
        )}

        {/* Results count */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {totalResults}
            </span>{" "}
            {totalResults === 1 ? "car" : "cars"}
          </span>
          {hasActiveFilters && (
            <Badge variant="secondary" className="text-xs">
              Filtered
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
