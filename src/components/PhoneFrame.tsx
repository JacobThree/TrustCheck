import type { ReactNode } from "react";

// Presentation-mode device frame. On phone-sized screens the frame disappears
// and the prototype fills the viewport (spec §6.1).
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="phone-stage">
      <div className="phone-frame">{children}</div>
    </div>
  );
}
