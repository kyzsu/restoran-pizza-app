import React, { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
// import Pizza from "./Pizza";
import Order from "./Order";
import PizzaoftheDay from "./PizzaoftheDay";
import Header from "./Header";
import { CartContext } from "./contexts";

const App = () => {
  // const app -> arrow function yang akan menghasilkan element React.
  // createElement memerlukan tiga parameter:
  // 1. element HTML
  // 2. adalah property/attribute element tersebut
  // 3. children.
  // return React.createElement("div", {}, [
  //   React.createElement("h1", {}, "Pizza terbaik se-indonesia!"),
  //   React.createElement(Pizza, {
  //     name: "Pepperoni Pizza",
  //     description: "Pepperoni dan Keju",
  //   }),
  // React.createElement(Pizza, {
  //   name: "Meatlovers",
  //   description: "daging sapi, ayam, babi semuanya",
  // }),
  // ]);

  // tempat simpannya cart.
  const cartHook = useState([]);

  return (
    // StrictMode untuk menjalankan codingan dua kali, supaya mempermudah proses debugging. Kalau gak pake strictMode, useDebugValuenya bakal tampil as error di devTools.
    <StrictMode>
      <CartContext.Provider value={cartHook}>
        <div>
          {/* <h1>Pizza terbaik se-indonesia!</h1> */}
          <Header />
          {/* single closing tag karena tidak ada children yang di passing. */}
          {/* <Pizza
        name="Pepperoni Pizza"
        description="Pepperoni dan Keju"
        image={"/public/pizzas/pepperoni.webp"}
        />
        <Pizza
        name="Meatlovers"
        description="Daging sapi, ayam, babi semuanya"
        image={"/public/pizzas/big_meat.webp"}
        /> */}
          <Order />
          <PizzaoftheDay />
        </div>
      </CartContext.Provider>
    </StrictMode>
  );
};

// 15-17 digunakan untuk menampilkan element/variable App diatas, kedalam div id root
const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
