import { twMerge } from "tailwind-merge";

interface ConditionBlockProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const ConditionBlock: React.FC<ConditionBlockProps> = ({
  id,
  children,
  className,
}) => {
  return (
    <div id={id} className={twMerge("form-select-block", className)}>
      <div className="flex flex-col items-center gap-1 text-sm font-medium">
        {children}
      </div>
    </div>
  );
};

export default ConditionBlock;
