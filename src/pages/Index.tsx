import { useNavigate } from "react-router-dom";
import { Table2, ImageIcon, Activity, Shield, Zap } from "lucide-react";
import Header from "@/components/Header";
import OptionCard from "@/components/OptionCard";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-hero">

      {/* Hero Section */}
      <section className="pt-5 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium">
              <Activity className="w-4 h-4" />
              DL-Powered Kidney Disease Prediction
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Early Detection for
              <br />
              <span className="text-primary">Better Health</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Use our advanced deep learning models to predict chronic kidney
              disease. Upload your medical data or kidney images for instant
              analysis.
            </p>
          </div>

          
          {/* Option Selection */}
          <div className="space-y-8 my-8 animate-fade-in-up">
            <div className="text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                Choose Your Input Method
              </h2>
              <p className="text-muted-foreground">
                Select how you'd like to provide data for prediction
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <OptionCard
                icon={Table2}
                title="Lab Test Report"
                description="Enter medical parameters like blood pressure, sugar levels, albumin, and other lab results for analysis."
                onClick={() => navigate("/predict/categorical")}
              />
              <OptionCard
                icon={ImageIcon}
                title="Medical Image"
                description="Upload kidney ultrasound, CT scan, or other medical imaging for visual analysis by our AI model."
                onClick={() => navigate("/predict/image")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>
            ⚠️ This tool is for informational purposes only. Always consult a
            healthcare professional for medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
