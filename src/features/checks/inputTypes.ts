import { Image, Link2, MessageSquareText, QrCode, type LucideIcon } from "lucide-react";
import type { InputType } from "../../types/trustcheck";

export const inputTypes: Record<
  InputType,
  { title: string; description: string; noun: string; Icon: LucideIcon; to: string }
> = {
  message: {
    title: "Check a Message",
    description: "A text, email, or chat message",
    noun: "message",
    Icon: MessageSquareText,
    to: "/prototype/check/message",
  },
  link: {
    title: "Check a Link",
    description: "A website address someone sent you",
    noun: "link",
    Icon: Link2,
    to: "/prototype/check/link",
  },
  qr: {
    title: "Scan a QR Code",
    description: "A square code on a sign, sticker, or letter",
    noun: "QR code",
    Icon: QrCode,
    to: "/prototype/check/qr",
  },
  screenshot: {
    title: "Check a Screenshot",
    description: "A picture of your screen or a photo",
    noun: "screenshot",
    Icon: Image,
    to: "/prototype/check/screenshot",
  },
};
