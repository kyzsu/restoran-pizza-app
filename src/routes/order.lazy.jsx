import { createLazyFileRoute } from "@tanstack/react-router";
import { useContext, useEffect, useState } from "react";

import Pizza from "../Pizza";
import Cart from "../Cart";
import { CartContext } from "../contexts";
import kurs from "../utils/kurs";
// import Order from "../Order";

export const Route = createLazyFileRoute("/order")({
  component: Order,
});

function Order() {
  // controlled forms -> dikontrol oleh hooks
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useContext(CartContext);

  let price, selectedPizza;
  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    price = kurs.format(
      selectedPizza.sizes ? selectedPizza.sizes[pizzaSize] : "",
    );
  }

  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  async function fetchPizzaTypes() {
    await new Promise((resolve) => setTimeout(resolve, 150));

    const res = await fetch("/api/pizzas");
    const json = await res.json();

    setPizzaTypes(json);
    setLoading(false);
  }

  async function checkout() {
    setLoading(true);
    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart,
      }),
    });

    setCart([]);
    setLoading(false);
  }

  return (
    <div className="order">
      <h2>create order</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCart([...cart, { pizza: selectedPizza, size: pizzaSize, price }]);
        }}
      >
        <div>
          <div>
            <label htmlFor="pizza-ype">Pizza Type</label>
            <select
              name="pizza-type"
              value={pizzaType}
              onChange={(e) => setPizzaType(e.target.value)}
            >
              {pizzaTypes.map((pizza) => (
                <option key={pizzaType.id} value={pizza.id}>
                  {pizza.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pizza-size">Pizza Size</label>
            <div>
              <span>
                <input
                  type="radio"
                  checked={pizzaSize === "S"}
                  name="pizza-size"
                  value="S"
                  id="pizza-s"
                  onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-s">Small</label>
              </span>
              <span>
                <input
                  type="radio"
                  checked={pizzaSize === "M"}
                  name="pizza-size"
                  value="M"
                  id="pizza-m"
                  onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-m">Medium</label>
              </span>
              <span>
                <input
                  type="radio"
                  checked={pizzaSize === "L"}
                  name="pizza-size"
                  value="L"
                  id="pizza-l"
                  onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
          </div>
          <button type="submit">Tambahkan ke keranjang</button>
        </div>
        {loading ? (
          <h3>loading...</h3>
        ) : (
          <div className="order-pizza">
            <Pizza
              name={selectedPizza.name}
              description={selectedPizza.description}
              image={selectedPizza.image}
            />
            <p>{price}</p>
          </div>
        )}
      </form>
      {loading ? <h2>loading...</h2> : <Cart cart={cart} checkout={checkout} />}
    </div>
  );
}
