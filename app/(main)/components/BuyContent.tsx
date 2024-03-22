import Xarrow, { Xwrapper } from "react-xarrows";
import ConditionBlock from "./ConditionBlock";
import DurationBlock from "./DurationBlock";
import SlotBlock from "./SlotBlock";

const BuyContent = () => {
  const arrowOptions = {
    color: "#dedbfd",
    headSize: 4,
    strokeWidth: 3,
    zIndex: 0,
  };

  return (
    <div className="h-[550px] px-14 py-10 rounded-[10px] bg-[#f7f7fa]">
      <div className="relative h-full">
        <Xwrapper>
          <DurationBlock id="duration" className="top-[120px]" />
          <ConditionBlock id="block1" className="top-0">
            <span>COINMARKETCAP</span>
            <span>상위 50개 종목</span>
          </ConditionBlock>
          <ConditionBlock id="block2" className="top-[120px]">
            <span>최근 10일 거래량</span>
            <span>Top 10</span>
          </ConditionBlock>
          <ConditionBlock id="block3" className="top-[240px]">
            <span>RSI 30</span>
            <span>상향돌파</span>
          </ConditionBlock>
          <SlotBlock id="slot" className="top-[360px]" />
          <Xarrow
            start="duration"
            end="block1"
            {...arrowOptions}
            path="grid"
            startAnchor="top"
          />
          <Xarrow start="block1" end="block2" {...arrowOptions} />
          <Xarrow start="block2" end="block3" {...arrowOptions} />
          <Xarrow start="block3" end="slot" {...arrowOptions} />
          <Xarrow
            start="slot"
            end="duration"
            {...arrowOptions}
            startAnchor="bottom"
            endAnchor="bottom"
            path="grid"
            gridBreak="-15%"
          />
        </Xwrapper>
      </div>
    </div>
  );
};

export default BuyContent;
