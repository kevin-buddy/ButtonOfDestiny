'use client';
import { useEffect } from "react";
import confetti from "canvas-confetti";
import { InvitationConfig } from "@/types/date-form";

interface SuccessScreenProps {
  config: InvitationConfig;
}

export function SuccessScreen({ config }: SuccessScreenProps) {
  const { successHeadline, successMessage, senderName } = config;

  useEffect(() => {
    const launchConfetti = () => {
      const sharedOptions = {
        particleCount: 80,
        spread: 80,
        colors: ["#f43f5e", "#fb7185", "#fda4af", "#ff55ab", "#fecdd3", "#fff0f5"],
      };

      confetti({ ...sharedOptions, origin: { x: 0.2, y: 0.6 }, angle: 60 });
      confetti({ ...sharedOptions, origin: { x: 0.8, y: 0.6 }, angle: 120 });

      setTimeout(() => {
        confetti({ ...sharedOptions, particleCount: 50, origin: { x: 0.5, y: 0.5 } });
      }, 400);
    };

    launchConfetti();
  }, []);

  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-dvh px-6 py-16 text-center">

      {/* Big emoji celebration */}
      <div className="text-7xl mb-6 animate-bounce-soft" aria-hidden="true">
        🎉
      </div>

      <p className="section-label mb-4">it&apos;s a date! 💕</p>

      <h2 className="font-display text-4xl md:text-5xl font-bold text-rose-500 mb-4 max-w-md leading-tight">
        {successHeadline}
      </h2>

      <div className="glass-card max-w-md mx-auto px-8 py-6 mb-8 animate-scale-in">
        <p className="text-rose-700 text-lg leading-relaxed">{successMessage}</p>
        <p className="mt-4 text-sm text-blush-400 font-semibold">
          — {senderName} 💌
        </p>
      </div>

      {/* Fun decorative row */}
      <div className="flex gap-3 text-3xl animate-fade-in-up" aria-hidden="true">
        {["🌸", "💕", "✨", "🥂", "💖", "🌷", "🎈"].map((emoji, i) => (
          <span
            key={i}
            className="animate-bounce-soft"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {emoji}
          </span>
        ))}
      </div>

      <p className="mt-8 text-rose-300 text-sm">
        Your answer has been sent — I&apos;ll be in touch soon! 🤍
      </p>
    </section>
  );
}