import { useState } from "react";

export default function useCount() {
  const [count, setCount] = useState(0);
  const handlePlus = () => {
    setCount((prev) => prev + 1);
  };

  const handleMinus = () => {
    count > 0 && setCount((prev) => prev - 1);
  };
  return {
    count,
    handlePlus,
    handleMinus,
  };
}
