import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  variant?: "dialog" | "sheet";
};

export function Modal({ open, title, onClose, children, variant = "dialog" }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    // Only report closes the user caused (e.g. Escape), not ones driven by the `open` prop.
    <dialog ref={ref} className={`modal modal-${variant}`} onClose={() => open && onClose()} aria-label={title}>
      <h2 className="modal-title">{title}</h2>
      {children}
    </dialog>
  );
}
