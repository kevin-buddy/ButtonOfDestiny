'use client';

/** Decorative animated hearts floating in the background. */
export function FloatingHearts() {
  const hearts = [
    { className: "heart-1", size: 18, duration: "7s" },
    { className: "heart-2", size: 12, duration: "9s" },
    { className: "heart-3", size: 22, duration: "6s" },
    { className: "heart-4", size: 10, duration: "11s" },
    { className: "heart-5", size: 16, duration: "8s" },
    { className: "heart-6", size: 20, duration: "7.5s" },
    { className: "heart-7", size: 14, duration: "10s" },
    { className: "heart-8", size: 8,  duration: "6.5s" },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
    >
      {hearts.map(({ className, size, duration }) => (
        <span
          key={className}
          className={`absolute bottom-0 animate-float-up opacity-0 text-rose-300 select-none ${className}`}
          style={{ fontSize: size, animationDuration: duration }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}