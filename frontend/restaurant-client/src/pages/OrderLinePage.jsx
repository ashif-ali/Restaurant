import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../api/orderService";
import OrderCard from "../components/orders/OrderCard";

const pageWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    gap: "24px",
};

const contentBoxStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    padding: "24px",
    flex: 1,
    overflowY: "auto",
};

const titleStyle = {
    fontSize: "28px",
    fontWeight: "600",
    textAlign: "left",
    marginBottom: "24px",
};

const gridStyle = {
    display: "grid",
    // 4 equal-width columns
    gridTemplateColumns: "repeat(4, 1fr)",
    // Optional: Defines two rows that will size automatically
    gridTemplateRows: "repeat(2, auto)",
    gap: "24px",
    height: "100%",
};
function OrderLinePage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const ordersData = await getAllOrders();
            setOrders(ordersData);
        } catch {
            console.error("Failed to fetch orders.");
        }
    };

    useEffect(() => {
        setIsLoading(true);
        fetchOrders().finally(() => setIsLoading(false));
    }, []);

    const handleUpdateStatus = async (orderId, status) => {
        try {
            await updateOrderStatus(orderId, status);
            await fetchOrders(); // Refresh the list after updating
        } catch {
            console.error("Failed to update status.");
        }
    };

    if (isLoading) return <h2>Loading orders...</h2>;

    return (
        <div style={pageWrapperStyle}>
            <div style={contentBoxStyle}>
                <h1 style={titleStyle}>Order Line</h1>
                <div style={gridStyle}>
                    {orders
                        .filter(
                            (order) =>
                                order.status === "Processing" ||
                                order.status === "Done"
                        ) // Only show active orders
                        .map((order) => (
                            <OrderCard
                                key={order._id}
                                order={order}
                                onUpdateStatus={handleUpdateStatus}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default OrderLinePage;
