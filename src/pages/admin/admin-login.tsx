import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  CarFront,
  Lock,
  Mail,
  ArrowRight,
  ShieldAlert,
  Loader,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@mail.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (email === "admin@mail.com" && password === "123456") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid email or password. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Subtle Dynamic Background matching client theme (white/light gray based) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/[10] left-1/[10] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/[10] right-1/[10] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md z-10 px-4"
      >
        <Card className="border-border bg-card/80 backdrop-blur-xl shadow-2xl overflow-hidden relative">
          <CardHeader className="space-y-4 pt-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center"
            >
              <div className="h-16 w-16 bg-muted rounded-2xl flex items-center justify-center border border-border shadow-inner">
                <CarFront className="h-8 w-8 text-primary" />
              </div>
            </motion.div>
            <div className="space-y-1">
              <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
                Admin Access
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter your credentials to manage the fleet.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3 text-destructive text-sm"
                >
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  <p>{error}</p>
                </motion.div>
              )}

              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-foreground"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/20 focus:ring-1! focus-visible:border-primary h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-foreground"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 bg-background border-border text-foreground focus:ring-1! placeholder:text-muted-foreground focus-visible:ring-primary/20 focus-visible:border-primary h-11"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full cursor-pointer h-11 transition-all duration-200"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                    >
                      <Loader className="h-5 w-5 opacity-50" />
                    </motion.div>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="justify-center border-t border-border pt-6 pb-6">
            <p className="text-sm text-muted-foreground">
              Only authorized personnel.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};
