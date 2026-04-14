import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2, Info } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ImageUpload";

const ImageInput = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getSuggestion = (result) => {
  switch (result) {
    case "Tumor":
      return {
        title: "Possible Tumor Detected",
        advice: "Consult a nephrologist or oncologist immediately. Further imaging (CT/MRI) and biopsy may be required.",
        urgency: "High",
      };

    case "Cyst":
      return {
        title: "Kidney Cyst Detected",
        advice: "Most cysts are benign, but follow-up ultrasound is recommended. Consult a doctor if symptoms occur.",
        urgency: "Medium",
      };

    case "Stone":
      return {
        title: "Kidney Stone Detected",
        advice: "Increase water intake and consult a urologist. Medication or minor procedures may be required.",
        urgency: "Medium",
      };

    case "Normal":
      return {
        title: "Normal Kidney",
        advice: "No abnormalities detected. Maintain a healthy lifestyle and regular checkups.",
        urgency: "Low",
      };

    default:
      return {
        title: "Unknown",
        advice: "Unable to determine. Please consult a doctor.",
        urgency: "Unknown",
      };
  }
};

  const handleSubmit = async () => {
  if (!selectedImage) return;

  setIsLoading(true);

  try {
    const formData = new FormData();
    formData.append("file", selectedImage);

    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to get prediction");
    }

    const result = await response.json();
    const suggestion = getSuggestion(result.result);

    const imageUrl = URL.createObjectURL(selectedImage);

    navigate("/results", {
  state: {
    type: "image",
    data: {
      fileName: selectedImage.name,
      fileSize: selectedImage.size,
      imageUrl,
    },
    prediction: {
      result: result.result,
      confidence: result.confidence,
      riskLevel: suggestion.urgency,
      suggestion: suggestion,
    },
  },
});

  } catch (error) {
    console.error(error);
    alert("Error analyzing image. Make sure backend is running.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-background">

      <main className="pt-5 pb-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="bg-card rounded-2xl border border-border shadow-card p-8">
            <div className="mb-8">
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Upload Medical Image
              </h1>
              <p className="text-muted-foreground">
                Upload a kidney ultrasound, CT scan, or other medical imaging
                for AI analysis.
              </p>
            </div>

            <div className="space-y-6">
              <ImageUpload
                selectedImage={selectedImage}
                onImageSelect={setSelectedImage}
              />

              {/* Info Box */}
              <div className="flex items-start gap-3 p-4 bg-accent rounded-xl">
                <Info className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div className="text-sm text-accent-foreground">
                  <p className="font-medium mb-1">Supported Image Types:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Kidney Ultrasound Images</li>
                    <li>CT Scan Images</li>
                    <li>MRI Images</li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  onClick={handleSubmit}
                  variant="hero"
                  size="lg"
                  disabled={!selectedImage || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing Image...
                    </>
                  ) : (
                    <>
                      Analyze Image
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ImageInput;
