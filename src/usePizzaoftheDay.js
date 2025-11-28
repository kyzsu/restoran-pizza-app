import { useEffect, useState, useDebugValue } from "react";

// custom hook krn pake lebih dari satu hooks basic yang menjadi suatu custom hook.
export const usePizzaoftheDay = () => {
  const [pizzaoftheDay, setPizzaoftheDay] = useState(null);

  // react dev tools --> install via chrome extension.
  useDebugValue(pizzaoftheDay ? `${pizzaoftheDay.name}` : "loading...");

  useEffect(() => {
    async function fetchPizzaoftheDay() {
      const res = await fetch("/api/pizza-of-the-day");
      const json = await res.json();
      setPizzaoftheDay(json);
    }

    fetchPizzaoftheDay();
  }, []);

  return pizzaoftheDay;
};
