import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MobileLayout from "./components/MobileLayout";
import CheckoutPage from "./pages/CheckoutPage";
import ThankYouPage from "./pages/ThankYouPage";

function App() {
    return (
        <Router>
            <MobileLayout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/thank-you" element={<ThankYouPage />} />{" "}
                </Routes>
            </MobileLayout>
        </Router>
    );
}

export default App;
