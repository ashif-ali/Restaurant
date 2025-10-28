import { useState } from "react";

const modalOverlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(5px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 1001,
};

const closeButtonStyle = {
    background: "white",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    cursor: "pointer",
    marginBottom: "16px",
};

const modalContentStyle = {
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: "24px",
    borderTopRightRadius: "24px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    animation: "slideUp 0.3s ease-out forwards",
};

const textAreaStyle = {
    width: "100%",
    height: "100px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #E0E0E0",
    fontSize: "16px",
    resize: "none",
};

const disclaimerStyle = {
    fontSize: "12px",
    color: "#8A8A8A",
    textAlign: "center",
};

const buttonContainerStyle = {
    display: "flex",
    gap: "12px",
};

const buttonStyle = {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
};

function CookingInstructionsModal({ onSave, onClose, initialInstructions }) {
    const [instructions, setInstructions] = useState(initialInstructions || "");

    const handleSave = () => {
        onSave(instructions);
        onClose();
    };

    return (
        <div style={modalOverlayStyle}>
            <button style={closeButtonStyle} onClick={onClose}>
                ✕
            </button>
            <div style={modalContentStyle}>
                <h3 style={{ margin: 0, textAlign: "center" }}>
                    Add Cooking Instructions
                </h3>{" "}
                <textarea
                    style={textAreaStyle}
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="e.g., Make it extra spicy, no onions..."
                />
                <p style={disclaimerStyle}>
                    The restaurant will try its best to follow your request.
                    However, refunds or cancellations in this regard won't be
                    possible.
                </p>
                <div style={buttonContainerStyle}>
                    <button
                        style={{
                            ...buttonStyle,
                            backgroundColor: "#F0F0F0",
                            color: "#252836",
                        }}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        style={{
                            ...buttonStyle,
                            backgroundColor: "#EA7C69",
                            color: "white",
                        }}
                        onClick={handleSave}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CookingInstructionsModal;
