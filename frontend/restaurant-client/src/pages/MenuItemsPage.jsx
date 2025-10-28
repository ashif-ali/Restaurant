import { useEffect, useState } from "react";
import { getAllMenuItems } from "../api/menuItemService";
import MenuItemCard from "../components/menu/MenuItemCard";

const pageWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    gap: "24px",
};

const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

const searchInputStyle = {
    width: "300px",
    padding: "14px 20px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #E0E0E0",
};

const contentBoxStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    padding: "24px",
    flex: 1,
    overflowY: "auto",
};

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // 3 columns
    gridTemplateRows: "repeat(2, auto)", // 2 rows
    gap: "24px",
    height: "100%",
};

function MenuItemsPage() {
    const [allItems, setAllItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const itemsData = await getAllMenuItems();
                setAllItems(itemsData.items);
                setFilteredItems(itemsData.items); // Initially, show all items
                console.log("Menu items loaded:", itemsData.items);
            } catch {
                console.error("Failed to load menu items.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchItems();
    }, []);

    // Effect to handle filtering when searchTerm changes
    useEffect(() => {
        if (!searchTerm) {
            setFilteredItems(allItems); // If search is empty, show all
        } else {
            const results = allItems.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredItems(results);
        }
    }, [searchTerm, allItems]);

    if (isLoading) return <h2>Loading menu...</h2>;

    return (
        <div style={pageWrapperStyle}>
            <div style={headerStyle}>
                <input
                    type="text"
                    placeholder="Search for a dish..."
                    style={searchInputStyle}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div style={contentBoxStyle}>
                <div style={gridStyle}>
                    {filteredItems.map((item) => (
                        <MenuItemCard key={item._id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MenuItemsPage;
