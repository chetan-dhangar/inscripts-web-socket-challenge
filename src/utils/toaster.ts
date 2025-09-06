import type { ToastTypes } from "@/types";
import { toast } from "sonner";

export default function toaster({
  message = "",
  description = "",
}: ToastTypes) {
  return toast(message, {
    description,
    action: {
      label: "Undo",
      onClick: () => null,
    },
  });
}
