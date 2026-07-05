"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { InvitationConfig } from "@/types/date-form";

interface HeroSectionProps {
  config: InvitationConfig;
  onContinue: () => void;
}

export function HeroSection({ config, onContinue }: HeroSectionProps) {
  const { heroPhotoUrl, heroPhotoAlt, headline, personalMessage, receiverName, senderName } = config;

  const formattedMessage = personalMessage.split("\n");

  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-dvh px-6 py-16 text-center">
      {/* Decorative top label */}
      <p className="section-label mb-6 animate-fade-in-up" style={{ animationDelay: "0ms" }}>
        A little something for you ✉️
      </p>

      {/* Photo or illustrated placeholder */}
      <div
        className="relative mb-8 animate-scale-in"
        style={{ animationDelay: "100ms" }}
      >
        {heroPhotoUrl ? (
          <div className="relative w-52 h-52 rounded-full overflow-hidden border-4 border-white shadow-glow-rose">
            <Image
              src={heroPhotoUrl}
              alt={heroPhotoAlt}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <IllustratedHeartPlaceholder />
        )}

        {/* Orbiting small hearts */}
        <span className="absolute -top-2 -right-2 text-2xl animate-bounce-soft">💕</span>
        <span className="absolute bottom-2 -left-4 text-xl animate-pulse-soft">🌸</span>
      </div>

      {/* Headline */}
      <h1
        className="font-display text-5xl md:text-6xl font-bold text-rose-500 mb-4 animate-fade-in-up leading-tight"
        style={{ animationDelay: "200ms" }}
      >
        {headline}
      </h1>

      {/* Personal message */}
      <div
        className="glass-card max-w-lg mx-auto px-8 py-6 mb-8 animate-fade-in-up"
        style={{ animationDelay: "350ms" }}
      >
        {formattedMessage.map((line, index) => (
          <p key={index} className="text-rose-700 text-lg leading-relaxed">
            {line}
          </p>
        ))}
        <p className="mt-4 text-sm text-blush-400 font-semibold">
          — with love, {senderName} 💌
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={onContinue}
        className="btn-primary animate-bounce-soft"
        style={{ animationDelay: "500ms" }}
        aria-label={`Open invitation for ${receiverName}`}
      >
        <Heart className="w-5 h-5 fill-current" />
        Read your invitation
      </button>
    </section>
  );
}

/** Shown when no heroPhotoUrl is configured. */
function IllustratedHeartPlaceholder() {
  return (
    <div className="w-52 h-52 rounded-full bg-linear-to-br from-rose-200 via-blush-300 to-rose-400 flex items-center justify-center shadow-glow-rose border-4 border-white">
      <span className="text-7xl select-none" aria-hidden="true">
        💖
      </span>
    </div>
  );
}