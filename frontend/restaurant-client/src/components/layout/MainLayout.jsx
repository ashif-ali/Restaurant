// import Sidebar from "./Sidebar";

// const layoutStyle = {
//     display: "flex",
//     backgroundColor: "#F0F5F3",
//     color: "#000000",
// };

// const mainContentWrapperStyle = {
//     flex: 1,
//     padding: "24px",
//     height: "100vh",
//     overflowY: "auto",
// };

// const mainContentStyle = {
//     backgroundColor: "#FFFFFF",
//     borderRadius: "16px",
//     padding: "30px",
//     height: "100%",
// };

// function MainLayout({ children }) {
//     return (
//         <div style={layoutStyle}>
//             <Sidebar />
//             <div style={mainContentWrapperStyle}>
//                 <main style={mainContentStyle}>{children}</main>
//             </div>
//         </div>
//     );
// }

// export default MainLayout;

import Sidebar from "./Sidebar";

const layoutStyle = {
    display: "flex",
    backgroundColor: "#eaf3efff",
    color: "#000000",
};

const mainContentWrapperStyle = {
    flex: 1,
    height: "100vh",
    padding: "24px",
};

function MainLayout({ children }) {
    return (
        <div style={layoutStyle}>
            <Sidebar />
            <main style={mainContentWrapperStyle}>{children}</main>
        </div>
    );
}

export default MainLayout;
