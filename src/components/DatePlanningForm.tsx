'use client';
import { useState, useCallback, FormEvent } from "react";
import { MapPin, Calendar, Clock, Sparkles, Send, ChevronRight } from "lucide-react";
import type { DatePlanFormData, InvitationConfig } from "@/types/date-form";

interface DatePlanningFormProps {
  config: InvitationConfig;
  onSubmitSuccess: () => void;
}

const initialFormData: DatePlanFormData = {
  preferredLocation:   "",
  customLocation:      "",
  preferredDate:       "",
  preferredTime:       "",
  selectedActivities:  [],
  extraNotes:          "",
};

export function DatePlanningForm({ config, onSubmitSuccess }: DatePlanningFormProps) {
  const [formData, setFormData]   = useState<DatePlanFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError]   = useState<string | null>(null);

  const { receiverName, locationSuggestions, activitySuggestions } = config;

  const handleLocationSelect = useCallback((location: string) => {
    setFormData((prev) => ({ ...prev, preferredLocation: location }));
  }, []);

  const handleActivityToggle = useCallback((activity: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedActivities: prev.selectedActivities.includes(activity)
        ? prev.selectedActivities.filter((a) => a !== activity)
        : [...prev.selectedActivities, activity],
    }));
  }, []);

  const handleInputChange = useCallback(
    (field: keyof DatePlanFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const response = await fetch("/api/send-date-response", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uuid: config.uuid, receiverName, formData }),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error ?? "Submission failed.");
        }

        onSubmitSuccess();
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Something went wrong.";
        setSubmitError(message);
        setIsSubmitting(false);
      }
    },
    [formData, receiverName, onSubmitSuccess, config.uuid]
  );

  const isFormValid =
    (formData.preferredLocation || formData.customLocation.trim()) &&
    formData.preferredDate &&
    formData.preferredTime;

  return (
    <section className="relative z-10 min-h-dvh px-4 py-16">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <span className="text-5xl mb-4 block animate-bounce-soft" aria-hidden="true">
            🗓️
          </span>
          <p className="section-label mb-2">let&apos;s make it official</p>
          <h2 className="font-display text-4xl font-bold text-rose-500">
            Let&apos;s plan our date! 🌷
          </h2>
          <p className="text-rose-400 mt-2">
            Tell me everything — I want it to be perfect for you.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">

          {/* Location */}
          <FormCard
            icon={<MapPin className="w-5 h-5 text-rose-400" />}
            label="Where would you like to go?"
            delay="100ms"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {locationSuggestions.map((location) => (
                <button
                  key={location}
                  type="button"
                  onClick={() => handleLocationSelect(location)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-150 ${
                    formData.preferredLocation === location
                      ? "bg-rose-400 text-white shadow-glow-rose scale-105"
                      : "bg-rose-50 text-rose-500 border border-rose-200 hover:bg-rose-100"
                  }`}
                  aria-pressed={formData.preferredLocation === location}
                >
                  {location}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Or type your own idea... ✍️"
              value={formData.customLocation}
              onChange={(e) => handleInputChange("customLocation", e.target.value)}
              className="input-field"
            />
          </FormCard>

          {/* Date & Time */}
          <FormCard
            icon={<Calendar className="w-5 h-5 text-rose-400" />}
            label="When works best for you?"
            delay="200ms"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date-picker" className="block text-sm font-medium text-rose-400 mb-1">
                  Date 📅
                </label>
                <input
                  id="date-picker"
                  type="date"
                  value={formData.preferredDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label htmlFor="time-picker" className="block text-sm font-medium text-rose-400 mb-1">
                  Time ⏰
                </label>
                <input
                  id="time-picker"
                  type="time"
                  value={formData.preferredTime}
                  onChange={(e) => handleInputChange("preferredTime", e.target.value)}
                  className="input-field"
                  required
                />
              </div>
            </div>
          </FormCard>

          {/* Activities */}
          <FormCard
            icon={<Sparkles className="w-5 h-5 text-rose-400" />}
            label="What would you love to do?"
            delay="300ms"
          >
            <div className="flex flex-wrap gap-2">
              {activitySuggestions.map((activity) => {
                const isSelected = formData.selectedActivities.includes(activity);
                return (
                  <button
                    key={activity}
                    type="button"
                    onClick={() => handleActivityToggle(activity)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-150 ${
                      isSelected
                        ? "bg-blush-400 text-white shadow-glow-pink scale-105"
                        : "bg-petal-soft text-blush-600 border border-blush-200 hover:bg-petal-mist"
                    }`}
                    aria-pressed={isSelected}
                  >
                    {isSelected ? "✓ " : ""}{activity}
                  </button>
                );
              })}
            </div>
          </FormCard>

          {/* Extra notes */}
          <FormCard
            icon={<Clock className="w-5 h-5 text-rose-400" />}
            label="Anything else you'd like me to know?"
            delay="400ms"
          >
            <textarea
              placeholder="Any wishes, allergies, surprises you want, or just something sweet to tell me... 💬"
              value={formData.extraNotes}
              onChange={(e) => handleInputChange("extraNotes", e.target.value)}
              rows={3}
              maxLength={500}
              className="input-field resize-none"
            />
            <p className="text-xs text-rose-300 text-right mt-1">
              {formData.extraNotes.length}/500
            </p>
          </FormCard>

          {/* Error message */}
          {submitError && (
            <div
              role="alert"
              className="glass-card border-red-200 bg-red-50/80 px-5 py-3 text-red-500 text-sm text-center"
            >
              ⚠️ {submitError}
            </div>
          )}

          {/* Submit */}
          <div className="text-center animate-fade-in-up" style={{ animationDelay: "500ms" }}>
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`btn-primary w-full sm:w-auto ${
                !isFormValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin">💫</span>
                  Sending your answer...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send my answer!
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>

            {!isFormValid && (
              <p className="text-sm text-rose-300 mt-3">
                Please fill in a location, date, and time to continue 💕
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

/** Reusable card wrapper for each form section. */
function FormCard({
  icon,
  label,
  delay = "0ms",
  children,
}: {
  icon: React.ReactNode;
  label: string;
  delay?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="glass-card p-6 animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="font-semibold text-rose-700">{label}</h3>
      </div>
      {children}
    </div>
  );
}