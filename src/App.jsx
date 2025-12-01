import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
  // membuat instance dari QueryClient yang di-assign ke dalam variable queryClient.
  const queryClient = new QueryClient();

  return (
    // StrictMode untuk menjalankan codingan dua kali, supaya mempermudah proses debugging. Kalau gak pake strictMode, useDebugValuenya bakal tampil as error di devTools.
    <StrictMode>
      {/* alasan queryClientProvider membungkus routerprovider supaya semua route yang kita buat dapat menggunakan React Query untuk fetching data. */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
};

// 15-17 digunakan untuk menampilkan element/variable App diatas, kedalam div id root
const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
