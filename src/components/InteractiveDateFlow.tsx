'use client';
import { useState, useCallback } from "react";
import { HeroSection }       from "@/components/HeroSection";
import { DateInvitation }    from "@/components/DateInvitation";
import { DatePlanningForm }  from "@/components/DatePlanningForm";
import { SuccessScreen }     from "@/components/SuccessScreen";
import type { DateFormStep, InvitationConfig } from "@/types/date-form";

export function InteractiveDateFlow({ config }: { config: InvitationConfig }) {
  const [currentStep, setCurrentStep] = useState<DateFormStep>("hero");

  const advanceToInvitation  = useCallback(() => setCurrentStep("invitation"), []);
  const advanceToPlanning    = useCallback(() => setCurrentStep("planning"),   []);
  const advanceToSuccess     = useCallback(() => setCurrentStep("success"),    []);

  return (
    <>
      {currentStep === "hero" && <HeroSection config={config} onContinue={advanceToInvitation} />}
      {currentStep === "invitation" && <DateInvitation config={config} onYes={advanceToPlanning} />}
      {currentStep === "planning" && <DatePlanningForm config={config} onSubmitSuccess={advanceToSuccess} />}
      {currentStep === "success" && <SuccessScreen config={config} />}
    </>
  );
}