import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Loader } from "lucide-react";
import { getCarById, createCar, updateCar } from "@/api/cars";
import type { Car, FuelType, Transmission, CarStatus } from "@/types/car";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormData = Omit<Car, "id" | "createdAt">;

const empty: FormData = {
  title: "",
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  price: 0,
  mileage: 0,
  fuelType: "Petrol",
  transmission: "Automatic",
  image: "",
  description: "",
  status: "available",
};

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <label className="text-sm font-medium text-foreground">{label}</label>
    {children}
  </div>
);

export const CarForm = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>(empty);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isNew) return;
    getCarById(id!)
      .then((car) => {
        const { id: _id, createdAt: _ca, ...rest } = car;
        setForm(rest);
      })
      .catch(() => setError("โหลดข้อมูลรถยนต์ล้มเหลว"))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      if (isNew) {
        await createCar(form);
      } else {
        await updateCar(id!, form);
      }
      navigate("/admin/dashboard/cars");
    } catch {
      setError("บันทึกข้อมูลรถยนต์ล้มเหลว โปรดลองอีกครั้ง");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="w-full px-5">
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => navigate("/admin/dashboard/cars")}
          className="cursor-pointer shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {isNew ? "เพิ่มรถยนต์ใหม่" : "แก้ไขข้อมูลรถยนต์"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isNew ? "กรอกรายละเอียดด้านล่าง" : "อัปเดตรายละเอียดรายการ"}
          </p>
        </div>
      </div>

      {error && <p className="text-sm text-destructive mb-4">{error}</p>}

      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="ชื่อรุ่น">
            <Input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Toyota Corolla 2018"
              required
              className="btn"
            />
          </Field>
          <Field label="ยี่ห้อ">
            <Input
              value={form.brand}
              onChange={(e) => set("brand", e.target.value)}
              placeholder="Toyota"
              required
              className="btn"
            />
          </Field>
          <Field label="รุ่น">
            <Input
              value={form.model}
              onChange={(e) => set("model", e.target.value)}
              placeholder="Corolla"
              required
              className="btn"
            />
          </Field>
          <Field label="ปี">
            <Input
              type="number"
              value={form.year}
              onChange={(e) => set("year", Number(e.target.value))}
              min={1900}
              max={new Date().getFullYear() + 1}
              required
              className="btn"
            />
          </Field>
          <Field label="ราคา">
            <Input
              type="number"
              value={form.price}
              onChange={(e) => set("price", Number(e.target.value))}
              min={0}
              required
              className="btn"
            />
          </Field>
          <Field label="ระยะทาง (กม.)">
            <Input
              type="number"
              value={form.mileage}
              onChange={(e) => set("mileage", Number(e.target.value))}
              min={0}
              required
              className="btn"
            />
          </Field>

          <Field label="ประเภทเชื้อเพลิง">
            <Select
              value={form.fuelType}
              onValueChange={(v) => set("fuelType", v as FuelType)}
            >
              <SelectTrigger className="h-10! w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[
                  { value: "Petrol", label: "เบนซิน" },
                  { value: "Diesel", label: "ดีเซล" },
                  { value: "Electric", label: "ไฟฟ้า" },
                  { value: "Hybrid", label: "ไฮบริด" },
                ].map((f) => (
                  <SelectItem key={f.value} value={f.value}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="ระบบเกียร์">
            <Select
              value={form.transmission}
              onValueChange={(v) => set("transmission", v as Transmission)}
            >
              <SelectTrigger className="h-10! w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[
                  { value: "Automatic", label: "ออโต้" },
                  { value: "Manual", label: "ธรรมดา" },
                ].map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="สถานะ">
            <Select
              value={form.status}
              onValueChange={(v) => set("status", v as CarStatus)}
            >
              <SelectTrigger className="h-10! w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">มีจำหน่าย</SelectItem>
                <SelectItem value="sold">ขายแล้ว</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label="ลิงก์รูปภาพ">
            <Input
              value={form.image}
              onChange={(e) => set("image", e.target.value)}
              placeholder="https://example.com/car.jpg"
              className="h-10"
            />
          </Field>
        </div>

        <Field label="คำอธิบาย">
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="สภาพดี เจ้าของมือเดียว..."
            rows={4}
            className="w-full rounded-sm focus:right-1! border px-3 py-2 text-foreground resize-none"
          />
        </Field>

        {/* Image preview */}
        {form.image && (
          <div className="rounded-lg border border-border overflow-hidden h-52">
            <img
              src={form.image}
              alt="Preview"
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/dashboard/cars")}
            disabled={saving}
            className="cursor-pointer w-40 h-10"
          >
            ยกเลิก
          </Button>
          <Button
            type="submit"
            disabled={saving}
            className="cursor-pointer gap-2 w-40 h-10"
          >
            {saving && <Loader className="h-4 w-4 animate-spin" />}
            {isNew ? "เพิ่มรถยนต์" : "บันทึกการเปลี่ยนแปลง"}
          </Button>
        </div>
      </motion.form>
    </div>
  );
};
