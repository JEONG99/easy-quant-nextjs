import { useState } from "react";
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
  const [openCustom, setOpenCustom] = useState<boolean>(false);

  return (
    <div id={id} className={twMerge("z-[1] absolute right-0", className)}>
      <div
        className="form-select-block gap-1 text-sm font-medium"
        onClick={() => setOpenCustom((prev) => !prev)}
      >
        {children}
      </div>
      {openCustom && (
        <div className="absolute top-1/2 right-[-20px] w-[250px] h-[345px] rounded-[10px] bg-white shadow translate-y-[-50%] translate-x-full">
          <div className="z-[1] relative">커스터마이징</div>
          <div className="z-[0] absolute top-1/2 left-0 w-6 h-6 bg-white transform rotate-45 translate-y-[-50%]"></div>
        </div>
      )}
    </div>
  );
};

export default ConditionBlock;
