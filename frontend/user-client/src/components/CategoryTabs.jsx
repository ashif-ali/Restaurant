import { useRef } from "react";

const wrapperStyle = {
    position: "relative",
    padding: "16px",
};

const tabsContainerStyle = {
    display: "flex",
    overflowX: "auto",
    gap: "16px",
    scrollBehavior: "smooth", // Makes scrolling smooth
};

const tabStyle = {
    padding: "10px 20px",
    borderRadius: "20px",
    border: "1px solid #E0E0E0",
    backgroundColor: "#FFFFFF",
    cursor: "pointer",
    flexShrink: 0,
    fontWeight: "500",
};

const activeTabStyle = {
    ...tabStyle,
    backgroundColor: "#EA7C69",
    color: "#FFFFFF",
    border: "1px solid #EA7C69",
};

const arrowButtonStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "white",
    border: "1px solid #E0E0E0",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 1,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

function CategoryTabs({ categories, selectedCategory, onSelectCategory }) {
    const scrollContainerRef = useRef(null);

    const handleScroll = (scrollOffset) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += scrollOffset;
        }
    };

    return (
        <div style={wrapperStyle}>
            <button
                style={{ ...arrowButtonStyle, left: 0 }}
                onClick={() => handleScroll(-150)}
            >
                {"<"}
            </button>
            <div style={tabsContainerStyle} ref={scrollContainerRef}>
                {["All", ...categories].map((category) => (
                    <div
                        key={category}
                        style={
                            selectedCategory === category
                                ? activeTabStyle
                                : tabStyle
                        }
                        onClick={() => onSelectCategory(category)}
                    >
                        {category}
                    </div>
                ))}
            </div>
            <button
                style={{ ...arrowButtonStyle, right: 0 }}
                onClick={() => handleScroll(150)}
            >
                {">"}
            </button>
        </div>
    );
}

export default CategoryTabs;
