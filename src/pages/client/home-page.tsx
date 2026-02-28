import { useRef, useMemo, useState, useEffect } from "react";
import HeroSection from "@/components/client/hero-section";
import FilterBar, { type FilterState } from "@/components/client/filter-bar";
import CarGrid from "@/components/client/car-grid";
import { getCars } from "@/api/cars";
import type { Car } from "@/types/car";
import { Loader } from "lucide-react";
import Navbar from "@/components/client/Navbar";
import Footer from "@/components/client/Footer";

// MockAPI returns `createdAt` as Unix seconds (e.g. 1740739443).
// JS Date() expects ms, so we multiply by 1000 when the value is < 1e10.
const parseCreatedAt = (val: string | number): Date => {
  const n = Number(val);
  if (!isNaN(n)) return new Date(n < 1e10 ? n * 1000 : n);
  return new Date(val as string);
};
const defaultFilters: FilterState = {
  search: "",
  brand: "all",
  fuelType: "all",
  transmission: "all",
  status: "all",
  sortBy: "newest",
};

const HomePage = () => {
  const listingsRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCars()
      .then(setCars)
      .catch((err) => console.error("Failed to load cars", err))
      .finally(() => setLoading(false));
  }, []);

  const scrollToListings = () =>
    listingsRef.current?.scrollIntoView({ behavior: "smooth" });

  const scrollToFooter = () =>
    footerRef.current?.scrollIntoView({ behavior: "smooth" });

  // Filter and sort logic
  const filteredCars = useMemo(() => {
    let filtered = [...cars];

    // Search
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.brand.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q),
      );
    }

    // Brand
    if (filters.brand !== "all") {
      filtered = filtered.filter((c) => c.brand === filters.brand);
    }

    // Fuel
    if (filters.fuelType !== "all") {
      filtered = filtered.filter((c) => c.fuelType === filters.fuelType);
    }

    // Transmission
    if (filters.transmission !== "all") {
      filtered = filtered.filter(
        (c) => c.transmission === filters.transmission,
      );
    }

    // Status
    if (filters.status !== "all") {
      filtered = filtered.filter((c) => c.status === filters.status);
    }

    // Sort
    switch (filters.sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "mileage":
        filtered.sort((a, b) => a.mileage - b.mileage);
        break;
      case "newest":
      default:
        filtered.sort(
          (a, b) =>
            parseCreatedAt(b.createdAt).getTime() -
            parseCreatedAt(a.createdAt).getTime(),
        );
    }

    return filtered;
  }, [filters, cars]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero + Navbar share the same relative container so the transparent navbar overlays the photo */}
      <div className="relative">
        <Navbar
          scrollToListings={scrollToListings}
          scrollToFooter={scrollToFooter}
        />
        <HeroSection onScrollToListings={scrollToListings} />
      </div>

      {/* Listings section */}
      <main ref={listingsRef} className="flex-1">
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          totalResults={filteredCars.length}
        />
        <section className="layout py-10 min-h-[400px]">
          {loading ? (
            <div className="flex w-full items-center justify-center h-64">
              <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <CarGrid cars={filteredCars} />
          )}
        </section>
      </main>
      <footer ref={footerRef}>
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
