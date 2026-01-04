import React from "react";
import { FaHome, FaPlus } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, NavLink } from "react-router";

export default function DashboardLinks() {
  const links = [
    {
      icon: <FaHome />,
      title: "Home",
      link: "/dashboard",
    },
    {
      icon: <FaRegCircleUser />,
      title: "Profile",
      link: "/dashboard/my-profile",
    },
    {
      icon: <FaPlus />,
      title: "Added",
      link: "/dashboard/Added",
    },
  ];
  return (
    <>
      {links.map((link, i) => (
        <li key={i}>
          <Link
            to={link.link}
            className="is-drawer-close:tooltip  is-drawer-close:tooltip-right"
            data-tip={link.title}
          >
            <span className="text-lg">{link.icon}</span>
            <span className="is-drawer-close:hidden "> {link.title}</span>
          </Link>
        </li>
      ))}
    </>
  );
}
