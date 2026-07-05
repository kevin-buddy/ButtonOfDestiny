'use client';
import { useState, useCallback, useEffect } from "react";
import { FloatingHearts }    from "@/components/FloatingHearts";
import { HeroSection }       from "@/components/HeroSection";
import { DateInvitation }    from "@/components/DateInvitation";
import { DatePlanningForm }  from "@/components/DatePlanningForm";
import { SuccessScreen }     from "@/components/SuccessScreen";
import type { DateFormStep, InvitationConfig } from "@/types/date-form";
import { supabase } from '@/lib/supabase';

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState<DateFormStep>("hero");
  const [config, setConfig] = useState<InvitationConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const uuid = process.env.NEXT_PUBLIC_DEFAULT_UUID as string;
  useEffect(() => {
    async function fetchInvitationData() {
      if (!uuid) return;

      const { data, error } = await supabase
        .from('personal_project_buttonofdestiny')
        .select('*')
        .eq('uuid', uuid)
        .single();
      if (error) {
        console.error("Error fetching data:", error);
      } else if (data) {
        setConfig(data);
      }
      setIsLoading(false);
    }

    fetchInvitationData();
  }, [uuid]);

  const advanceToInvitation  = useCallback(() => setCurrentStep("invitation"), []);
  const advanceToPlanning    = useCallback(() => setCurrentStep("planning"),   []);
  const advanceToSuccess     = useCallback(() => setCurrentStep("success"),    []);

  if (isLoading) {
    return <div className="min-h-dvh flex items-center justify-center text-rose-500">Loading...</div>;
  }
  if (!config) {
    return <div className="min-h-dvh flex items-center justify-center text-rose-500">Invitation not found!</div>;
  }

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
      {currentStep === "hero" && <HeroSection config={config} onContinue={advanceToInvitation} />}
      {currentStep === "invitation" && <DateInvitation config={config} onYes={advanceToPlanning} />}
      {currentStep === "planning" && <DatePlanningForm config={config} onSubmitSuccess={advanceToSuccess} />}
      {currentStep === "success" && <SuccessScreen config={config} />}
    </main>
  );
}