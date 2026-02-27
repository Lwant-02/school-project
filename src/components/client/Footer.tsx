import { CarFront, Phone, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="contact" className="border-t border-border bg-muted/40 py-12">
      <div className="layout">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <CarFront className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">
                Auto<span className="text-primary">Market</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Your trusted marketplace for quality used vehicles. Transparent
              pricing, honest listings.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/"
                  className="transition-colors hover:text-foreground"
                >
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/login"
                  className="transition-colors hover:text-foreground"
                >
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide">
              Contact Us
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                +66 12 345 6789
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                contact@automarket.co
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                Bangkok, Thailand
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AutoMarket. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
