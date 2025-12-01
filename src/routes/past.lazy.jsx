import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import getPastOrders from "../api/getPastOrders";

export const Route = createLazyFileRoute("/past")({
  component: PastOrdersRoute,
});

function PastOrdersRoute() {
  // useState pagination
  const [page, setPage] = useState(1);
  // custom hook dari react query untuk melakukan fetching data, dia return banyak prop tapi yang dipakai hanya isLoading, Data.
  const { isLoading, data } = useQuery({
    // queryKey => array yang berisi dua hal, 1. label dari query yang ingin kita lakukan, example: "past-orders"; 2. payload, karena si getPastOrders membutuhkan "Page".
    // queryFn => callback untuk panggil fungsi fetchingnya.
    // staleTime => waktu dia berada dalam status "fresh" alias tidak perlu hit API karena data masih dianggap relevan, dan setelah waktu yang ditetapkan barulah dia berubah jadi stale dan harus hit API lagi.
    queryKey: ["past-orders", { page, date, time }],
    queryFn: () => getPastOrders(page),
    staleTime: 60000,
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
              <td>{order.order_id}</td>
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
    </div>
  );
}
