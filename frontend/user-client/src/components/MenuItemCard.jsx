// --- STYLES ---
const cardStyle = {
    border: "1px solid #E0E0E0",
    borderRadius: "12px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
};
const imagePlaceholderStyle = {
    backgroundColor: "#EEEEEE",
    borderRadius: "8px",
    height: "120px",
};
const detailsContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
};
const textInfoStyle = {
    textAlign: "left",
};
const quantitySelectorStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "600",
};
const quantityButtonStyle = {
    border: "1px solid #E0E0E0",
    borderRadius: "50%",
    width: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    cursor: "pointer",
    fontSize: "18px",
};
const addButtonStyle = {
    ...quantityButtonStyle,
    marginLeft: "auto", // Pushes the button to the right
};

function MenuItemCard({ item, quantity, onUpdateQuantity }) {
    return (
        <div style={cardStyle}>
            <div style={imagePlaceholderStyle}></div>
            <div style={detailsContainerStyle}>
                <div style={textInfoStyle}>
                    <h4 style={{ margin: "0 0 4px 0" }}>{item.name}</h4>
                    <p style={{ margin: 0, fontWeight: "600" }}>
                        ₹{item.price}
                    </p>
                </div>

                {/* Conditional Quantity Controls */}
                {quantity > 0 ? (
                    <div style={quantitySelectorStyle}>
                        <button
                            style={quantityButtonStyle}
                            onClick={() =>
                                onUpdateQuantity(item._id, quantity - 1)
                            }
                        >
                            -
                        </button>
                        <span>{quantity}</span>
                        <button
                            style={quantityButtonStyle}
                            onClick={() =>
                                onUpdateQuantity(item._id, quantity + 1)
                            }
                        >
                            +
                        </button>
                    </div>
                ) : (
                    <button
                        style={addButtonStyle}
                        onClick={() => onUpdateQuantity(item._id, 1)}
                    >
                        +
                    </button>
                )}
            </div>
        </div>
    );
}

export default MenuItemCard;
