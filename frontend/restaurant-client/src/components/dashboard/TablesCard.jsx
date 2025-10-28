import { useEffect, useState } from "react";
import { getAllTables } from "../../api/tableService";
import { useDashboardFilter } from "../../context/DashboardFilterContext";

const cardStyle = {
    backgroundColor: "#F0F5F3",
    border: "1px solid #E0E0E0",
    borderRadius: "8px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    height: "400px",
};

const titleContainerStyle = {
    textAlign: "left",
};

const titleStyle = {
    fontSize: "20px",
    fontWeight: "600",
    // marginBottom: "8px",
};

const legendContainerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "24px",
    fontSize: "14px",
    color: "#8A8A8A",
    paddingBottom: "10px",
    borderBottom: "1px solid #E0E0E0",
};

const tablesGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))",
    gap: "12px",
    overflowY: "auto",
    paddingRight: "8px", // Prevents scrollbar from overlapping content
};

const tableItemBaseStyle = {
    padding: "8px",
    borderRadius: "8px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
};

const tableItemTextStyle = {
    fontSize: "12px",
    color: "inherit",
};

const tableItemNumberStyle = {
    fontSize: "20px",
    fontWeight: "600",
};

const availableStyle = {
    ...tableItemBaseStyle,
    border: "1px solid #E0E0E0",
    color: "#252836",
    backgroundColor: "#FFFFFF",
};

const reservedStyle = {
    ...tableItemBaseStyle,
    backgroundColor: "#3DC35F",
    color: "#FFFFFF",
    border: "1px solid #3DC35F",
};

function TablesCard() {
    const [tables, setTables] = useState([]);
    const { searchTerm } = useDashboardFilter();

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const tablesData = await getAllTables();
                setTables(tablesData);
            } catch (error) {
                console.error("Failed to fetch tables:", error);
            }
        };
        fetchTables();
    }, []);

    const cardTitle = "Tables";
    const isFaded =
        searchTerm &&
        !cardTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const fadedStyle = { opacity: 0.3, transition: "opacity 0.3s" };

    return (
        <div style={{ ...cardStyle, ...(isFaded && fadedStyle) }}>
            {/* Section 1: Title */}
            <div style={titleContainerStyle}>
                <h3 style={titleStyle}>Tables</h3>
            </div>

            {/* Section 2: Legend */}
            <div style={legendContainerStyle}>
                <div>
                    <span style={{ color: "#3DC35F", fontSize: "24px" }}>
                        ●
                    </span>{" "}
                    Reserved
                </div>
                <div>
                    <span style={{ color: "#FFFFFF", fontSize: "24px" }}>
                        ●
                    </span>{" "}
                    Available
                </div>
            </div>

            {/* Section 3: Scrollable Grid */}
            <div style={tablesGridStyle}>
                {tables.map((table) => (
                    <div
                        key={table._id}
                        style={
                            table.status === "Reserved"
                                ? reservedStyle
                                : availableStyle
                        }
                    >
                        <span style={tableItemTextStyle}>Table</span>
                        <span style={tableItemNumberStyle}>
                            {table.tableNumber.toString().padStart(2, "0")}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TablesCard;
