"use client";

import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { Quant } from "../page";
import { twMerge } from "tailwind-merge";
import useDetailModal from "@/hooks/useDetailModal";

interface ThumbnailProps {
  item: Quant;
  isOverlay?: boolean;
}

Chart.register([
  ArcElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
]);
const doughnutOptions: ChartOptions<"doughnut"> = {
  responsive: false,
  cutout: 28,
};
const lineOptions: ChartOptions<"line"> = {
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
      beginAtZero: true,
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
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};
const mddData: ChartData<"doughnut"> = {
  datasets: [
    {
      backgroundColor: ["#dedbfd", "#efefef"],
      hoverBackgroundColor: ["#dedbfd", "#efefef"],
      borderWidth: 0,
      data: [21, 79],
    },
  ],
};
const winRateData: ChartData<"doughnut"> = {
  datasets: [
    {
      backgroundColor: ["#6B5CFF", "#efefef"],
      hoverBackgroundColor: ["#6B5CFF", "#efefef"],
      borderWidth: 0,
      data: [49, 51],
    },
  ],
};
const lineData: ChartData<"line"> = {
  labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  datasets: [
    {
      data: [0, 10, 24, 28, 40, 55, 44, 50, 60, 45, 47],
      borderColor: "#6B5CFF",
      borderWidth: 2,
    },
  ],
};

const Thumbnail: React.FC<ThumbnailProps> = ({ item, isOverlay }) => {
  const { onOpen } = useDetailModal();

  return (
    <div
      onClick={() => onOpen(item)}
      className={twMerge(
        "h-[300px] py-3 px-5 bg-white shadow rounded-md transition cursor-pointer select-none",
        isOverlay ? "" : "hover:scale-105 hover:-translate-y-2"
      )}
    >
      <h3 className="font-medium text-base truncate">
        {item.name} {item.id}
      </h3>
      <div className="mt-1 flex justify-between items-center">
        <span className="font-medium text-xs">24.03.22</span>
        <span className="font-bold text-sm">14:23</span>
      </div>
      <div className="mt-5 flex">
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="relative">
            <Doughnut
              data={mddData}
              width={72}
              height={72}
              options={doughnutOptions}
            />
            <span className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] font-medium text-sm">
              {mddData.datasets[0].data[0]}%
            </span>
          </div>
          <span className="font-medium text-sm">MDD</span>
        </div>
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="relative">
            <Doughnut
              data={winRateData}
              width={72}
              height={72}
              options={doughnutOptions}
            />
            <span className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] font-medium text-sm">
              {winRateData.datasets[0].data[0]}%
            </span>
          </div>
          <span className="font-medium text-sm">승률</span>
        </div>
      </div>
      <div className="mt-5">
        <h4 className="font-medium text-sm">백테스트 수익률</h4>
        <div className="mt-2 flex items-center gap-4">
          <div>
            <Line
              width={80}
              height={50}
              data={lineData}
              options={lineOptions}
            />
          </div>
          <div>
            <h5 className="text-red-100 text-base font-bold">2112.32%</h5>
            <h6 className="font-normal text-[10px]">2017.02.01 ~ 2023.03.01</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;
