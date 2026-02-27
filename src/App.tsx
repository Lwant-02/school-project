import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/client/HomePage";
import CarDetailPage from "@/pages/client/CarDetailPage";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Client routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/car/:id" element={<CarDetailPage />} />

        {/* Admin routes — to be implemented */}
        <Route
          path="/admin/login"
          element={
            <div className="flex h-screen items-center justify-center text-xl text-muted-foreground">
              Admin Login — Coming Soon
            </div>
          }
        />
        <Route
          path="/admin"
          element={
            <div className="flex h-screen items-center justify-center text-xl text-muted-foreground">
              Admin Dashboard — Coming Soon
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
