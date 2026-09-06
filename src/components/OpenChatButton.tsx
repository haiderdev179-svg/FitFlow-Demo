"use client";

import type { ReactNode } from "react";

export function OpenChatButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event("fitflow-open-chat"))}
    >
      {children}
    </button>
  );
}
