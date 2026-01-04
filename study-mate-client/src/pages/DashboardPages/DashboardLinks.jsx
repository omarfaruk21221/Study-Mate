import React from "react";
import { Link } from "react-router-dom";
import { FaBackspace, FaHome, FaPlus } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { TbCloudDataConnection } from "react-icons/tb";
import { RiUserAddLine } from "react-icons/ri";
import useRole from "../../Hooks/useRole";
import Loader from "../../components/Spiners/Loader";
import { MdOutlineManageAccounts } from "react-icons/md";
import { IoArrowUndoCircleOutline, IoDocumentsOutline } from "react-icons/io5";

export default function DashboardLinks() {
  const { role, roleLoading } = useRole();

  if (roleLoading) return <Loader />;

  // Base links for all users
  const links = [
    { icon: <IoArrowUndoCircleOutline />, title: "Back", link: "/" },
    { icon: <FaHome />, title: "Home", link: "/dashboard" },
    {
      icon: <FaRegCircleUser />,
      title: "Profile",
      link: "/dashboard/my-profile",
    },
  ];

  // Conditional links for specific roles
  if (role === "user") {
    links.push(
      {
        icon: <RiUserAddLine />,
        title: "Create Profile",
        link: "/dashboard/Create-Profile",
      },
      {
        icon: <TbCloudDataConnection />,
        title: "My Connections",
        link: "/dashboard/my-connection",
      }
    );
  }

  if (role === "admin") {
    links.push(
      {
        icon: <MdOutlineManageAccounts />,
        title: "Manage Users",
        link: "/dashboard/manage-users",
      },
      {
        icon: <IoDocumentsOutline />,
        title: "Manage Blogs",
        link: "/dashboard/manage-blogs",
      }
    );
  }

  return (
    <>
      {links.map((link, i) => (
        <li key={i}>
          <Link
            to={link.link}
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 px-3 py-2 hover:bg-primary/10 rounded-md transition-colors"
            data-tip={link.title}
          >
            <span className="text-lg text-primary">{link.icon}</span>
            <span className="is-drawer-close:hidden font-medium text-base-content">
              {link.title}
            </span>
          </Link>
        </li>
      ))}
    </>
  );
}
