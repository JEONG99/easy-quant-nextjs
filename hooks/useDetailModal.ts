import { Quant } from "@/app/inventory/page";
import { create } from "zustand";

interface DetailModalStore {
  item: Quant | null;
  isOpen: boolean;
  onOpen: (item: Quant) => void;
  onClose: () => void;
}

const useDetailModal = create<DetailModalStore>((set) => ({
  item: null,
  isOpen: false,
  onOpen: (item) => set({ isOpen: true, item }),
  onClose: () => set({ isOpen: false, item: null }),
}));

export default useDetailModal;
