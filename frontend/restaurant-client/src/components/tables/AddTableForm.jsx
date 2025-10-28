import { useState } from "react";

const formStyle = {
    backgroundColor: "#F0F5F3",
    border: "1px solid #E0E0E0",
    borderRadius: "12px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "250px",
};

const numberStyle = {
    fontSize: "32px",
    fontWeight: "600",
    borderBottom: "1px dotted #8A8A8A",
    paddingBottom: "8px",
};

const selectStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #E0E0E0",
};

const buttonStyle = {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#252836",
    color: "#FFFFFF",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
};

function AddTableForm({ nextTableNumber, onCreate }) {
    const [capacity, setCapacity] = useState(2);

    const handleCreate = () => {
        onCreate({ capacity });
    };

    return (
        <div style={formStyle}>
            <div>Table name (optional)</div>
            <div style={numberStyle}>{nextTableNumber}</div>
            <div>
                <div>Chair</div>
                <select
                    style={selectStyle}
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                >
                    <option value={2}>02</option>
                    <option value={4}>04</option>
                    <option value={6}>06</option>
                    <option value={8}>08</option>
                </select>
            </div>
            <button style={buttonStyle} onClick={handleCreate}>
                Create
            </button>
        </div>
    );
}

export default AddTableForm;
