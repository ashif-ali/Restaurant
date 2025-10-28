const cardStyle = {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E0E0E0",
    borderRadius: "16px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "350px",
    height: "400px",
};

const imagePlaceholderStyle = {
    backgroundColor: "#EEEEEE",
    borderRadius: "8px",
    height: "150px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#8A8A8A",
    fontSize: "18px",
};

const detailsContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    textAlign: "left",
};

const detailItemStyle = {
    fontSize: "14px",
};

const detailLabelStyle = {
    fontWeight: "600",
    color: "#252836",
};

function MenuItemCard({ item }) {
    return (
        <div style={cardStyle}>
            <div style={imagePlaceholderStyle}>Image</div>
            <div style={detailsContainerStyle}>
                <div style={detailItemStyle}>
                    <span style={detailLabelStyle}>Name:</span> {item.name}
                </div>
                <div style={detailItemStyle}>
                    <span style={detailLabelStyle}>Description:</span>{" "}
                    {item.description}
                </div>
                <div style={detailItemStyle}>
                    <span style={detailLabelStyle}>Price:</span> ₹{item.price}
                </div>
                <div style={detailItemStyle}>
                    <span style={detailLabelStyle}>Average Prep Time:</span>{" "}
                    {item.averagePreparationTime} Mins
                </div>
                <div style={detailItemStyle}>
                    <span style={detailLabelStyle}>Category:</span>{" "}
                    {item.category}
                </div>
            </div>
        </div>
    );
}

export default MenuItemCard;
