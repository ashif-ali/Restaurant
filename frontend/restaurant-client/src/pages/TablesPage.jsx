import { useEffect, useState } from "react";
import {
    getAllTables,
    createTable,
    deleteTable,
    updateTable,
} from "../api/tableService";
import TableItem from "../components/tables/TableItem";
import AddTableForm from "../components/tables/AddTableForm";
import PlusIcon from "../assets/icons/plus.svg?react";

const pageWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    gap: "24px",
};

const contentBoxStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    padding: "24px",
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
};

const titleStyle = {
    fontSize: "28px",
    fontWeight: "600",
    textAlign: "left",
    marginBottom: "24px",
};

const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "24px",
    alignItems: "start",
};

const addButtonStyle = {
    border: "2px dashed #E0E0E0",
    borderRadius: "8px",
    backgroundColor: "#FAFAFA",
    minHeight: "140px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
};

function TablesPage() {
    const [tables, setTables] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const fetchTables = async () => {
        try {
            const tablesData = await getAllTables();
            setTables(tablesData);
            setError(null);
        } catch {
            setError("Failed to fetch tables.");
        }
    };

    useEffect(() => {
        setIsLoading(true);
        fetchTables().finally(() => setIsLoading(false));
    }, []);

    const handleDeleteTable = async (tableIdToDelete) => {
        try {
            // 1. Delete the target table
            await deleteTable(tableIdToDelete);

            // 2. Fetch the new, "dirty" list of tables
            const currentTables = await getAllTables();

            // 3. Sequentially update each table to ensure its number matches its position
            // We use a for...of loop with await to ensure one update finishes before the next begins.
            let i = 0;
            for (const table of currentTables) {
                const expectedNumber = i + 1;
                if (table.tableNumber !== expectedNumber) {
                    // Wait for this update to complete before continuing the loop
                    await updateTable(table._id, {
                        tableNumber: expectedNumber,
                    });
                }
                i++;
            }

            // 4. Perform a final fetch to update the UI with the clean list
            await fetchTables();
        } catch (err) {
            console.error("Synchronization failed:", err);
            setError("Failed to re-synchronize tables. Please refresh.");
        }
    };

    const handleCreateTable = async (tableData) => {
        try {
            await createTable(tableData);
            setShowAddForm(false);
            await fetchTables();
        } catch {
            setError("Failed to create table.");
        }
    };

    if (isLoading) return <h2>Loading tables...</h2>;
    if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

    const nextTableNumber = tables.length + 1;

    return (
        <div style={pageWrapperStyle}>
            <div style={contentBoxStyle}>
                <h1 style={titleStyle}>Tables</h1>
                <div style={gridContainerStyle}>
                    {tables.map((table) => (
                        <TableItem
                            key={table._id}
                            table={table}
                            onDelete={handleDeleteTable}
                        />
                    ))}

                    {!showAddForm && tables.length < 30 && (
                        <button
                            style={addButtonStyle}
                            onClick={() => setShowAddForm(true)}
                        >
                            <PlusIcon />
                        </button>
                    )}

                    {showAddForm && (
                        <AddTableForm
                            nextTableNumber={nextTableNumber}
                            onCreate={handleCreateTable}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default TablesPage;
