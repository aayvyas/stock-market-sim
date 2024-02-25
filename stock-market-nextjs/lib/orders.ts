export type Order = {
  id: string;
  stockId: string;
  price: number;
  quantity: number;
  timestamp: string;
};

const fetchOrders = async (
  start: number,
  limit: number
): Promise<Array<Order> | undefined> => {
  try {
    let res = await fetch(
      `http://localhost:9000/orders/page?start=${start}&limit=${limit}`
    );

    if (res.ok) {
      const result: Array<Order> = await res.json();
      return result;
    }
  } catch (e) {
    console.log("Error: while fetching", e);
  }
};

export type OrderRequest = {
  stockId: string;
  price: number;
  quantity: number;
  type: "BUY" | "SELL";
};

const createOrder = async (
  orderRequest: OrderRequest
): Promise<Order | undefined> => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  console.log(orderRequest);
  var raw = JSON.stringify(orderRequest);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    let res = await fetch("http://localhost:9000/order", requestOptions);
    console.log(res);
    if (res.ok) {
      let order: Order = await res.json();
      return order;
    }
  } catch (e) {
    console.log("Error while creating orders", e);
  }
};

export { fetchOrders, createOrder };
