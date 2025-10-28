import { useState, useEffect, useRef, useCallback } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";
import UserDetailsModal from "../components/UserDetailsModal";
import CategoryTabs from "../components/CategoryTabs";
import MenuItemCard from "../components/MenuItemCard";
import { getAllCategories, getMenuItems } from "../api/menuItemService";
import SearchIcon from "../assets/icons/search.svg?react";
import { useOrder } from "../context/OrderContext";

const pageStyle = {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
};
const welcomeTextStyle = {
    fontSize: "24px",
    fontWeight: "600",
    margin: 0,
};
const subTextStyle = {
    fontSize: "16px",
    color: "#8A8A8A",
    margin: "4px 0 16px 0",
};
const searchContainerStyle = {
    position: "relative",
    marginBottom: "16px",
};
const searchInputStyle = {
    width: "100%",
    padding: "14px 14px 14px 40px",
    borderRadius: "8px",
    border: "1px solid #E0E0E0",
    fontSize: "16px",
};
const searchIconStyle = {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#8A8A8A",
};
const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
    padding: "0 16px",
};

function HomePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    // const [cart, setCart] = useState({});
    const { cart, updateQuantity } = useOrder();
    const navigate = useNavigate();

    // Infinite scroll state
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const scrollContainerRef = useRef(null);

    // --- DATA FETCHING ---
    const fetchItems = useCallback(async (category, pageNum, search) => {
        if (isLoading && pageNum > 1) return; // Allow refetch on search/category change
        setIsLoading(true);
        try {
            const data = await getMenuItems(category, pageNum, search);
            setMenuItems((prevItems) =>
                pageNum === 1 ? data.items : [...prevItems, ...data.items]
            );
            setHasMore(data.currentPage < data.totalPages);
        } catch {
            console.error("Failed to fetch items");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        setMenuItems([]);
        setPage(1);
        setHasMore(true);
        fetchItems(selectedCategory, 1, searchTerm);
    }, [selectedCategory, searchTerm, fetchItems]);

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const isAtBottom =
            container.scrollHeight - container.scrollTop <=
            container.clientHeight + 100;

        if (isAtBottom && hasMore && !isLoading) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        if (page > 1) {
            fetchItems(selectedCategory, page, searchTerm);
        }
    }, [page, selectedCategory, searchTerm, fetchItems]);

    useEffect(() => {
        const timer = setTimeout(() => setIsModalOpen(true), 1000);
        const fetchCategories = async () => {
            const cats = await getAllCategories();
            setCategories(cats);
        };
        fetchCategories();
        return () => clearTimeout(timer);
    }, []);

    // const handleUpdateQuantity = (itemId, newQuantity) => {
    //     setCart((prevCart) => {
    //         const updatedCart = { ...prevCart };
    //         if (newQuantity <= 0) {
    //             delete updatedCart[itemId];
    //         } else {
    //             updatedCart[itemId] = newQuantity;
    //         }
    //         return updatedCart;
    //     });
    // };
    const cartItemCount = Object.values(cart).reduce(
        (sum, qty) => sum + qty,
        0
    );

    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            style={{ height: "100%", overflowY: "auto" }}
        >
            <div style={pageStyle}>
                {/* Header, Search, and Category Tabs */}
                <div>
                    <p style={welcomeTextStyle}>Good Evening</p>
                    <p style={subTextStyle}>Place your order here</p>
                </div>
                <div style={searchContainerStyle}>
                    <SearchIcon style={searchIconStyle} />
                    <input
                        type="text"
                        placeholder="Search"
                        style={searchInputStyle}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <CategoryTabs
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />

                {/* Menu Grid */}
                <div style={gridStyle}>
                    {menuItems.map((item) => (
                        <MenuItemCard
                            key={item._id}
                            item={item}
                            quantity={cart[item._id] || 0}
                            onUpdateQuantity={(itemId, qty) =>
                                updateQuantity(itemId, qty)
                            }
                        />
                    ))}
                </div>

                {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}

                {isModalOpen && <UserDetailsModal onClose={handleCloseModal} />}
            </div>
            {cartItemCount > 0 && (
                <button
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        left: "49%",
                        transform: "translateX(calc(-50% + 225px - 45px))", // (half mobile width - half button width)

                        padding: "15px 30px",
                        borderRadius: "25px",
                        border: "none",
                        backgroundColor: "#505050",
                        color: "white",
                        fontWeight: "600",
                        zIndex: 10,
                        width: "auto",
                    }}
                    onClick={() => navigate("/checkout")}
                >
                    Next ({cartItemCount})
                </button>
            )}
        </div>
    );
}

export default HomePage;
