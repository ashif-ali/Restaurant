import TrashIcon from "../../assets/icons/trash.svg?react";
import ChairIcon from "../../assets/icons/chair.svg?react";

// --- STYLES ---
const cardStyle = {
    backgroundColor: "#F0F5F3",
    border: "1px solid #E0E0E0",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "140px",
    position: "relative", // For positioning the delete button
};

const deleteButtonStyle = {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
};

const textContainerStyle = {
    textAlign: "center",
};

const titleStyle = {
    fontSize: "20px",
    fontWeight: "500",
};

const numberStyle = {
    fontSize: "48px",
    fontWeight: "600",
};

const capacityStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "4px",
    fontSize: "14px",
};

function TableItem({ table, onDelete }) {
    // A table cannot be deleted if it is reserved
    const isDeletable = table.status !== "Reserved";

    const handleDelete = () => {
        if (isDeletable) {
            onDelete(table._id);
        }
    };

    return (
        <div style={cardStyle}>
            <button
                style={{ ...deleteButtonStyle, opacity: isDeletable ? 1 : 0.5 }}
                onClick={handleDelete}
                disabled={!isDeletable}
                title={
                    isDeletable
                        ? "Delete Table"
                        : "Cannot delete a reserved table"
                }
            >
                <TrashIcon />
            </button>
            <div style={textContainerStyle}>
                <div style={titleStyle}>Table</div>
                <div style={numberStyle}>
                    {String(table.tableNumber).padStart(2, "0")}
                </div>
            </div>
            <div style={capacityStyle}>
                <ChairIcon />
                <span>{String(table.capacity).padStart(2, "0")}</span>
            </div>
        </div>
    );
}

export default TableItem;
