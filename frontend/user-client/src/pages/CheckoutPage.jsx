import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../context/OrderContext";
import { getMenuItemsByIds } from "../api/menuItemService";
import { placeOrder } from "../api/orderService";
import { ToastContainer, toast } from "react-toastify"; //toast notifications
import "react-toastify/dist/ReactToastify.css"; //toast styling
import DeleteIcon from "../assets/icons/Delete.svg?react";
import CookingInstructionsModal from "../components/CookingInstructionsModal";
import SwipeButton from "../components/SwipeButton";

const itemCardStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "24px",
};
const itemImagePlaceholder = {
    width: "140px",
    height: "120px",
    backgroundColor: "#EEEEEE",
    borderRadius: "8px",
    flexShrink: 0,
};
const itemDetailsStyle = {
    flex: 1,
    textAlign: "left",
};
const itemControlsStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: "80px",
};
const deleteButtonStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
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

function CheckoutPage() {
    const { userDetails, cart, updateQuantity, clearCart } = useOrder();
    const [orderType, setOrderType] = useState("Dine-In");
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const [cookingInstructions, setCookingInstructions] = useState("");
    const [showInstructionsModal, setShowInstructionsModal] = useState(false);

    useEffect(() => {
        const fetchCartItemDetails = async () => {
            const itemIds = Object.keys(cart);
            if (itemIds.length === 0) {
                setCartItems([]);
                return;
            }

            try {
                const itemsData = await getMenuItemsByIds(itemIds);
                const populatedCart = itemsData.map((item) => ({
                    ...item,
                    quantity: cart[item._id],
                }));
                setCartItems(populatedCart);
            } catch {
                console.error("Could not load cart details.");
            }
        };

        fetchCartItemDetails();
    }, [cart]);

    const itemTotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const deliveryCharge = orderType === "Takeaway" ? 50 : 0;
    const taxes = 5;
    const grandTotal = itemTotal + deliveryCharge + taxes;

    const handleOrder = async () => {
        if (!userDetails) {
            toast.error("Please enter your details first.");
            return;
        }

        const orderPayload = {
            clientInfo: {
                name: userDetails.name,
                phoneNumber: userDetails.contact,
            },
            items: cartItems.map((item) => ({
                id: item._id,
                quantity: item.quantity,
            })),
            orderType: orderType,
            numPersons: userDetails.numPersons,
            cookingInstructions: cookingInstructions,
        };

        try {
            await placeOrder(orderPayload);
            toast.success("Order placed successfully!");
            clearCart();
            setTimeout(() => {
                navigate("/thank-you");
            }, 1500); // Wait a moment before navigating
        } catch (error) {
            toast.error(error.message || "Failed to place order.");
        }
    };

    return (
        <div
            style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
            }}
        >
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
            />

            <div>
                <p style={{ fontSize: "24px", fontWeight: "600" }}>
                    Good Evening
                </p>
                <p style={{ fontSize: "16px", color: "#8A8A8A" }}>
                    Place your order here
                </p>
                <input
                    type="text"
                    placeholder="Search"
                    style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #E0E0E0",
                    }}
                    disabled
                />
            </div>

            <div>
                {cartItems.map((item) => (
                    <div key={item._id} style={itemCardStyle}>
                        <div style={itemImagePlaceholder}></div>
                        <div style={itemDetailsStyle}>
                            <h4 style={{ margin: 0 }}>{item.name}</h4>
                            <p style={{ margin: "4px 0 0 0" }}>₹{item.price}</p>
                        </div>
                        <div style={itemControlsStyle}>
                            <button
                                style={deleteButtonStyle}
                                onClick={() => updateQuantity(item._id, 0)}
                            >
                                <DeleteIcon />
                            </button>
                            <div style={quantitySelectorStyle}>
                                <button
                                    style={quantityButtonStyle}
                                    onClick={() =>
                                        updateQuantity(
                                            item._id,
                                            item.quantity - 1
                                        )
                                    }
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    style={quantityButtonStyle}
                                    onClick={() =>
                                        updateQuantity(
                                            item._id,
                                            item.quantity + 1
                                        )
                                    }
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <p
                style={{
                    color: cookingInstructions ? "#252836" : "#8A8A8A",
                    cursor: "pointer",
                    fontWeight: cookingInstructions ? "600" : "normal",
                }}
                onClick={() => setShowInstructionsModal(true)}
            >
                {cookingInstructions || "Add cooking instructions (optional)"}
            </p>

            <div
                style={{
                    backgroundColor: "#F0F0F0",
                    borderRadius: "25px",
                    padding: "4px",
                    display: "flex",
                }}
            >
                <button
                    onClick={() => setOrderType("Dine-In")}
                    style={{
                        flex: 1,
                        padding: "10px",
                        borderRadius: "25px",
                        border: "none",
                        backgroundColor:
                            orderType === "Dine-In" ? "white" : "transparent",
                    }}
                >
                    Dine In
                </button>
                <button
                    onClick={() => setOrderType("Takeaway")}
                    style={{
                        flex: 1,
                        padding: "10px",
                        borderRadius: "25px",
                        border: "none",
                        backgroundColor:
                            orderType === "Takeaway" ? "white" : "transparent",
                    }}
                >
                    Take Away
                </button>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    backgroundColor: "rgba(255, 244, 143, 0.14)",
                    padding: "26px",
                    borderRadius: "12px",
                    width: "100%",
                }}
            >
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <span>Item Total</span>
                    <span>₹{itemTotal.toFixed(2)}</span>
                </div>
                {orderType === "Takeaway" && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <span>Delivery Charge</span>
                        <span>₹{deliveryCharge.toFixed(2)}</span>
                    </div>
                )}
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <span>Taxes</span>
                    <span>₹{taxes.toFixed(2)}</span>
                </div>
                <hr />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: "bold",
                    }}
                >
                    <span>Grand Total</span>
                    <span>₹{grandTotal.toFixed(2)}</span>
                </div>
            </div>

            <div>
                <h4>Your Details</h4>
                {userDetails && (
                    <>
                        <p>
                            {userDetails.name}, {userDetails.contact}
                            {orderType === "Dine-In" && (
                                <span>, {userDetails.numPersons} People</span>
                            )}
                        </p>
                        {orderType === "Takeaway" && (
                            <div>
                                <p>
                                    📍 Delivery at Home - {userDetails.address}
                                </p>
                                <p>🕒 Delivery in 42 mins</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            <div
                style={{
                    border: "1px solid #E0E0E0",
                    borderRadius: "30px",
                    padding: "10px",
                    textAlign: "center",
                    cursor: "pointer",
                }}
                // onClick={handleOrder}
            >
                <SwipeButton onSwipeSuccess={handleOrder} />
            </div>
            {showInstructionsModal && (
                <CookingInstructionsModal
                    initialInstructions={cookingInstructions}
                    onSave={setCookingInstructions}
                    onClose={() => setShowInstructionsModal(false)}
                />
            )}
        </div>
    );
}

export default CheckoutPage;
