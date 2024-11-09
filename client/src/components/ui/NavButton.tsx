import React, { FC } from "react";

type NavButtonProps = {
  children: React.ReactNode;
  followingHref: string;
};

const NavButton: FC<NavButtonProps> = ({ children, followingHref }) => {
  return (
    <a
      href={`${followingHref}`}
      className="font-semibold flex items-center gap-1 px-1 py-1 sm:py-2 sm:px-3 rounded-lg hover:bg-pri duration-300 transition-colors text-sm sm:text-md md:text-xl"
    >
      {children}
    </a>
  );
};

export default NavButton;
