import ForkKnifeIcon from "../../assets/icons/fork-knife.svg?react";
import HourglassIcon from "../../assets/icons/hourglass.svg?react";
import TickIcon from "../../assets/icons/tick.svg?react";

function OrderCard({ order, onUpdateStatus }) {
    // --- 1. Calculate Time and Status (No changes) ---
    const completionTime = new Date(order.estimatedCompletionTime);
    const timeLeftMinutes = Math.round((completionTime - new Date()) / 60000);
    const isCompleted = timeLeftMinutes <= 0 || order.status !== "Processing";

    // --- 2. Determine Styling Based on State ---
    let cardColor,
        statusText,
        statusLabel,
        buttonText,
        buttonColor,
        ButtonIcon,
        buttonTextColor,
        iconStyle;

    if (order.orderType === "Dine-In") {
        cardColor = isCompleted ? "#B9F8C9" : "#FFE3BC";
        statusText = isCompleted ? "Served" : `Ongoing: ${timeLeftMinutes} Min`;
        statusLabel = isCompleted ? "Done" : "Dine In";
        buttonText = isCompleted ? "Order Done" : "Processing";
        ButtonIcon = isCompleted ? TickIcon : HourglassIcon;
        buttonColor = isCompleted ? "#50D1AA" : "#FDC474";
        iconStyle = { fill: "#FFFFFF" };
        buttonTextColor = "#3B413D";
    } else {
        // --- UPDATED LOGIC FOR TAKEAWAY ---
        cardColor = "#C2D4D9";
        statusText = isCompleted
            ? "Not Picked Up"
            : `Ongoing: ${timeLeftMinutes} Min`;
        statusLabel = "Take Away";
        buttonText = isCompleted ? "Order Done" : "Processing";
        ButtonIcon = isCompleted ? TickIcon : HourglassIcon;
        buttonColor = "#9BAEB3";
        iconStyle = { fill: "#3B413D" };
        buttonTextColor = "#FFFFFF";
    }

    const handleButtonClick = () => {
        if (isCompleted && order.status === "Processing") {
            onUpdateStatus(order._id, "Served");
        }
    };

    // --- 3. Styles ---
    const cardStyle = {
        width: "310px",
        height: "350px",
        backgroundColor: cardColor,
        borderRadius: "8px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    };
    const topSectionStyle = {
        backgroundColor: "#FFFFFF",
        borderRadius: "8px",
        padding: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
    };
    const bottomSectionStyle = {
        backgroundColor: "#FFFFFF",
        borderRadius: "8px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        height: "120px",
        overflowY: "auto",
        gap: "8px",
    };
    const statusBoxStyle = {
        backgroundColor: cardColor,
        padding: "8px 12px",
        borderRadius: "12px",
        textAlign: "center",
        display: "inline-block",
        alignSelf: "flex-start",
    };

    const buttonStyle = {
        backgroundColor: buttonColor,
        color: buttonTextColor,
        border: "none",
        borderRadius: "20px",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        fontWeight: "600",
        cursor: isCompleted ? "pointer" : "default",
    };

    const detailTextStyle = { fontSize: "12px", color: "#8A8A8A" };

    const nameDetailStyle = {
        fontSize: "12px",
        fontWeight: "normal",
        color: "#252836",
        marginTop: "4px",
    };
    const itemListTitleStyle = {
        fontSize: "14px",
        fontWeight: "600",
        color: "#555",
        marginBottom: "8px",
    };

    return (
        <div style={cardStyle}>
            {/* Top White Section */}
            <div style={topSectionStyle}>
                <div style={{ display: "flex", gap: "16px" }}>
                    <ForkKnifeIcon />
                    <div>
                        <div style={{ fontWeight: "600" }}>{order.orderId}</div>
                        <div style={detailTextStyle}>
                            {order.orderType === "Dine-In" && order.table
                                ? `Table-${String(
                                      order.table.tableNumber
                                  ).padStart(2, "0")}`
                                : "Take Away"}
                        </div>
                        <div style={detailTextStyle}>
                            {new Date(order.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </div>
                        <div style={detailTextStyle}>
                            {order.items.length} Item(s)
                        </div>
                        {/* --- NEW: Add Chef's Name --- */}
                        <div style={nameDetailStyle}>
                            Chef: {order.chef?.name || "N/A"}
                        </div>
                        {/* --- NEW: Add Customer's Name --- */}
                        <div style={nameDetailStyle}>
                            Client: {order.client?.name || "N/A"}
                        </div>
                    </div>
                </div>
                <div style={statusBoxStyle}>
                    <div style={{ fontSize: "14px", fontWeight: "600" }}>
                        {statusLabel}
                    </div>
                    <div
                        style={{
                            fontSize: "12px",
                            color: "#555",
                            marginTop: "4px",
                        }}
                    >
                        {statusText}
                    </div>
                </div>
            </div>

            {/* Bottom White Section */}
            <div style={bottomSectionStyle}>
                <div style={itemListTitleStyle}>Items</div>
                {order.items.map((item) =>
                    item.menuItem ? (
                        <div key={item._id}>
                            {item.quantity} x {item.menuItem.name}
                        </div>
                    ) : (
                        <div
                            key={item._id}
                            style={{ color: "red", fontStyle: "italic" }}
                        >
                            Item no longer available
                        </div>
                    )
                )}
            </div>

            {/* Footer Button */}
            <button
                style={buttonStyle}
                onClick={handleButtonClick}
                disabled={!isCompleted}
            >
                <ButtonIcon style={iconStyle} />
                {buttonText}
            </button>
        </div>
    );
}

export default OrderCard;
