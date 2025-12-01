import { usePizzaoftheDay } from "./usePizzaoftheDay";
import kurs from "./utils/kurs";

const PizzaoftheDay = () => {
  const pizzaoftheDay = usePizzaoftheDay();

  if (!pizzaoftheDay) {
    return <div>loading...</div>;
  }

  return (
    <div className="pizza-of-the-day">
      <h2>Pizza of the day</h2>
      <div>
        <div className="pizza-of-the-day-info">
          <h3>{pizzaoftheDay.name}</h3>
          <p>{pizzaoftheDay.description}</p>
          <p className="pizza-of-the-day-price">
            From: <span>{kurs.format(pizzaoftheDay.sizes.S)}</span>
          </p>
        </div>
        <img
          src={pizzaoftheDay.image}
          alt={pizzaoftheDay.name}
          className="pizza-of-the-day-image"
        />
      </div>
    </div>
  );
};

export default PizzaoftheDay;
