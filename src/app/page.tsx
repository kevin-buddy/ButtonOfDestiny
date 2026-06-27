"use client";

import { useState, useCallback } from "react";
import { FloatingHearts }    from "@/components/FloatingHearts";
import { HeroSection }       from "@/components/HeroSection";
import { DateInvitation }    from "@/components/DateInvitation";
import { DatePlanningForm }  from "@/components/DatePlanningForm";
import { SuccessScreen }     from "@/components/SuccessScreen";
import type { DateFormStep } from "@/types/date-form";

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState<DateFormStep>("hero");

  const advanceToInvitation  = useCallback(() => setCurrentStep("invitation"), []);
  const advanceToPlanning    = useCallback(() => setCurrentStep("planning"),   []);
  const advanceToSuccess     = useCallback(() => setCurrentStep("success"),    []);

  return (
    <main className="relative min-h-dvh overflow-x-hidden">
      {/* Ambient gradient background */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,209,226,0.6) 0%, rgba(255,245,248,0.9) 60%, #fff5f8 100%)",
        }}
      />

      {/* Floating decorative hearts */}
      <FloatingHearts />

      {/* Step renderer */}
      {currentStep === "hero" && (
        <HeroSection onContinue={advanceToInvitation} />
      )}

      {currentStep === "invitation" && (
        <DateInvitation onYes={advanceToPlanning} />
      )}

      {currentStep === "planning" && (
        <DatePlanningForm onSubmitSuccess={advanceToSuccess} />
      )}

      {currentStep === "success" && (
        <SuccessScreen />
      )}
    </main>
  );
}