import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SideBar";
import "./NavBar.css";

export const NavBar = ({ setPage, page }) => {
  const [sidebar, setSidebar] = useState(false);

  const handleSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className="navbar">
        <FaIcons.FaBars
          style={{ cursor: "pointer" }}
          className="menu-bars"
          onClick={handleSidebar}
        />
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle" onClick={handleSidebar}>
            <AiIcons.AiOutlineClose />
          </li>
          {SidebarData.map((data, index) => {
            return (
              <li
                key={index}
                className={data.className}
                onClick={() => setPage(data.case)}
              >
                {data.icon}
                <span>{data.name}</span>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};
