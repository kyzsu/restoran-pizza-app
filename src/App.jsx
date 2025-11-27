import React from "react";
import { createRoot } from "react-dom/client";
import Pizza from "./Pizza";

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

  return (
    <div>
      <h1>Pizza terbaik se-indonesia!</h1>
      {/* single closing tag karena tidak ada children yang di passing. */}
      <Pizza
        name="Pepperoni Pizza"
        description="Pepperoni dan Keju"
        image={"/public/pizzas/pepperoni.webp"}
      />
      <Pizza
        name="Meatlovers"
        description="Daging sapi, ayam, babi semuanya"
        image={"/public/pizzas/big_meat.webp"}
      />
    </div>
  );
};

// 15-17 digunakan untuk menampilkan element/variable App diatas, kedalam div id root
const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
