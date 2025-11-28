import { useState, useEffect } from "react";
import Pizza from "./Pizza";

// fungsi untuk format kurs.
const kurs = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Order() {
  // useState mengembalikan dua nilai dalam array, [elemen pertama = valuenya, elemen kedua = fungsi untuk mengganti value]

  //   untuk menyimpan jenis-jenis pizza yang ada yang diambil dari server
  const [pizzaTypes, setPizzaTypes] = useState([]);
  //   untuk menyimpan pizza yang dipilih
  const [pizzaType, setPizzaType] = useState("pepperoni");
  // simpan ukuran pizza
  const [pizzaSize, setPizzaSize] = useState("M");
  // state untuk loading
  const [loading, setLoading] = useState(true);

  let price, selectedPizza;
  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    price = kurs.format(
      selectedPizza.sizes ? selectedPizza.sizes[pizzaSize] : "",
    );
  }

  // dua argumen => 1. callback fn, 2. dependencies.
  // jika array dari depedencies kosong, maka callback hanya akan dijalankan sekali. Setelah pagenya di-render.
  // jika array ada isi, maka dia akan dijalankan kalo si nilai dari dependencies-nya berubah.
  // infinite loop kalo tidak ada dependency.
  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  // single threading, line satu per satu, async await => multi threading.
  // dia bisa menjalankan dua atau lebih task di waktu yang bersamaan.
  // async await ini dipake, karena
  async function fetchPizzaTypes() {
    // simulasi real-world yang ada delay, delay 3000ms
    await new Promise((resolve) => setTimeout(resolve, 150));

    // JS Promise => saat kita call API, kita beri Timeout (async)
    // Promise punya 3 state: Pending (default), Fulfilled, Rejected.

    // await karena menunggu hasil/response dari server
    const res = await fetch("/api/pizzas");
    // await karena dia bergantung pada variable "res".
    const json = await res.json();

    setPizzaTypes(json);
    setLoading(false);
  }

  return (
    <div className="order">
      <h2>create order</h2>
      <form action="">
        <div>
          <div>
            <label htmlFor="pizza-ype">Pizza Type</label>
            <select
              name="pizza-type"
              value={pizzaType}
              onChange={(e) => setPizzaType(e.target.value)}
            >
              {/* <option value="Pepperoni">Pepperoni Pizza</option>
              <option value="Hawaiian">Hawaiian Pizza</option>
              <option value="Meat_Lovers">Meat Lovers Pizza</option> */}
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
    </div>
  );
}
