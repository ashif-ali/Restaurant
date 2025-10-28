import { useEffect, useState } from "react";
import { getDashboardAnalytics } from "../api/analyticsService";
import AnalyticsCard from "../components/dashboard/AnalyticsCard";
import RevenueCard from "../components/dashboard/RevenueCard";
import TablesCard from "../components/dashboard/TablesCard";
import OrderSummaryCard from "../components/dashboard/OrderSummaryCard";
import ChefPerformanceCard from "../components/dashboard/ChefPerformanceCard";
import FilterBar from "../components/common/FilterBar";
import RevenueIcon from "../assets/icons/revenue.svg?react";
import OrdersIcon from "../assets/icons/orders.svg?react";
import ClientsIcon from "../assets/icons/clients.svg?react";
import ChefIcon from "../assets/icons/chef.svg?react";

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
    display: "flex",
    flexDirection: "column",
    gap: "24px",
};

const pageTitleStyle = {
    fontSize: "28px",
    fontWeight: "400",
    color: "#000000",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "left",
};

const cardsContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "24px",
};

const revenueContainerProps = {
    backgroundColor: "#daebffff",
    borderRadius: "40%",
    width: "70px",
    height: "50px",
};

const revenueIconProps = {
    width: "40px",
};

function AnalyticsDashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const analyticsData = await getDashboardAnalytics();
                setData(analyticsData);
            } catch {
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const formatCount = (count) => {
        if (typeof count === "number" && count < 10) return `0${count}`;
        return count;
    };
    const formatRevenue = (revenue) => {
        if (typeof revenue !== "number") return "0";
        if (revenue < 1000) return revenue.toString();
        return (revenue / 1000).toFixed(1).replace(".0", "") + "K";
    };

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

    return (
        <div style={pageWrapperStyle}>
            {/* Section 1: Filter Bar (at the very top) */}
            <div>
                <FilterBar />
            </div>

            {/* Section 2: The White Content Box */}
            <div style={contentBoxStyle}>
                {/* Title now goes inside the white box */}
                <h1 style={pageTitleStyle}>Analytics</h1>

                <div style={cardsContainerStyle}>
                    <AnalyticsCard
                        value={formatCount(data.totalChefs)}
                        title="Total Chef"
                        Icon={ChefIcon}
                    />
                    <AnalyticsCard
                        value={formatRevenue(data.totalRevenue)}
                        title="Total Revenue"
                        Icon={RevenueIcon}
                        containerProps={revenueContainerProps}
                        iconProps={revenueIconProps}
                    />
                    <AnalyticsCard
                        value={formatCount(data.totalOrders)}
                        title="Total Orders"
                        Icon={OrdersIcon}
                    />
                    <AnalyticsCard
                        value={formatCount(data.totalClients)}
                        title="Total Clients"
                        Icon={ClientsIcon}
                    />
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1.5fr 2fr 1.5fr",
                        gap: "24px",
                        alignItems: "start",
                    }}
                >
                    <OrderSummaryCard />
                    <RevenueCard />
                    <TablesCard />
                </div>

                <div>
                    <ChefPerformanceCard />
                </div>
            </div>
        </div>
    );
}

export default AnalyticsDashboard;
