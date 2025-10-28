import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AnalyticsDashboard from "./pages/AnalyticsDashboard.jsx";
import TablesPage from "./pages/TablesPage.jsx";
import OrderLinePage from "./pages/OrderLinePage.jsx";
import MenuItemsPage from "./pages/MenuItemsPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <AnalyticsDashboard /> },
            { path: "tables", element: <TablesPage /> },
            { path: "order-line", element: <OrderLinePage /> },
            { path: "menu-items", element: <MenuItemsPage /> },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
