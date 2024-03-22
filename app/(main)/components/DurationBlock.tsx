import { twMerge } from "tailwind-merge";

interface DurationBlockProps {
  id: string;
  className?: string;
}

const DurationBlock: React.FC<DurationBlockProps> = ({ id, className }) => {
  return (
    <div id={id} className={twMerge("z-[1] absolute left-0", className)}>
      <div className="form-select-block min-w-[112px] bg-purple-100">
        <span className="text-white font-medium text-sm">10분 마다</span>
      </div>
    </div>
  );
};

export default DurationBlock;
