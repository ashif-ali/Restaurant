import { useDashboardFilter } from "../../context/DashboardFilterContext";

const filterBarStyle = {
    width: "300px",
    padding: "14px 20px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #E0E0E0",
    backgroundColor: "#FFFFFF",
};

function FilterBar() {
    const { searchTerm, setSearchTerm } = useDashboardFilter();

    return (
        <input
            type="text"
            placeholder="Filter..."
            style={filterBarStyle}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    );
}

export default FilterBar;
