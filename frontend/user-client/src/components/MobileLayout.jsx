const layoutStyle = {
    maxWidth: "450px", // A common width for a mobile device
    height: "100vh", // Fills the full height of the browser window
    margin: "0 auto",
    backgroundColor: "#FFFFFF",
    overflowY: "auto", // Allows content inside the 'phone' to scroll
    position: "relative", // Useful for positioning elements inside
};

function MobileLayout({ children }) {
    return <div style={layoutStyle}>{children}</div>;
}

export default MobileLayout;
