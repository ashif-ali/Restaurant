import { useOrder } from "../context/OrderContext";
import { useState } from "react";
import { findOrCreateClient } from "../api/clientService";

const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(5px)", // Frosted glass effect
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
};

const modalContentStyle = {
    backgroundColor: "white",
    padding: "32px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
};

const labelStyle = {
    fontSize: "14px",
    color: "#8A8A8A",
    marginBottom: "4px",
    display: "block",
};

const inputStyle = {
    width: "100%",
    padding: "12px 16px", // Increased horizontal padding for pill shape
    borderRadius: "25px",
    border: "1px solid #E0E0E0",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.2s",
};

const buttonStyle = {
    padding: "14px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#EA7C69",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "8px",
    transition: "background-color 0.2s",
};
function UserDetailsModal({ onClose }) {
    const { setUserDetails } = useOrder();

    const [name, setName] = useState("");
    const [numPersons, setNumPersons] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call the backend to find or create the client
            const clientData = await findOrCreateClient({
                name,
                phoneNumber: contact,
            });
            console.log("Client processed:", clientData);
            const details = {
                name,
                numPersons: Number(numPersons),
                address,
                contact,
            };
            setUserDetails(details);
            onClose();
        } catch (error) {
            console.error("Submission failed:", error);
        }
    };

    return (
        <div style={modalOverlayStyle}>
            <form style={modalContentStyle} onSubmit={handleSubmit}>
                <h2
                    style={{
                        textAlign: "center",
                        margin: "0 0 16px 0",
                        color: "#252836",
                    }}
                >
                    Enter Your Details
                </h2>

                <div>
                    <label style={labelStyle}>Name</label>
                    <input
                        type="text"
                        style={inputStyle}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full name"
                        required
                    />
                </div>
                <div>
                    <label style={labelStyle}>Number of Persons</label>
                    <input
                        type="number"
                        style={inputStyle}
                        value={numPersons}
                        onChange={(e) => setNumPersons(e.target.value)}
                        min="1"
                        placeholder="e.g., 2"
                        required
                    />
                </div>
                <div>
                    <label style={labelStyle}>Address</label>
                    <input
                        type="text"
                        style={inputStyle}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Delivery address"
                        required
                    />
                </div>
                <div>
                    <label style={labelStyle}>Contact</label>
                    <input
                        type="tel"
                        style={inputStyle}
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Phone number"
                        required
                    />
                </div>
                <button type="submit" style={buttonStyle}>
                    Order Now
                </button>
            </form>
        </div>
    );
}

export default UserDetailsModal;
