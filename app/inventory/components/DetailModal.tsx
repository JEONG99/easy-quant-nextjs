"use client";

import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ChartData,
  ChartOptions,
} from "chart.js";
import { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { ImMinus, ImPlus } from "react-icons/im";
import { CgClose } from "react-icons/cg";
import { Line } from "react-chartjs-2";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

import useDetailModal from "@/hooks/useDetailModal";
import Button from "@/components/Button";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import Tooltip from "./Tooltip";

type TData = number[];
type TLabel = {
  title: string;
  isBestBuy: boolean;
  isBestSell: boolean;
};
export type TTransaction = {
  id: string;
  date: string;
  type: string;
  item: string;
  amount: number;
  price: number;
  average_price: number;
  profit_loss_amount: number;
  rate_of_return: number;
};

Chart.register([CategoryScale, LinearScale, LineElement, PointElement]);
const lineOptions: ChartOptions<"line"> = {
  scales: {
    x: {
      ticks: {
        display: false,
      },
      border: {
        display: false,
      },
      beginAtZero: false,
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        display: false,
      },
      border: {
        display: false,
      },
      beginAtZero: false,
      grid: {
        display: false,
      },
    },
  },
  layout: {
    padding: {
      top: 5,
    },
  },
};
const lineData: ChartData<"line", TData, TLabel> = {
  labels: [
    { title: "2023년 9월 18일", isBestBuy: false, isBestSell: false },
    { title: "2023년 9월 30일", isBestBuy: true, isBestSell: false },
    { title: "2023년 10월 14일", isBestBuy: false, isBestSell: false },
    { title: "2023년 11월 3일", isBestBuy: false, isBestSell: false },
    { title: "2023년 11월 24일", isBestBuy: false, isBestSell: false },
    { title: "2023년 12월 18일", isBestBuy: false, isBestSell: false },
    { title: "2024년 1월 10일", isBestBuy: false, isBestSell: false },
    { title: "2024년 1월 28일", isBestBuy: false, isBestSell: false },
    { title: "2024년 2월 14일", isBestBuy: false, isBestSell: true },
    { title: "2024년 3월 1일", isBestBuy: false, isBestSell: false },
    { title: "2024년 3월 18일", isBestBuy: false, isBestSell: false },
  ],
  datasets: [
    {
      label: "Dataset 1",
      data: [18, 14, 24, 28, 40, 55, 44, 50, 60, 45, 47],
      borderColor: "#6B5CFF",
      borderWidth: 5,
      pointRadius: 0,
    },
  ],
};
const transactionList = [
  {
    date: "2023년 9월 23일",
    type: "buy",
    item: "eth",
    amount: 0.2,
    price: 5849840,
    average_price: 5312300,
    profit_loss_amount: 8176160,
    rate_of_return: 19.6,
  },
  {
    date: "2023년 10월 8일",
    type: "buy",
    item: "btc",
    amount: 0.8,
    price: 41349130,
    average_price: 12312300,
    profit_loss_amount: 8176160,
    rate_of_return: 19.6,
  },
  {
    date: "2024년 2월 3일",
    type: "sell",
    item: "btc",
    amount: 0.8,
    price: 50811090,
    average_price: 12312300,
    profit_loss_amount: 8176160,
    rate_of_return: 19.6,
  },
];

