import { CarFront, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = ({
  scrollToListings = () => {},
  scrollToFooter = () => {},
}: {
  scrollToListings?: () => void;
  scrollToFooter?: () => void;
}) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full">
      <div className="layout flex h-20 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
            <CarFront className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            AutoMarket
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-6 md:flex">
          <span
            onClick={scrollToListings}
            className="text-sm font-medium cursor-pointer text-white/80 transition-colors hover:text-white"
          >
            เลือกดูรถยนต์
          </span>
          <span
            onClick={scrollToFooter}
            className="text-sm cursor-pointer font-medium text-white/80 transition-colors hover:text-white"
          >
            ติดต่อเรา
          </span>
        </nav>

        {/* Admin Login */}
        <Link to="/admin/login">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 h-10 cursor-pointer border-gray-50/30 bg-gray-50 text-black backdrop-blur-sm hover:bg-gray-50/90 hover:text-black"
          >
            <ShieldCheck className="h-4 w-4" />
            เข้าสู่ระบบแอดมิน
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
