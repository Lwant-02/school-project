import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/client/home-page";
import CarDetailPage from "@/pages/client/car-detail-page";
import { AdminLogin } from "./pages/admin/admin-login";
import { DashboardLayout } from "./pages/admin/dashboard-layout";
import { DashboardHome } from "./pages/admin/dashboard-home";
import { ManageCars } from "./pages/admin/manage-cars";
import { CarForm } from "./pages/admin/car-form";
import { AdminCarDetail } from "./pages/admin/admin-car-detail";
import { AuthProvider } from "./components/auth-provider";

export const App = () => {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          {/* Client routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/car/:id" element={<CarDetailPage />} />

          {/* Admin routes */}
          <Route
            path="/admin/login"
            element={
              <AuthProvider mode="guest">
                <AdminLogin />
              </AuthProvider>
            }
          />
          {/* Redirect /admin → /admin/dashboard */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />

          <Route
            path="/admin/dashboard"
            element={
              <AuthProvider>
                <DashboardLayout />
              </AuthProvider>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="cars" element={<ManageCars />} />
            <Route path="cars/:id" element={<CarForm />} />
            <Route path="cars/:id/view" element={<AdminCarDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
};
