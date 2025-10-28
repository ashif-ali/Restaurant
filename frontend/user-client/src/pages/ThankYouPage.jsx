import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TickIcon from "../assets/icons/tick.svg?react";

const pageStyle = {
    backgroundColor: "#20BF6D",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "40px",
    color: "white",
};

const checkmarkCircleStyle = {
    backgroundColor: "white",
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const mainTextStyle = {
    fontSize: "32px",
    fontWeight: "600",
};

const countdownTextStyle = {
    position: "absolute",
    bottom: "40px",
    fontSize: "16px",
};

function ThankYouPage() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(3);

    // Effect for the countdown timer
    useEffect(() => {
        if (countdown <= 0) return; // Stop the timer when it hits 0

        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000); // Decrease every second

        return () => clearInterval(interval); // Cleanup
    }, [countdown]);

    // Effect for redirecting
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 3000); // Redirect after 3 seconds

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={pageStyle}>
            <h2 style={mainTextStyle}>Thanks For Ordering</h2>

            <div style={checkmarkCircleStyle}>
                <TickIcon
                    style={{ width: "60px", height: "60px", fill: "#50D1AA" }}
                />
            </div>

            <p style={countdownTextStyle}>Redirecting in {countdown}</p>
        </div>
    );
}

export default ThankYouPage;
