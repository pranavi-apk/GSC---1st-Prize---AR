import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Camera, MapPin, Package } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ImageRequest() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1); // 1: camera, 2: description, 3: confirmation
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState({ lat: -6.2088, lng: 106.8456 }); // Default to Jakarta

  const handleCameraClick = () => {
    // Simulate taking a photo
    setImagePreview("https://images.unsplash.com/photo-1528573090754-acc30994551f?w=300&h=300&fit=crop");
    setStep(2);
  };

  const handleSubmit = () => {
    // Simulate submission
    setStep(3);
    setTimeout(() => {
      setStep(1);
      setImagePreview(null);
      setDescription("");
    }, 3000);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {step === 1 && (
          <div className="text-center py-8">
            <div 
              className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 cursor-pointer"
              onClick={handleCameraClick}
            >
              <Camera className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">{t("take_photo")}</h3>
            <p className="text-slate-600 mb-6">{t("photo_instruction")}</p>
            <Button onClick={handleCameraClick} className="bg-red-600 hover:bg-red-700">
              {t("open_camera")}
            </Button>
          </div>
        )}
        
        {step === 2 && imagePreview && (
          <div>
            <div className="mb-6">
              <ImageWithFallback
                src={imagePreview}
                alt={t("damage_photo")}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {t("location_detected")}
              </label>
              <div className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
                <MapPin className="w-4 h-4 text-red-600" />
                <span className="text-sm">
                  {t("jakarta_location")}
                </span>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {t("describe_needs")}
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t("needs_placeholder")}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                {t("back")}
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={description.trim() === ""}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                {t("submit_request")}
              </Button>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">{t("request_submitted")}</h3>
            <p className="text-slate-600 mb-6">{t("drone_dispatched")}</p>
            <div className="bg-white p-4 rounded-lg text-left shadow-sm">
              <p className="text-sm text-slate-900 mb-1">{t("estimated_arrival")}: 15 {t("minutes")}</p>
              <p className="text-sm text-slate-900">{t("items_delivered")}: {description || t("emergency_supplies")}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}