import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: React.ReactNode;
  /**
   * "protected" → only admins can access; others are sent to /admin/login
   * "guest"     → only non-admins can access; logged-in admins are sent to /admin/dashboard
   */
  mode?: "protected" | "guest";
}

export const AuthProvider = ({
  children,
  mode = "protected",
}: AuthProviderProps) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const admin = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(admin);
    setChecked(true);

    if (mode === "protected" && !admin) {
      navigate("/admin/login", { replace: true });
    }

    if (mode === "guest" && admin) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate, mode]);

  // Still checking — render nothing to avoid flash
  if (!checked) return null;

  // Protected route: block non-admins
  if (mode === "protected" && !isAdmin) return null;

  // Guest route: block already-logged-in admins
  if (mode === "guest" && isAdmin) return null;

  return <>{children}</>;
};
