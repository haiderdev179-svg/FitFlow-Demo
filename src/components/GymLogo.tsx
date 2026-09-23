export function GymLogo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect width="40" height="40" rx="12" fill="#ff7a45" />
      <path d="M12 11.5c0-1.4 1.1-2.5 2.5-2.5h3.5c1.9 0 3.4 1.5 3.4 3.4v0c0 1.7-1.4 3.1-3.1 3.1H17v6.6h4.6c1.7 0 3.1 1.4 3.1 3.1v0c0 1.9-1.6 3.4-3.5 3.4H14.5C13.1 28.6 12 27.5 12 26.1V11.5Z" fill="#0b0d10" opacity="0.9" />
      <path d="M23 11.5h6.5c1.4 0 2.5 1.1 2.5 2.5v12.1c0 1.4-1.1 2.5-2.5 2.5H23v-4.5h3.6v-7.1H23v-5.5Z" fill="#0b0d10" opacity="0.9" />
      <path d="M12 23.5h6.8v4.5H12v-4.5Z" fill="#0b0d10" opacity="0.9" />
    </svg>
  );
}
