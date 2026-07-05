"use client";
import { useState, useCallback, useRef } from "react";
import { Heart, Sparkles } from "lucide-react";
import { InvitationConfig } from "@/types/date-form";

interface DateInvitationProps {
  config: InvitationConfig;
  onYes: () => void;
}

export function DateInvitation({ config, onYes }: DateInvitationProps) {
  const [noMessageIndex, setNoMessageIndex] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState<{ x: number; y: number } | null>(null);
  const [hasClickedYes, setHasClickedYes] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const { invitationQuestion, yesButtonLabel, noButtonLabel, noPanicMessages } = config;

  /** Moves the "No" button to a random position when hovered/focused. */
  const handleNoButtonEscape = useCallback(() => {
    const viewportWidth  = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const buttonWidth    = noButtonRef.current?.offsetWidth  ?? 120;
    const buttonHeight   = noButtonRef.current?.offsetHeight ?? 48;

    const randomX = Math.random() * (viewportWidth  - buttonWidth  - 40) + 20;
    const randomY = Math.random() * (viewportHeight - buttonHeight - 40) + 20;

    setNoButtonPosition({ x: randomX, y: randomY });
    setNoMessageIndex((prev) => (prev + 1) % noPanicMessages.length);
  }, [noPanicMessages.length]);

  const handleYesClick = useCallback(() => {
    setHasClickedYes(true);
    setTimeout(onYes, 600);
  }, [onYes]);

  const currentPanicMessage = noButtonPosition ? noPanicMessages[noMessageIndex] : null;

  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-dvh px-6 py-16 text-center">

      {/* Floating panic message */}
      {currentPanicMessage && (
        <div
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50
                     glass-card px-6 py-3 text-rose-600 font-semibold
                     animate-scale-in pointer-events-none text-sm shadow-glow-rose"
          aria-live="polite"
        >
          {currentPanicMessage}
        </div>
      )}

      {/* Envelope illustration */}
      <div className="text-8xl mb-6 animate-bounce-soft" aria-hidden="true">
        💌
      </div>

      <p className="section-label mb-4">the big question</p>

      <h2 className="font-display text-4xl md:text-5xl font-bold text-rose-500 mb-4 leading-tight max-w-md">
        {invitationQuestion}
      </h2>

      <p className="text-rose-400 mb-12 text-base">
        (Tap Yes — I promise it&apos;ll be worth it 🥺)
      </p>

      {/* Yes button */}
      <button
        onClick={handleYesClick}
        disabled={hasClickedYes}
        className={`btn-primary mb-6 transition-all duration-300 ${
          hasClickedYes ? "scale-110 opacity-80" : ""
        }`}
        aria-label="Yes, I'll go on a date!"
      >
        {hasClickedYes ? (
          <>
            <Sparkles className="w-5 h-5" />
            Yay! Let&apos;s plan it! 🎉
          </>
        ) : (
          <>
            <Heart className="w-5 h-5 fill-current" />
            {yesButtonLabel}
          </>
        )}
      </button>

      {/* "No" button — it runs away */}
      <button
        ref={noButtonRef}
        onMouseEnter={handleNoButtonEscape}
        onFocus={handleNoButtonEscape}
        className={`btn-secondary text-sm transition-none ${
          noButtonPosition ? "fixed" : "relative"
        }`}
        style={
          noButtonPosition
            ? { left: noButtonPosition.x, top: noButtonPosition.y, zIndex: 40 }
            : {}
        }
        aria-label={`${noButtonLabel} (this button might escape)`}
        tabIndex={0}
      >
        {noButtonLabel}
      </button>
    </section>
  );
}