import { Outlet } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import { DashboardFilterProvider } from "./context/DashboardFilterContext";

function App() {
    return (
        <DashboardFilterProvider>
            <MainLayout>
                {/* Outlet is a placeholder where the router will render the current page */}
                <Outlet />
            </MainLayout>
        </DashboardFilterProvider>
    );
}

export default App;
