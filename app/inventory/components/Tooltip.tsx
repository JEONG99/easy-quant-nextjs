"use client";

import { twMerge } from "tailwind-merge";
import { useCallback, useEffect, useState } from "react";
import debounce from "debounce";

import { TTransaction } from "./DetailModal";

interface TooltipProps {
  item: TTransaction | null;
  isBuy?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ item, isBuy = false }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const debouncedHandleMouseEnter = debounce(() => setIsHovered(true), 500);
  const handlOnMouseLeave = useCallback(() => {
    setIsHovered(false);
    debouncedHandleMouseEnter.clear();
  }, [debouncedHandleMouseEnter]);

  useEffect(() => {
    const element = document
      .getElementsByClassName(`chart-best-point ${isBuy ? "buy" : "sell"}`)
      .item(0);
    if (!element) return;
    element.addEventListener("mouseenter", debouncedHandleMouseEnter);
    element.addEventListener("mouseleave", handlOnMouseLeave);
  }, [item, isBuy, debouncedHandleMouseEnter, handlOnMouseLeave]);

  return (
    <div
      id={`best-point-tooltip-${isBuy ? "buy" : "sell"}`}
      className={twMerge(
        "absolute w-[400px] h-[280px] px-8 py-8 rounded-[20px] bg-white shadow-tooltip transition-opacity",
        isHovered ? "opacity-100 z-10" : "opacity-0 z-0"
      )}
    >
      <h5 className="text-sm font-medium">{item?.date}</h5>
      <div className="mt-4 flex justify-between items-center">
        <div className="text-2xl font-medium">
          <span className={twMerge(isBuy ? "text-red-100" : "text-blue-100")}>
            {isBuy ? "매수" : "매도"}{" "}
          </span>
          <span>
            {item?.amount}
            {item?.item.toLocaleUpperCase()}
          </span>
        </div>
        <span
          className={twMerge(
            "text-2xl font-bold",
            isBuy ? "text-red-100" : "text-blue-100"
          )}
        >
          수익률 {item?.rate_of_return}%
        </span>
      </div>
      <ul className="mt-8 px-2">
        <li className="mt-3 text-xl font-medium text-right">
          금액&emsp;
          {item?.price.toLocaleString("ko-KR")}원
        </li>
        <li className="mt-3 text-xl font-medium text-right">
          평균 단가&emsp;
          {item?.average_price.toLocaleString("ko-KR")}원
        </li>
        <li className="mt-3 text-xl font-medium text-right">
          손익 금액&emsp;
          {item?.profit_loss_amount.toLocaleString("ko-KR")}원
        </li>
      </ul>
    </div>
  );
};

export default Tooltip;
