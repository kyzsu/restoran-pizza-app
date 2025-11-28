const kurs = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Cart({ cart, checkout }) {
  let total = 0;
  for (let x = 0; x < cart.length; x++) {
    const current = cart[x];
    total += current.pizza.sizes[current.size];
  }

  return (
    <div className="cart">
      <h2>cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span className="size">{item.size}</span> |{" "}
            <span className="type">{item.pizza.name}</span> |{" "}
            <span className="price">{item.price}</span>
          </li>
        ))}
      </ul>
      <p>Total Harga: {kurs.format(total)}</p>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}
