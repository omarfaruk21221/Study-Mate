import React from "react";
import { FaHome, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router";

export default function DashboardLinks() {
  const links = [
    {
      icon: <FaHome />,
      title: "Home",
      link: "/dashboard/home",
    },
    {
      icon: <FaPlus />,
      title: "Added",
      link: "/dashboard/Added",
    },
  ];
  return (
    <>
      {links.map((link) => (
        <li>
          <NavLink
            to={link.link}
            className="is-drawer-close:tooltip  is-drawer-close:tooltip-right"
            data-tip={link.title}
          >
            <span className="text-lg">{link.icon}</span>
            <span className="is-drawer-close:hidden "> {link.title}</span>
          </NavLink>
        </li>
      ))}
    </>
  );
}
