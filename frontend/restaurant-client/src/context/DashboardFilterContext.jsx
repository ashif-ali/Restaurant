import { createContext, useContext, useState } from "react";

// 1. Create the context
const FilterContext = createContext();

// 2. Create the Provider component
export function DashboardFilterProvider({ children }) {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <FilterContext.Provider value={{ searchTerm, setSearchTerm }}>
            {children}
        </FilterContext.Provider>
    );
}

// 3. Create a custom hook for easy access
export function useDashboardFilter() {
    return useContext(FilterContext);
}
