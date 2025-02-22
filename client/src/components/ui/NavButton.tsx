import React, { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";

type NavButtonProps = {
  children: React.ReactNode;
  followingHref: string;
};

const NavButton: FC<NavButtonProps> = ({ children, followingHref }) => {
  const location = useLocation();
  const isActive = location.pathname === followingHref;
  return (
    <NavLink
      to={`${followingHref}`}
      className={`font-semibold flex items-center gap-1 px-1 py-1 sm:py-2 sm:px-3 rounded-lg duration-300 transition-colors text-sm sm:text-md md:text-xl ${
        isActive ? "bg-black/20" : "hover:bg-black/20"
      }`}
    >
      {children}
    </NavLink>
  );
};

export default NavButton;
