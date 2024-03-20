import Button from "@/components/Button";
import Input from "@/components/Input";

const Home = () => {
  return (
    <div className="pb-20">
      <form>
        <div className="flex items-center gap-8 px-10">
          <span className="w-[212px] text-center text-2xl font-bold text-purple-100">
            퀀트 만들기
          </span>
          <Input className="flex-1" defaultValue="RSI20-70 전략 포트" />
        </div>
        <div className="mt-8 flex gap-8">
          <div className="flex-1">
            <label className="mb-2 flex justify-center items-center w-full h-10 bg-[#f7f7fa] rounded-md font-medium text-sm">
              운용자금
            </label>
            <Input className="py-5 font-medium" defaultValue="5,000 만원" />
          </div>
          <div className="flex-1">
            <label className="mb-2 flex justify-center items-center w-full h-10 bg-[#f7f7fa] rounded-md font-medium text-sm">
              슬롯 개수
            </label>
            <Input className="py-5 font-medium" defaultValue="4개" />
          </div>
          <div className="flex-1">
            <label className="mb-2 flex justify-center items-center w-full h-10 bg-[#f7f7fa] rounded-md font-medium text-sm">
              허용 슬리피지
            </label>
            <Input className="py-5 font-medium" defaultValue="0.000%" />
          </div>
        </div>
        <div className="my-8 flex gap-6">
          <div className="flex-1">
            <h2 className="mb-6 text-center text-2xl font-bold text-red-100">
              언제 살까요?
            </h2>
            <div className="h-[550px] rounded-[10px] bg-[#f7f7fa]"></div>
          </div>
          <div className="flex-1">
            <h2 className="mb-6 text-center text-2xl font-bold text-blue-100">
              언제 팔까요?
            </h2>
            <div className="h-[550px] rounded-[10px] bg-[#f7f7fa]"></div>
          </div>
        </div>
        <Button className="py-6">시뮬레이션 돌리기</Button>
      </form>
    </div>
  );
};

export default Home;
