import { useDashboardFilter } from "../../context/DashboardFilterContext";

const cardStyle = {
    backgroundColor: "#F0F5F3",
    // backgroundColor: "#3df0ff", // this need to be changed back to previous color after demo
    border: "1px solid #D9D9D9",
    borderRadius: "8px",
    padding: "60px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
};

const textContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "4px",
};

const valueStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#000000",
};

const titleStyle = {
    fontSize: "12px",
    color: "#8A8A8A",
    textTransform: "uppercase",
};

const iconContainerStyle = {
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

function AnalyticsCard({ value, title, Icon, iconProps, containerProps }) {
    const { searchTerm } = useDashboardFilter();

    //determine if this card should be faded
    const isFaded =
        searchTerm && !title.toLowerCase().includes(searchTerm.toLowerCase());

    const fadedStyle = {
        opacity: 0.3,
        transition: "opacity 0.3s ease-in-out",
    };

    const defaultContainerStyle = {
        width: "70px",
        height: "70px",
        borderRadius: "50%",
    };

    return (
        <div style={{ ...cardStyle, ...(isFaded && fadedStyle) }}>
            {/* Element 1: The Icon */}
            <div
                style={{
                    ...iconContainerStyle,
                    ...defaultContainerStyle,
                    ...containerProps,
                }}
            >
                {Icon && <Icon {...iconProps} />}
            </div>

            {/* Element 2: The Text Container */}
            <div style={textContainerStyle}>
                <span style={valueStyle}>{value}</span>
                <span style={titleStyle}>{title}</span>
            </div>
        </div>
    );
}

export default AnalyticsCard;
