import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Shield, Eye, EyeOff, Phone } from "lucide-react";

interface LoginProps {
  onLogin: (phone: string, password: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const { t } = useTranslation();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin(phone, password);
      setIsLoading(false);
    }, 1000);
  };

  return (
    // Changed to match mobile app styling with max-w-md and mx-auto
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-orange-600 flex items-center justify-center p-4 max-w-md mx-auto w-full">
      <div className="w-full">
        {/* Logo and Header */}
        <div className="text-center mb-6">
          <div className="inline-block mb-4">
            {/* Simple shield icon instead of image to avoid loading issues */}
            <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-white text-xl mb-1">{t("app_name")}</h1> {/* Smaller text for mobile */}
          <p className="text-white/80 text-xs">{t("protect_your_family")}</p> {/* Smaller text for mobile */}
        </div>

        {/* Login Card - Updated styling to match mobile app */}
        <Card className="p-5 shadow-lg"> {/* Reduced padding for mobile */}
          <div className="mb-5 text-center">
            <h2 className="text-slate-900 mb-1 text-lg">{t("welcome")}</h2> {/* Smaller text for mobile */}
            <p className="text-sm text-slate-600">{t("login_continue")}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-700 text-sm">
                {t("phone_number")}
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-slate-400" />
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="081234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 text-sm">
                {t("password")}
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("enter_password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="rounded" />
                <span>{t("remember_me")}</span>
              </label>
              <button type="button" className="text-red-600 hover:text-red-700">
                {t("forgot_password")}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? t("loading") : t("login")}
            </Button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-sm text-slate-600">
              {t("dont_have_account")}{" "}
              <button className="text-red-600 hover:text-red-700 font-medium">
                {t("register_now")}
              </button>
            </p>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-5 text-center">
          <p className="text-xs text-white/70">
            {t("protecting_communities")}
          </p>
          <p className="text-xs text-white/70 mt-1">
            © 25 Indonesian Disaster AIDSS
          </p>
        </div>
      </div>
    </div>
  );
}