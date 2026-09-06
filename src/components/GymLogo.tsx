export function GymLogo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect width="40" height="40" rx="8" fill="#ff5a1f" />
      <path
        d="M8 20h4M28 20h4M12 14v12M28 14v12M16 20h8"
        stroke="#0b0b0c"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
