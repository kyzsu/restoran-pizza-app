import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

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

  const router = createRouter({ routeTree });

  return (
    // StrictMode untuk menjalankan codingan dua kali, supaya mempermudah proses debugging. Kalau gak pake strictMode, useDebugValuenya bakal tampil as error di devTools.
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};

// 15-17 digunakan untuk menampilkan element/variable App diatas, kedalam div id root
const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
