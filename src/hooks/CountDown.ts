import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CountDown = (
  countTime: number | null,
  setCountTime: (num: number) => void
) => {
  const navigate = useNavigate();
  useEffect(() => {
    const countDownInterval = setInterval(() => {
      if (countTime === 0) {
        clearInterval(countDownInterval);
        navigate("/result");
      }
      if (countTime && countTime > 0) {
        setCountTime(countTime - 1);
      }
    }, 1000);
    return () => {
      clearInterval(countDownInterval);
    };
  }, [countTime]);
};

export { CountDown };
