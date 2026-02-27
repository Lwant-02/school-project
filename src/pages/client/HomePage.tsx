import { useRef, useMemo, useState } from "react";
import Navbar from "@/components/client/Navbar";
import HeroSection from "@/components/client/HeroSection";
import FilterBar, { type FilterState } from "@/components/client/FilterBar";
import CarGrid from "@/components/client/CarGrid";
import Footer from "@/components/client/Footer";
import { mockCars } from "@/data/mockCars";

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
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const footerRef = useRef<HTMLElement>(null);

  const scrollToListings = () =>
    listingsRef.current?.scrollIntoView({ behavior: "smooth" });

  const scrollToFooter = () =>
    footerRef.current?.scrollIntoView({ behavior: "smooth" });

  // Filter and sort logic
  const filteredCars = useMemo(() => {
    let cars = [...mockCars];

    // Search
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      cars = cars.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.brand.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q),
      );
    }

    // Brand
    if (filters.brand !== "all") {
      cars = cars.filter((c) => c.brand === filters.brand);
    }

    // Fuel
    if (filters.fuelType !== "all") {
      cars = cars.filter((c) => c.fuelType === filters.fuelType);
    }

    // Transmission
    if (filters.transmission !== "all") {
      cars = cars.filter((c) => c.transmission === filters.transmission);
    }

    // Status
    if (filters.status !== "all") {
      cars = cars.filter((c) => c.status === filters.status);
    }

    // Sort
    switch (filters.sortBy) {
      case "price-asc":
        cars.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        cars.sort((a, b) => b.price - a.price);
        break;
      case "mileage":
        cars.sort((a, b) => a.mileage - b.mileage);
        break;
      case "newest":
      default:
        cars.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    }

    return cars;
  }, [filters]);

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
        <section className="layout py-10">
          <CarGrid cars={filteredCars} />
        </section>
      </main>
      <footer ref={footerRef}>
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
