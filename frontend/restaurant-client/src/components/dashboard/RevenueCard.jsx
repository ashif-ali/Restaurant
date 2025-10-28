import { useEffect, useState } from "react";
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { getRevenueChartData } from "../../api/analyticsService";
import { useDashboardFilter } from "../../context/DashboardFilterContext";

const cardStyle = {
    backgroundColor: "#F0F5F3",
    border: "1px solid #E0E0E0",
    borderRadius: "8px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    height: "400px",
};

const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "16px",
    borderBottom: "1px solid #E0E0E0",
};

const titleStyle = {
    fontSize: "20px",
    fontWeight: "600",
    color: "#252836",
};

// 3. The dropdown
const dropdownStyle = {
    color: "#8A8A8A",
    padding: "8px 16px",
    borderRadius: "16px",
    border: "1px solid #E0E0E0",
    backgroundColor: "#FFFFFF",
    appearance: "none",
    cursor: "pointer",
};

const chartContainerStyle = {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E0E0E0",
    borderRadius: "8px",
    padding: "16px 16px 16px 0",
    width: "100%",
    height: 250,
};

function RevenueCard() {
    const [data, setData] = useState([]);
    const [period, setPeriod] = useState("daily");
    const { searchTerm } = useDashboardFilter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const chartData = await getRevenueChartData(period);
                setData(chartData);
            } catch (error) {
                console.error("Failed to fetch revenue data:", error);
            }
        };
        fetchData();
    }, [period]); //refetch data whenever the period changes

    const cardTitle = "Revenue";
    const isFaded =
        searchTerm &&
        !cardTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const fadedStyle = { opacity: 0.3, transition: "opacity 0.3s" };

    return (
        <div style={{ ...cardStyle, ...(isFaded && fadedStyle) }}>
            <div style={headerStyle}>
                <h3 style={titleStyle}>Revenue</h3>
                <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    style={dropdownStyle}
                >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>

            {/* --- CHART --- */}
            <div style={chartContainerStyle}>
                <ResponsiveContainer>
                    <ComposedChart data={data}>
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            fontSize={12}
                        />
                        <YAxis hide={true} />
                        <Tooltip />
                        <Bar dataKey="revenue" barSize={30} fill="#F4F4F4" />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#252836"
                            strokeWidth={2}
                            dot={false}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default RevenueCard;
