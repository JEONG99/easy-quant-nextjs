"use client";

import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import { CgClose } from "react-icons/cg";

import useDetailModal from "@/hooks/useDetailModal";
import { Line } from "react-chartjs-2";
import { twMerge } from "tailwind-merge";
import Button from "@/components/Button";
import { useRef } from "react";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

Chart.register([CategoryScale, LinearScale, LineElement, PointElement]);
const lineOptions = {
  elements: {
    point: {
      radius: 0,
    },
  },
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
const lineData = {
  labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  datasets: [
    {
      data: [5, 10, 24, 28, 40, 55, 44, 50, 60, 45, 47],
      borderColor: "#6B5CFF",
      borderWidth: 5,
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
  },
  {
    date: "2023년 10월 8일",
    type: "buy",
    item: "btc",
    amount: 0.8,
    price: 41349130,
    average_price: 12312300,
  },
  {
    date: "2024년 2월 3일",
    type: "sell",
    item: "btc",
    amount: 0.8,
    price: 50811090,
    average_price: 12312300,
  },
];

const DetailModal = () => {
  const { item, isOpen, onClose } = useDetailModal();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => {
    onClose();
  };

  useOnClickOutside(modalRef, handleClickOutside);

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
              <div className="w-[870px] h-[360px]">
                <Line
                  width={870}
                  height={360}
                  data={lineData}
                  options={lineOptions}
                />
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