const DetailModal = () => {
  const { item, isOpen, onClose } = useDetailModal();
  const chartRef = useRef<any>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [bestBuyTransaction, setBestBuyTransaction] =
    useState<TTransaction | null>(null);
  const [bestSellTransaction, setBestSellTransaction] =
    useState<TTransaction | null>(null);

  const handleClickOutside = () => {
    onClose();
  };

  useOnClickOutside(modalRef, handleClickOutside);

  const setTooltipPosition = (isBuy: boolean, x: number, y: number) => {
    const tooltip = document.getElementById(
      `best-point-tooltip-${isBuy ? "buy" : "sell"}`
    );
    if (!tooltip) return;

    if (x < 440) {
      tooltip.style.left = `${x + 20}px`;
    } else {
      tooltip.style.left = `${x - 20}px`;
      tooltip.style.transform = "translateX(-100%)";
    }
    if (isBuy) {
      tooltip.style.top = `${y - 20}px`;
    } else {
      tooltip.style.top = `${y + 20}px`;
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    if (chartRef && chartRef.current && chartRef.current.ctx) {
      const chartInstance = chartRef.current;
      const ctx = chartInstance.ctx;
      const data = chartInstance.config._config.data;
      const labels: TLabel[] = data.labels;

      chartRef.current.canvas.style.position = "relative";

      const buyIndex = labels.findIndex((label) => label.isBestBuy);
      const sellIndex = labels.findIndex((label) => label.isBestSell);
      const dataset = data.datasets[0];

      if (buyIndex !== -1) {
        const buyPoint = dataset.data[buyIndex];
        const x = chartInstance.scales["x"].getPixelForValue(buyIndex);
        const y = chartInstance.scales["y"].getPixelForValue(buyPoint);

        const buyElement = document.createElement("div");
        buyElement.innerHTML = renderToString(
          <ImPlus size={14} className="text-purple-100" />
        );
        const buyText = document.createElement("span");
        buyText.innerText = "최고의 매수";
        buyElement.appendChild(buyText);

        // 데이터 맞춰 수정 필요
        setBestBuyTransaction({ ...transactionList[1], id: uuidv4() });
        setTooltipPosition(true, x, y);

        buyElement.classList.add("chart-best-point", "buy");
        buyElement.style.left = x - 20 + "px";
        buyElement.style.top = y - 20 + "px";
        ctx.canvas.parentNode.appendChild(buyElement);
      }

      if (sellIndex !== -1) {
        const sellPoint = dataset.data[sellIndex];
        const x = chartInstance.scales["x"].getPixelForValue(sellIndex);
        const y = chartInstance.scales["y"].getPixelForValue(sellPoint);

        const sellElement = document.createElement("div");
        sellElement.innerHTML = renderToString(
          <ImMinus size={14} className="text-purple-100" />
        );
        const sellText = document.createElement("span");
        sellText.innerText = "최고의 매도";
        sellElement.appendChild(sellText);

        // 데이터 맞춰 수정 필요
        setBestSellTransaction({ ...transactionList[2], id: uuidv4() });
        setTooltipPosition(false, x, y);

        sellElement.classList.add("chart-best-point", "sell");
        sellElement.style.left = x - 20 + "px";
        sellElement.style.top = y - 20 + "px";
        ctx.canvas.parentNode.appendChild(sellElement);
      }
    }
  }, [chartRef, isOpen]);

  if (!isOpen) return null;
  return (
    <div className="z-10 absolute inset-0">
      <div className="flex justify-center items-center h-full">
        <div
          ref={modalRef}
          className="px-12 py-8 max-w-[1025px] w-11/12 h-[950px] rounded-[20px] bg-white shadow-modal"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-[44px] font-bold text-black-100">
              {item?.name} 상세보기
            </h1>
            <button onClick={onClose}>
              <CgClose size={46} className="text-black" />
            </button>
          </div>
          <div className="mt-12">
            <div>
              <h5 className="text-right text-purple-100 text-sm font-bold cursor-pointer">
                내 또래 수익률은 얼마일까?
              </h5>
            </div>
            <div className="relative mt-12 flex justify-center">
              <div className="absolute bottom-0 w-full h-[2px] bg-purple-50 rounded-xl" />
              <div className="absolute left-0 bottom-3 h-full border-l-2 border-dashed border-purple-50" />
              <div className="absolute right-0 bottom-3 h-full border-r-2 border-dashed border-purple-50" />
              <div className="z-0 absolute left-1/2 bottom-3 h-full border-r-2 border-dashed border-purple-50 translate-x-[2px]" />
              <div className="relative w-[870px] h-[360px]">
                <Line
                  ref={chartRef}
                  width={870}
                  height={360}
                  data={lineData}
                  options={lineOptions}
                />
                <Tooltip item={bestBuyTransaction} isBuy />
                <Tooltip item={bestSellTransaction} />
              </div>
            </div>
            <div className="mt-2 flex justify-between text-black-100 text-sm font-medium">
              <span>23. 09.18</span>
              <span>23. 12.18</span>
              <span>24. 03.18</span>
            </div>
          </div>
          <ul className="mt-14">
            {transactionList.map((item, i) => (
              <li key={i} className="mt-4 flex gap-3 text-lg font-normal">
                <div>
                  <span>{item.date} </span>
                  <span
                    className={twMerge(
                      "font-medium",
                      item.type === "buy" ? "text-red-100" : "text-blue-100"
                    )}
                  >
                    {item.type === "buy" ? "매수" : "매도"}
                  </span>
                </div>
                <div>
                  <span>
                    {item.amount}
                    {item.item.toLocaleUpperCase()}
                  </span>
                </div>
                <div>
                  <span>금액 {item.price.toLocaleString("ko-KR")}원</span>
                </div>
                <div>
                  <span>
                    평균단가 {item.average_price.toLocaleString("ko-KR")}원
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-16 flex gap-2">
            <Button
              onClick={onClose}
              className="py-5 bg-gray-100 text-purple-100 shadow-none"
            >
              닫기
            </Button>
            <Button className="py-5">퀀트 수정하기</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
