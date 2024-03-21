"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import BuyContent from "./BuyContent";

const Form = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "RSI20-70 전략 포트",
      budget: "5,000",
      slot: "4",
      slippage: "0.000",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-8 px-10">
        <span className="w-[212px] text-center text-2xl font-bold">
          퀀트 만들기
        </span>
        <div className="relative flex-1">
          <Input
            {...register("name", {
              required: "전략 이름을 입력해 주세요.",
            })}
            className={twMerge(
              "border",
              errors.name ? "border-red-100" : "border-white"
            )}
          />
          {errors.name && (
            <div className="error-message">{`${errors.name.message}`}</div>
          )}
        </div>
      </div>
      <div className="mt-8 flex gap-8">
        <div className="relative flex-1">
          <label className="mb-2 flex justify-center items-center w-full h-10 bg-[#f7f7fa] rounded-md font-medium text-sm">
            운용자금 (만원)
          </label>
          <Input
            {...register("budget", {
              required: "운용자금을 입력해 주세요.",
              onBlur: (event) =>
                setValue(
                  "budget",
                  event.target.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                ),
              onChange: (event) =>
                setValue("budget", event.target.value.replace(/[^0-9]/g, "")),
            })}
            onFocus={(event) =>
              setValue("budget", event.target.value.replaceAll(",", ""))
            }
            className={twMerge(
              "py-4 font-medium border",
              errors.budget ? "border-red-100" : "border-white"
            )}
          />
          {errors.budget && (
            <div className="error-message">{`${errors.budget.message}`}</div>
          )}
        </div>
        <div className="relative flex-1">
          <label className="mb-2 flex justify-center items-center w-full h-10 bg-[#f7f7fa] rounded-md font-medium text-sm">
            슬롯 개수
          </label>
          <Input
            {...register("slot", {
              required: "슬롯 개수를 입력해 주세요.",
              onBlur: (event) =>
                setValue(
                  "slot",
                  event.target.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                ),
              onChange: (event) =>
                setValue("slot", event.target.value.replace(/[^0-9]/g, "")),
            })}
            onFocus={(event) =>
              setValue("slot", event.target.value.replaceAll(",", ""))
            }
            className={twMerge(
              "py-4 font-medium border",
              errors.slot ? "border-red-100" : "border-white"
            )}
          />
          {errors.slot && (
            <div className="error-message">{`${errors.slot.message}`}</div>
          )}
        </div>
        <div className="relative flex-1">
          <label className="mb-2 flex justify-center items-center w-full h-10 bg-[#f7f7fa] rounded-md font-medium text-sm">
            허용 슬리피지 (%)
          </label>
          <Input
            {...register("slippage", {
              required: "허용 슬리피지를 입력해 주세요.",
              pattern: {
                value: /^[0-9]*\.?[0-9]+$/,
                message: "올바른 값을 입력해 주세요.",
              },
              onChange: (event) =>
                setValue(
                  "slippage",
                  event.target.value.replace(/[^0-9.]/g, "")
                ),
            })}
            className={twMerge(
              "py-4 font-medium border",
              errors.slippage ? "border-red-100" : "border-white"
            )}
          />
          {errors.slippage && (
            <div className="error-message">{`${errors.slippage.message}`}</div>
          )}
        </div>
      </div>
      <div className="my-8 flex gap-6">
        <div className="flex-1">
          <h2 className="mb-6 text-center text-2xl font-bold text-red-100">
            언제 살까요?
          </h2>
          <BuyContent />
        </div>
        <div className="flex-1">
          <h2 className="mb-6 text-center text-2xl font-bold text-blue-100">
            언제 팔까요?
          </h2>
          <div className="h-[550px] rounded-[10px] bg-[#f7f7fa]"></div>
        </div>
      </div>
      <Button type="submit" className="py-6">
        시뮬레이션 돌리기
      </Button>
    </form>
  );
};

export default Form;
