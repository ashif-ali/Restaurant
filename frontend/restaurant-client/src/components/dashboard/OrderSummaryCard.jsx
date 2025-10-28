import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { getOrderSummary } from "../../api/analyticsService";
import { useDashboardFilter } from "../../context/DashboardFilterContext";

// --- STYLES ---
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
    borderBottom: "1px solid #E0E0E0",
    paddingBottom: "15px",
};

const titleStyle = {
    fontSize: "20px",
    fontWeight: "600",
};

const dropdownStyle = {
    color: "#8A8A8A",
    padding: "8px 16px",
    borderRadius: "16px",
    border: "1px solid #E0E0E0",
    backgroundColor: "#FFFFFF",
    appearance: "none",
    cursor: "pointer",
};

const countsContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    textAlign: "center",
};

const countBoxStyle = {
    flex: 1,
    padding: "16px 8px",
    border: "1px solid #E0E0E0",
    borderRadius: "8px",
    backgroundColor: "#FFFFFF",
    color: "#6f7177ff",
};

const countValueStyle = {
    fontSize: "24px",
    fontWeight: "600",
};

const countLabelStyle = {
    fontSize: "12px",
    color: "#8A8A8A",
};

const chartSectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    flex: 1,
};

const legendContainerStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
};

const legendItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
};

const progressBarContainerStyle = {
    flex: 1,
    height: "6px",
    borderRadius: "3px",
    backgroundColor: "#ffffffff",
};

const progressBarFillStyle = {
    height: "100%",
    borderRadius: "3px",
};

// --- ENd STYLES ---

// --- CHART DATA AND COLORS ---
const COLORS = ["#505050", "#8A8A8A", "#252836"]; //Take Away, Served, Dine In

function OrderSummaryCard() {
    const [summary, setSummary] = useState({
        dineIn: 0,
        takeAway: 0,
        served: 0,
    });
    const [period, setPeriod] = useState("daily");
    const { searchTerm } = useDashboardFilter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getOrderSummary(period);
                setSummary(data);
            } catch (error) {
                console.error("Failed to fetch order summary:", error);
            }
        };
        fetchData();
    }, [period]);

    const totalOrders = summary.dineIn + summary.takeAway + summary.served;
    const chartData = [
        { name: "Take Away", value: summary.takeAway, color: COLORS[0] },
        { name: "Served", value: summary.served, color: COLORS[1] },
        { name: "Dine In", value: summary.dineIn, color: COLORS[2] },
    ];

    // 3. APPLY FILTER LOGIC
    const cardTitle = "Order Summary";
    const isFaded =
        searchTerm &&
        !cardTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const fadedStyle = { opacity: 0.3, transition: "opacity 0.3s" };

    return (
        <div style={{ ...cardStyle, ...(isFaded && fadedStyle) }}>
            <div style={headerStyle}>
                <h3 style={titleStyle}>Order Summary</h3>
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

            <div style={countsContainerStyle}>
                <div style={countBoxStyle}>
                    <div style={countValueStyle}>
                        {String(summary.served).padStart(2, "0")}
                    </div>
                    <div style={countLabelStyle}>Served</div>
                </div>
                <div style={countBoxStyle}>
                    <div style={countValueStyle}>
                        {String(summary.dineIn).padStart(2, "0")}
                    </div>
                    <div style={countLabelStyle}>Dine In</div>
                </div>
                <div style={countBoxStyle}>
                    <div style={countValueStyle}>
                        {String(summary.takeAway).padStart(2, "0")}
                    </div>
                    <div style={countLabelStyle}>Take Away</div>
                </div>
            </div>

            <div style={chartSectionStyle}>
                <div style={{ width: "150px", height: "150px" }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                innerRadius={50}
                                outerRadius={70}
                                paddingAngle={5}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div style={legendContainerStyle}>
                    {chartData.map((item) => {
                        const percentage =
                            totalOrders > 0
                                ? ((item.value / totalOrders) * 100).toFixed(0)
                                : 0;
                        return (
                            <div key={item.name}>
                                <div style={legendItemStyle}>
                                    <span>{item.name}</span>
                                    <span style={{ color: "#8A8A8A" }}>
                                        ({percentage}%)
                                    </span>
                                </div>
                                <div style={progressBarContainerStyle}>
                                    <div
                                        style={{
                                            ...progressBarFillStyle,
                                            width: `${percentage}%`,
                                            backgroundColor: item.color,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default OrderSummaryCard;
