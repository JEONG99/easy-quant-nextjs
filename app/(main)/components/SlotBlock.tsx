import { twMerge } from "tailwind-merge";

interface SlotBlockProps {
  id: string;
  className?: string;
}

const SlotBlock: React.FC<SlotBlockProps> = ({ id, className }) => {
  return (
    <div id={id} className={twMerge("z-[1] absolute right-0", className)}>
      <div
        className={twMerge(
          "form-select-block min-h-[42px] bg-red-100",
          className
        )}
      >
        <span className="text-white font-medium text-sm">1슬롯 매수</span>
      </div>
    </div>
  );
};

export default SlotBlock;
