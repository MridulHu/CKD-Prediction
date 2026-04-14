import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Activity,
  Image as ImageIcon,
  RotateCcw,
} from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PredictionData {
  result: string;
  confidence: number;
}

interface LocationState {
  type: "categorical" | "image";
  data?: Record<string, unknown>;
  prediction?: PredictionData;
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  // ❌ No state safety
  if (!state || !state.prediction) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">No Results Found</h1>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </main>
      </div>
    );
  }

  const { type, data, prediction } = state;

  // =========================
  // 🎯 Derived Logic (FIXED)
  // =========================

  

const getAdvice = (result: string): string[] => {
  const adviceMap: Record<string, string[]> = {
    CKD: [
      "Consult a nephrologist at the earliest for a comprehensive kidney function evaluation",
      "Monitor blood pressure regularly and maintain it within the recommended range",
      "Follow a kidney-friendly diet: reduce sodium, potassium, and protein intake as advised",
      "Stay adequately hydrated, but follow fluid restrictions if prescribed by your doctor",
      "Adhere strictly to medications and schedule periodic blood and urine tests",
      "Avoid over-the-counter drugs like NSAIDs unless approved by your physician",
    ],

    Tumor: [
      "Seek immediate consultation with an oncologist or urologist for further evaluation",
      "Undergo advanced imaging (CT/MRI) as recommended to assess tumor size and spread",
      "Avoid delaying diagnosis or treatment decisions, as early intervention is critical",
      "Discuss biopsy or surgical options if advised by your healthcare provider",
      "Maintain a healthy lifestyle to support overall recovery and treatment tolerance",
    ],

    Stone: [
      "Increase daily water intake (2–3 liters) to help flush out kidney stones",
      "Consult a urologist for evaluation and possible treatment options",
      "Limit intake of oxalate-rich foods (e.g., spinach, nuts) if advised",
      "Reduce salt and processed food consumption to prevent recurrence",
      "Take prescribed medications to manage pain or dissolve stones if applicable",
    ],

    Cyst: [
      "Most kidney cysts are benign, but regular monitoring is recommended",
      "Follow up with ultrasound or imaging tests as advised by your doctor",
      "Report symptoms like pain, infection, or blood in urine immediately",
      "Maintain a healthy lifestyle and hydration to support kidney function",
      "Consult a specialist if cyst size increases or complications arise",
    ],

    Normal: [
      "Maintain a balanced diet and active lifestyle to support kidney health",
      "Stay well hydrated and avoid excessive intake of processed or salty foods",
      "Monitor blood pressure and blood sugar levels periodically",
      "Avoid unnecessary use of medications that may affect kidney function",
      "Schedule routine health checkups for early detection of any issues",
    ],

    "Not CKD": [
      "No signs of chronic kidney disease detected, continue maintaining a healthy lifestyle",
      "Stay hydrated and follow a balanced diet to preserve kidney function",
      "Regularly monitor blood pressure and blood sugar levels",
      "Avoid excessive use of nephrotoxic medications",
      "Continue periodic health checkups for preventive care",
    ],
  };

  return (
    adviceMap[result] || [
      "Unable to determine condition-specific advice",
      "Please consult a qualified healthcare professional for further evaluation",
    ]
  );
};

const advice = getAdvice(prediction.result);

  // 🎨 Color mapping
  const resultColor: Record<string, string> = {
    Tumor: "text-red-600",
    Stone: "text-yellow-500",
    Cyst: "text-blue-600",
    Normal: "text-green-600",
    CKD: "text-red-600",
    "Not CKD": "text-green-600",
  };



  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          {/* 🔥 Result Card */}
          <div className="rounded-2xl border shadow-card mb-6 pt-2 bg-card">
            <div className="p-8 text-center">

              <div className="flex items-center justify-center gap-4 mb-3">
                <h1
                  className={cn(
                    "text-3xl font-bold",
                    resultColor[prediction.result] || "text-foreground"
                  )}
                >
                  {prediction.result}
                </h1>

                <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  {prediction.confidence}% confidence
                </span>
              </div>
              
            </div>
          </div>

          {/* 🖼 Image Preview */}
          {type === "image" && data?.imageUrl && (
            <div className="bg-card rounded-xl border p-6 mb-6 shadow-card">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary" />
                Analyzed Image
              </h2>

              <img
                src={data.imageUrl as string}
                className="w-full max-h-64 object-contain rounded-lg"
              />
            </div>
          )}

          {/* 📋 Recommendations */}
          <div className="bg-card rounded-xl border p-6 mb-6 shadow-card">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Recommendations
            </h2>

            <ul className="space-y-2">
              {advice.map((item, i) => (
                <li key={i} className="text-sm">
                  • {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ⚠️ Disclaimer */}
          <div className="bg-health-warning/10 rounded-xl p-4 mb-6 text-center text-sm">
            ⚠️ This is not medical advice. Consult a professional.
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;