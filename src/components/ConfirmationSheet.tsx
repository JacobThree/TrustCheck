import { PrimaryButton, SecondaryButton } from "./Button";
import { Modal } from "./Modal";

type Props = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

// The safer choice is always the primary button.
export function ConfirmationSheet({ open, title, message, confirmLabel, cancelLabel, onConfirm, onCancel }: Props) {
  return (
    <Modal open={open} title={title} onClose={onCancel} variant="sheet">
      <p className="body-text">{message}</p>
      <div className="button-stack">
        <PrimaryButton onClick={onCancel}>{cancelLabel}</PrimaryButton>
        <SecondaryButton onClick={onConfirm}>{confirmLabel}</SecondaryButton>
      </div>
    </Modal>
  );
}
