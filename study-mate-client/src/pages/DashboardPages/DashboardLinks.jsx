import React from "react";
import { FaBackspace, FaHome, FaPlus } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, NavLink } from "react-router";
import { TbCloudDataConnection } from "react-icons/tb";
import { RiUserAddLine } from "react-icons/ri";

export default function DashboardLinks() {
  const links = [
    {
      icon: <FaBackspace />,
      title: "Back",
      link: "/",
    },
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
      icon: <RiUserAddLine />,
      title: "Create-Profile",
      link: "/dashboard/Create-Profile",
    },
    {
      icon: <TbCloudDataConnection />,
      title: "My Connections",
      link: "/dashboard/my-connection",
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
