import { useEffect, useState } from "react";

export const usePizzaoftheDay = () => {
  const [pizzaoftheDay, setPizzaoftheDay] = useState(null);

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
