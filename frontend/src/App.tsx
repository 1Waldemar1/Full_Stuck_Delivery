import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout/layout";

import { ProductPage } from "./pages/product/product";
import { ClientPage } from "./pages/client/client";
import { CourierPage } from "./pages/courier/courier";

import { OrderPage } from "./pages/order/order";
import { ListOfProductsPage } from "./pages/list-of-products/list-of-products";
import { ProcedurePage } from "./pages/procedure/procedure";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "product",
        element: <ProductPage />,
      },
      {
        path: "procedure",
        element: <ProcedurePage />,
      },
      {
        path: "client",
        element: <ClientPage />,
      },
      {
        path: "courier",
        element: <CourierPage />,
      },
      {
        path: "order",
        element: <OrderPage />,
      },
      {
        path: "list-of-products",
        element: <ListOfProductsPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
