import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

import Modal from "../Modal";
import kurs from "../utils/kurs";
import ErrorBoundary from "../ErrorBoundary";
import getPastOrder from "../api/getPastOrder";
import getPastOrders from "../api/getPastOrders";

export const Route = createLazyFileRoute("/past")({
  component: ErrorBoundaryWrappingPastOrders,
});

function ErrorBoundaryWrappingPastOrders() {
  return (
    <ErrorBoundary>
      <PastOrdersRoute />
    </ErrorBoundary>
  );
}

function PastOrdersRoute() {
  // useState pagination
  const [page, setPage] = useState(1);
  const [focusedOrder, setFocusedOrder] = useState();
  // custom hook dari react query untuk melakukan fetching data, dia return banyak prop tapi yang dipakai hanya isLoading, Data.
  const { isLoading, data } = useQuery({
    // queryKey => array yang berisi dua hal, 1. label dari query yang ingin kita lakukan, example: "past-orders"; 2. payload, karena si getPastOrders membutuhkan "Page".
    // queryFn => callback untuk panggil fungsi fetchingnya.
    // staleTime => waktu dia berada dalam status "fresh" alias tidak perlu hit API karena data masih dianggap relevan, dan setelah waktu yang ditetapkan barulah dia berubah jadi stale dan harus hit API lagi.
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 60000,
  });

  // isloading dan data diberikan alias untuk menghindari conflict karena sudah dipakai di line sebelumnya.
  const { isLoading: isLoadingOrder, data: orderData } = useQuery({
    queryKey: ["past-order", focusedOrder],
    queryFn: () => getPastOrder(focusedOrder),
    enabled: !!focusedOrder,
    staleTime: 24 * 60 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="past-orders">
        <h2>loading...</h2>
      </div>
    );
  }

  return (
    <div className="past-orders">
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Date</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id}>
              <td>
                <button onClick={() => setFocusedOrder(order.order_id)}>
                  {order.order_id}
                </button>
              </td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <div>{page}</div>
        <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
      {focusedOrder ? (
        <Modal>
          <h2>Order #{focusedOrder}</h2>
          {!isLoadingOrder ? (
            <table>
              <thead>
                <tr>
                  <td>Image</td>
                  <td>Name</td>
                  <td>Size</td>
                  <td>Quantity</td>
                  <td>Price</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                {orderData.orderItems.map((pizza) => (
                  <tr key={`${pizza.pizzaTypeId}_${pizza.size}`}>
                    <td>
                      <img src={pizza.image} alt={pizza.name} />
                    </td>
                    <td>{pizza.name}</td>
                    <td>{pizza.size}</td>
                    <td>{pizza.quantity}</td>
                    <td>{kurs.format(pizza.price)}</td>
                    <td>{kurs.format(pizza.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>loading...</p>
          )}
          <button onClick={() => setFocusedOrder()}>Tutup</button>
        </Modal>
      ) : null}
    </div>
  );
}
