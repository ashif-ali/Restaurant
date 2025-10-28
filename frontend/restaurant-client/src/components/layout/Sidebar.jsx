import { NavLink } from "react-router-dom";
import DashboardIcon from "../../assets/icons/dashboard.svg?react";
import TableIcon from "../../assets/icons/table.svg?react";
import OrderLineIcon from "../../assets/icons/order_line.svg?react";
import MenuItemsIcon from "../../assets/icons/menu_items.svg?react";

const sidebarStyle = {
    width: "104px",
    backgroundColor: "#FFFFFF",
    height: "100vh",
    padding: "20px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderTopRightRadius: "16px",
    borderBottomRightRadius: "16px",
};

const logoContainerStyle = {
    width: "56px",
    height: "56px",
    backgroundColor: "#EB966A",
    borderRadius: "12px",
    marginBottom: "20px",
};

const navListStyle = {
    listStyle: "none",
    padding: 0,
    margin: 0,
};

const navItemStyle = {
    width: "56px",
    height: "56px",
    margin: "10px 0",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#000000",
};

const activeNavItemStyle = {
    ...navItemStyle,
    backgroundColor: "#D9D9D9",
};

const iconStyle = {
    width: "24px",
    height: "24px",
};

const navLinks = [
    { to: "/", Icon: DashboardIcon },
    { to: "/tables", Icon: TableIcon },
    { to: "/order-line", Icon: OrderLineIcon },
    { to: "/menu-items", Icon: MenuItemsIcon },
];

function Sidebar() {
    return (
        <nav style={sidebarStyle}>
            <div style={logoContainerStyle}></div>

            <ul style={navListStyle}>
                {/* eslint-disable-next-line no-unused-vars */}
                {navLinks.map(({ to, Icon }) => (
                    <li key={to}>
                        <NavLink
                            to={to}
                            style={({ isActive }) =>
                                isActive ? activeNavItemStyle : navItemStyle
                            }
                        >
                            <Icon style={iconStyle} />
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Sidebar;
