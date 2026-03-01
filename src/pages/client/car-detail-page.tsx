import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Fuel,
  Gauge,
  Settings2,
  Calendar,
  Tag,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  XCircle,
  Car,
  Zap,
  Loader,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCarById, updateCar } from "@/api/cars";
import type { Car as CarType } from "@/types/car";
import { useEffect, useState } from "react";

const fuelIcon = (fuel: CarType["fuelType"]) =>
  fuel === "Electric" ? (
    <Zap className="h-5 w-5" />
  ) : (
    <Fuel className="h-5 w-5" />
  );

const specItem = (
  icon: React.ReactNode,
  label: string,
  value: string | number,
) => (
  <div className="flex flex-col gap-1 rounded-xl border border-border bg-muted/40 px-5 py-4">
    <div className="flex items-center gap-2 text-muted-foreground">
      {icon}
      <span className="text-xs font-medium uppercase tracking-wide">
        {label}
      </span>
    </div>
    <span className="text-lg font-semibold text-foreground">{value}</span>
  </div>
);

const CarDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<CarType | null>(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);

  const handleBuy = async () => {
    if (!car || car.status === "sold") return;
    setBuying(true);
    try {
      const updated = await updateCar(car.id, { status: "sold" });
      setCar(updated);
    } catch (err) {
      console.error("Failed to buy car", err);
    } finally {
      setBuying(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (id) {
      getCarById(id)
        .then(setCar)
        .catch((err) => console.error("Failed to load car", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader className="size-8 animate-spin" />
      </div>
    );
  }

  /* 404 state */
  if (!car) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <Car className="h-16 w-16 text-muted-foreground" />
        <h1 className="text-2xl font-bold">ไม่พบรถยนต์</h1>
        <Link to="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            กลับไปที่รายการ
          </Button>
        </Link>
      </div>
    );
  }

  const isSold = car.status === "sold";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ── Hero image section with navbar overlay ── */}
      <div className="relative">
        <section className="relative h-[75vh] min-h-[480px] w-full overflow-hidden">
          {/* Background car image */}
          <img
            src={car.image}
            alt={car.title}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-500 ${
              isSold ? "grayscale" : ""
            }`}
          />

          {/* Gradient overlay: dark bottom-left, transparent top-right */}
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent" />

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute left-8 top-28 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:left-14 lg:left-20"
          >
            <ArrowLeft className="h-4 w-4" />
            กลับ
          </button>

          {/* Car info overlay — bottom left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute bottom-0 left-0 right-0 layout pb-10 pt-6"
          >
            {/* Status badge */}
            <div className="mb-3">
              <Badge
                className={
                  isSold
                    ? "bg-red-500/90 text-white hover:bg-red-500/90"
                    : "bg-green-500/90 text-white hover:bg-green-500/90"
                }
              >
                {isSold ? (
                  <span className="flex items-center gap-1">
                    <XCircle className="h-3 w-3" /> ขายแล้ว
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> มีจำหน่าย
                  </span>
                )}
              </Badge>
            </div>

            {/* Price */}
            <p className="mb-1 text-2xl font-semibold text-white/85 sm:text-3xl">
              ${car.price.toLocaleString()}
            </p>

            {/* Title */}
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              {car.title}
            </h1>

            {/* Quick specs row */}
            <div className="flex flex-wrap gap-5 text-sm text-white/75">
              <span className="flex items-center gap-1.5">
                {fuelIcon(car.fuelType)}
                {car.fuelType}
              </span>
              <span className="flex items-center gap-1.5">
                <Gauge className="h-5 w-5" />
                {car.mileage.toLocaleString()} km
              </span>
              <span className="flex items-center gap-1.5">
                <Settings2 className="h-5 w-5" />
                {car.gear}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-5 w-5" />
                {car.year}
              </span>
            </div>
          </motion.div>
        </section>
      </div>

      {/* ── Body content ── */}
      <main className="layout  py-12 w-full">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Left: Description + Full Specs */}
          <div className="lg:col-span-2 w-full flex flex-col gap-8">
            {/* Description */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="mb-3 text-xl font-bold">เกี่ยวกับรถยนต์คันนี้</h2>
              <Separator className="mb-4" />
              <p className="leading-relaxed text-muted-foreground">
                {car.description}
              </p>
            </motion.section>

            {/* Full Specs Grid */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="mb-3 text-xl font-bold">ข้อมูลจำเพาะ</h2>
              <Separator className="mb-4" />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {specItem(<Tag className="h-5 w-5" />, "ยี่ห้อ", car.brand)}
                {specItem(<Car className="h-5 w-5" />, "รุ่น", car.model)}
                {specItem(<Calendar className="h-5 w-5" />, "ปี", car.year)}
                {specItem(
                  fuelIcon(car.fuelType),
                  "ประเภทเชื้อเพลิง",
                  car.fuelType,
                )}
                {specItem(
                  <Settings2 className="h-5 w-5" />,
                  "ระบบเกียร์",
                  car.gear,
                )}
                {specItem(
                  <Gauge className="h-5 w-5" />,
                  "ระยะทาง",
                  `${car.mileage.toLocaleString()} กม.`,
                )}
              </div>
            </motion.section>
          </div>

          {/* Right: Price card + Contact */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col gap-5"
          >
            {/* Price card */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <p className="text-sm text-muted-foreground">ราคา</p>
              <p className="mt-1 text-3xl font-extrabold">
                ${car.price.toLocaleString()}
              </p>

              <Separator className="my-5" />

              {isSold ? (
                <Button
                  disabled
                  variant="secondary"
                  className="w-full h-11 cursor-not-allowed"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  รถคันนี้ขายแล้ว
                </Button>
              ) : (
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={handleBuy}
                    disabled={buying}
                    className="w-full h-11 gap-2 cursor-pointer"
                  >
                    {buying ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4" />
                    )}
                    {buying ? "กำลังดำเนินการ..." : "ซื้อรถคันนี้"}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-11 gap-2 cursor-pointer"
                  >
                    <Phone className="h-4 w-4" />
                    ติดต่อผู้ขาย
                  </Button>
                </div>
              )}
            </div>

            {/* Seller contact info */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-semibold">ข้อมูลติดต่อผู้ขาย</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <Phone className="h-4 w-4" />
                  </div>
                  +66 12 345 6789
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <Mail className="h-4 w-4" />
                  </div>
                  contact@automarket.co
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <MapPin className="h-4 w-4" />
                  </div>
                  Bangkok, Thailand
                </li>
              </ul>
            </div>

            {/* Back to listings */}
            <Link to="/">
              <Button variant="outline" className="w-full h-11 gap-2">
                <ArrowLeft className="h-4 w-4" />
                กลับไปหน้ารวม
              </Button>
            </Link>
          </motion.aside>
        </div>
      </main>
    </div>
  );
};

export default CarDetailPage;
