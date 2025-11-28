import { useState } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import PizzaoftheDay from "../PizzaoftheDay";
import Header from "../Header";
import { CartContext } from "../contexts";

// rootRoute => index dari website kita -> www.pizzahut.com
export const Route = createRootRoute({
  component: () => {
    const cartHook = useState([]);

    return (
      <>
        <CartContext.Provider value={cartHook}>
          <div>
            <Header />
            {/* shapeshifter -> outlet dia bisa berubah bentuk / "portal". Kalo kita mengakses www.localhost:3000 ==> App.jsx, localhost:3000/order => outlet ini akan berubah jadi Order.jsx, /profile maka outlet akan menampilkan component profile.  */}
            <Outlet />
            <PizzaoftheDay />
          </div>
        </CartContext.Provider>
        <TanStackRouterDevtools />
      </>
    );
  },
});
