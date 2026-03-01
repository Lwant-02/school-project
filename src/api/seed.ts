/**
 * Seed script — populates MockAPI with 20 realistic car listings.
 *
 * Run with:
 *   npx tsx src/api/seed.ts
 */

import { api } from "./cars";

const cars = [
  {
    title: "Toyota Camry 2022",
    brand: "Toyota",
    model: "Camry",
    year: 2022,
    price: 24500,
    mileage: 18000,
    fuelType: "Petrol",
    gear: "Automatic",
    image:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop&q=80",
    description:
      "Well-maintained Toyota Camry with low mileage. One owner, no accident history. Full service records available.",
    status: "available",
  },
  {
    title: "BMW 3 Series 2021",
    brand: "BMW",
    model: "3 Series",
    year: 2021,
    price: 38000,
    mileage: 22000,
    fuelType: "Petrol",
    gear: "Automatic",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80",
    description:
      "Sporty BMW 3 Series in excellent condition. Leather seats, panoramic sunroof, and premium sound system.",
    status: "available",
  },
  {
    title: "Tesla Model 3 2023",
    brand: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 42000,
    mileage: 8000,
    fuelType: "Electric",
    gear: "Automatic",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80",
    description:
      "Nearly new Tesla Model 3 Long Range. Autopilot included. Full self-driving capability subscription available.",
    status: "available",
  },
  {
    title: "Mercedes-Benz C-Class 2020",
    brand: "Mercedes-Benz",
    model: "C-Class",
    year: 2020,
    price: 35000,
    mileage: 35000,
    fuelType: "Petrol",
    gear: "Automatic",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=80",
    description:
      "Elegant Mercedes-Benz C-Class with AMG Line exterior. Heated seats, MBUX infotainment, and LED headlights.",
    status: "available",
  },
  {
    title: "Ford Mustang GT 2019",
    brand: "Ford",
    model: "Mustang GT",
    year: 2019,
    price: 31000,
    mileage: 41000,
    fuelType: "Petrol",
    gear: "Manual",
    image:
      "https://images.unsplash.com/photo-1584345604476-8ec5f452d1f2?w=800&auto=format&fit=crop&q=80",
    description:
      "Iconic Ford Mustang GT with 5.0L V8 engine. Premium sound system, Brembo brakes, and performance exhaust.",
    status: "available",
  },
  {
    title: "Honda Civic 2023",
    brand: "Honda",
    model: "Civic",
    year: 2023,
    price: 21000,
    mileage: 11000,
    fuelType: "Petrol",
    gear: "Automatic",
    image:
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&auto=format&fit=crop&q=80",
    description:
      "Latest Honda Civic Sport in mint condition. Apple CarPlay, Android Auto, lane-keeping assist, and adaptive cruise control.",
    status: "available",
  },
  {
    title: "Audi A4 2021",
    brand: "Audi",
    model: "A4",
    year: 2021,
    price: 36500,
    mileage: 28000,
    fuelType: "Petrol",
    gear: "Automatic",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop&q=80",
    description:
      "Refined Audi A4 Quattro with all-wheel drive. Virtual cockpit, Bang & Olufsen audio, and matrix LED lights.",
    status: "available",
  },
  {
    title: "Porsche 911 Carrera 2020",
    brand: "Porsche",
    model: "911 Carrera",
    year: 2020,
    price: 98000,
    mileage: 15000,
    fuelType: "Petrol",
    gear: "Automatic",
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e4733cc?w=800&auto=format&fit=crop&q=80",
    description:
      "Classic Porsche 911 Carrera in Guards Red. Sport Chrono package, PASM suspension, and rear-wheel steering.",
    status: "available",
  },
  {
    title: "Range Rover Velar 2022",
    brand: "Land Rover",
    model: "Range Rover Velar",
    year: 2022,
    price: 62000,
    mileage: 19000,
    fuelType: "Diesel",
    gear: "Automatic",
    image:
      "https://images.unsplash.com/photo-1533591380348-14193f1de18f?w=800&auto=format&fit=crop&q=80",
    description:
      "Sophisticated Range Rover Velar SE with air suspension. Meridian sound system, panoramic roof, and Terrain Response 2.",
    status: "available",
  },
  {
    title: "Lamborghini Huracán 2019",
    brand: "Lamborghini",
    model: "Huracán",
    year: 2019,
    price: 220000,
    mileage: 9000,
    fuelType: "Petrol",
    gear: "Automatic",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop&q=80",
    description:
      "Stunning Lamborghini Huracán LP 610-4 in Arancio Borealis. 610hp V10 engine, carbon ceramic brakes, and full Alcantara interior.",
    status: "available",
  },
  {
    title: "Ferrari 488 GTB 2018",
    brand: "Ferrari",
    model: "488 GTB",
    year: 2018,
    price: 280000,
    mileage: 12000,
    fuelType: "Petrol",
    gear: "Automatic",
    image:
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&auto=format&fit=crop&q=80",
    description:
      "Exceptional Ferrari 488 GTB in Rosso Corsa with matching red calipers. Factory carbon fiber package, racing seats.",
    status: "sold",
  },
  {
    title: "Volkswagen Golf GTI 2022",
    brand: "Volkswagen",
    model: "Golf GTI",
    year: 2022,
    price: 27500,
    mileage: 14000,
    fuelType: "Petrol",
    gear: "Manual",
    image:
      "https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?w=800&auto=format&fit=crop&q=80",
    description:
      "Hot hatch icon — Volkswagen Golf GTI Mk8 with the latest digital cockpit. 245hp, plaid seats, and IQ.DRIVE assist package.",
    status: "available",
  },
  {
    title: "Jeep Wrangler Rubicon 2021",
    brand: "Jeep",
    model: "Wrangler Rubicon",
    year: 2021,
    price: 48000,
    mileage: 26000,
    fuelType: "Petrol",
    gear: "Automatic",
    image:
      "https://images.unsplash.com/photo-1533591380348-14193f1de18f?w=800&auto=format&fit=crop&q=80",
    description:
      "Legendary off-roader with Dana 44 axles, electronic sway-bar disconnect, and rock-crawl mode. Excellent trail-ready condition.",
    status: "available",
  },
  {
    title: "Chevrolet Corvette C8 2022",
    brand: "Chevrolet",
    model: "Corvette C8",
    year: 2022,
    price: 72000,
    mileage: 7000,
    fuelType: "Petrol",
    gear: "Automatic",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
    description:
      "Mid-engine Corvette C8 in Torch Red. 6.2L V8 making 495hp, magnetic ride control, and performance data recorder.",
    status: "available",
  },
  {
    title: "Mazda CX-5 2023",
    brand: "Mazda",
    model: "CX-5",
    year: 2023,
    price: 31000,
    mileage: 9000,
    fuelType: "Petrol",
    gear: "Automatic",
    image:
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&auto=format&fit=crop&q=80",
    description:
      "Premium Mazda CX-5 Signature with soul red crystal paint. Bose audio, i-ACTIV AWD, and full leather interior.",
    status: "available",
  },
  {
    title: "Nissan GT-R 2020",
    brand: "Nissan",
    model: "GT-R",
    year: 2020,
    price: 115000,
    mileage: 18000,
    fuelType: "Petrol",
    gear: "Automatic",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80",
    description:
      "The legendary Godzilla — Nissan GT-R Premium in Ultimate Silver. Twin-turbo V6, ATTESA E-TS AWD. Track-day beast.",
    status: "available",
  },
  {
    title: "Hyundai Ioniq 5 2023",
    brand: "Hyundai",
    model: "Ioniq 5",
    year: 2023,
    price: 46000,
    mileage: 5000,
    fuelType: "Electric",
    gear: "Automatic",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80",
    description:
      "Award-winning electric SUV with 800V ultra-fast charging. 320hp, AWD, and a spacious futuristic interior with relaxation seats.",
    status: "available",
  },
  {
    title: "Toyota Land Cruiser 2021",
    brand: "Toyota",
    model: "Land Cruiser",
    year: 2021,
    price: 85000,
    mileage: 30000,
    fuelType: "Diesel",
    gear: "Automatic",
    image:
      "https://images.unsplash.com/photo-1533591380348-14193f1de18f?w=800&auto=format&fit=crop&q=80",
    description:
      "Legendary off-road capability meets luxury. Kinetic Dynamic Suspension System, Multi-Terrain Monitor, and seating for 8.",
    status: "sold",
  },
  {
    title: "BMW M4 Competition 2022",
    brand: "BMW",
    model: "M4 Competition",
    year: 2022,
    price: 85000,
    mileage: 12000,
    fuelType: "Petrol",
    gear: "Automatic",
    image:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop&q=80",
    description:
      "Track-focused BMW M4 Competition in Isle of Man Green. 503hp S58 engine, M xDrive AWD, and carbon fibre roof.",
    status: "available",
  },
  {
    title: "Audi RS6 Avant 2021",
    brand: "Audi",
    model: "RS6 Avant",
    year: 2021,
    price: 118000,
    mileage: 21000,
    fuelType: "Hybrid",
    gear: "Automatic",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop&q=80",
    description:
      "The ultimate all-rounder — Audi RS6 Avant with 591hp mild-hybrid V8. Quattro AWD, air suspension, and carbon package.",
    status: "available",
  },
];

async function seed() {
  console.log(`🌱 Seeding ${cars.length} cars to MockAPI...`);
  let success = 0;
  let failed = 0;

  for (const car of cars) {
    try {
      const res = await api.post("/", car);
      console.log(`  ✅ Created: ${car.title} (id: ${res.data.id})`);
      success++;
    } catch (err) {
      console.error(`  ❌ Failed: ${car.title}`, err);
      failed++;
    }
    // Small delay to avoid hammering the free MockAPI tier
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`\n🎉 Done! ${success} created, ${failed} failed.`);
}

seed();
