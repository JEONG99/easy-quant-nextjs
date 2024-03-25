import { v4 as uuidv4 } from "uuid";

import DragDropContainer from "./components/DragDropContainer";

export interface Quant {
  id: string;
  name: string;
}

const quantList: Quant[] = [
  { id: uuidv4(), name: "RSI20-70 전략 포트" },
  { id: uuidv4(), name: "RSI20-70 전략 포트" },
  { id: uuidv4(), name: "RSI20-70 전략 포트" },
  { id: uuidv4(), name: "RSI20-70 전략 포트" },
  { id: uuidv4(), name: "RSI20-70 전략 포트" },
  { id: uuidv4(), name: "RSI20-70 전략 포트" },
  { id: uuidv4(), name: "RSI20-70 전략 포트" },
  { id: uuidv4(), name: "RSI20-70 전략 포트" },
  { id: uuidv4(), name: "RSI20-70 전략 포트" },
  { id: uuidv4(), name: "RSI20-70 전략 포트" },
  { id: uuidv4(), name: "RSI20-70 전략 포트" },
  { id: uuidv4(), name: "RSI20-70 전략 포트" },
];

const InventoryPage = () => {
  return (
    <div className="px-8">
      <h1 className="pl-4 text-2xl font-bold text-purple-100">퀀트 비교하기</h1>
      <DragDropContainer items={quantList} />
    </div>
  );
};

export default InventoryPage;
