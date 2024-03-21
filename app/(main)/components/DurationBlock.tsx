import { twMerge } from "tailwind-merge";

interface DurationBlockProps {
  id: string;
  className?: string;
}

const DurationBlock: React.FC<DurationBlockProps> = ({ id, className }) => {
  return (
    <div
      id={id}
      className={twMerge(
        "form-select-block left-0 min-w-[112px] bg-purple-100",
        className
      )}
    >
      <span className="text-white font-medium text-sm">10분 마다</span>
    </div>
  );
};

export default DurationBlock;
