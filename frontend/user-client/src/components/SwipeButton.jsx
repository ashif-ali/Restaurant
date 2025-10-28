import { useState, useRef } from "react";
import ArrowRightIcon from "../assets/icons/arrow-right.svg?react";

const swipeContainerStyle = {
    position: "relative",
    height: "60px",
    backgroundColor: "#F0F0F0",
    borderRadius: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    userSelect: "none",
};

const swipeThumbStyle = {
    position: "absolute",
    left: "0",
    top: "0",
    height: "100%",
    width: "80px",
    backgroundColor: "#D9D9D9",
    borderRadius: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "grab",
    zIndex: 2,
};

const swipeTextStyle = {
    color: "#8A8A8A",
    fontWeight: "500",
    zIndex: 1,
};

const iconStyle = {
    width: "24px",
};

function SwipeButton({ onSwipeSuccess }) {
    const [isDragging, setIsDragging] = useState(false);
    const [thumbPosition, setThumbPosition] = useState(0);
    const containerRef = useRef(null);

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = () => {
        setIsDragging(false);

        // Check if swipe was successful
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            if (thumbPosition > containerWidth * 0.75) {
                // Swiped more than 75%
                onSwipeSuccess();
            }
        }
        // Reset thumb position
        setThumbPosition(0);
    };

    const handleDragMove = (clientX) => {
        if (!isDragging || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const containerWidth = containerRect.width;
        let newX = clientX - containerRect.left - (thumbPosition > 0 ? 40 : 0); // Adjust for thumb width

        // Constrain the movement within the container
        if (newX < 0) newX = 0;
        if (newX > containerWidth - 80) newX = containerWidth - 80;

        setThumbPosition(newX);
    };

    return (
        <div
            style={swipeContainerStyle}
            ref={containerRef}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd} // Handle case where mouse leaves the container
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onTouchEnd={handleDragEnd}
            onTouchCancel={handleDragEnd}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        >
            <div
                style={{ ...swipeThumbStyle, left: `${thumbPosition}px` }}
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
            >
                <ArrowRightIcon style={iconStyle} />
            </div>
            <span style={swipeTextStyle}>Swipe to Order</span>
        </div>
    );
}

export default SwipeButton;
