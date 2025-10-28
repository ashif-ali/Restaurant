import { useEffect, useState } from "react";
import { getChefPerformance } from "../../api/analyticsService";
import { useDashboardFilter } from "../../context/DashboardFilterContext";

const cardStyle = {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E0E0E0",
    borderRadius: "8px",
    padding: "24px",
};

const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
};

const thStyle = {
    textAlign: "left",
    padding: "12px 0",
    color: "#8A8A8A",
    fontSize: "14px",
    fontWeight: "500",
    borderBottom: "1px solid #E0E0E0",
};

const tdStyle = {
    textAlign: "left",
    padding: "16px 0",
    fontWeight: "500",
    borderBottom: "1px solid #E0E0E0",
};

function ChefPerformanceCard() {
    const [performance, setPerformance] = useState([]);
    const { searchTerm } = useDashboardFilter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getChefPerformance();
                setPerformance(data);
            } catch (error) {
                console.error("Failed to fetch chef performance:", error);
            }
        };
        fetchData();
    }, []);

    const cardTitle = "Chef Name";
    const isFaded =
        searchTerm &&
        !cardTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const fadedStyle = { opacity: 0.3, transition: "opacity 0.3s" };

    return (
        <div style={{ ...cardStyle, ...(isFaded && fadedStyle) }}>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Chef Name</th>
                        <th style={thStyle}>Order Taken</th>
                    </tr>
                </thead>
                <tbody>
                    {performance.map((chef, index) => (
                        <tr key={index}>
                            <td style={tdStyle}>{chef.chefName}</td>
                            <td style={tdStyle}>
                                {String(chef.ordersTaken).padStart(2, "0")}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ChefPerformanceCard;
