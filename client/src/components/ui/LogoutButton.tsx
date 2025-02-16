import { Link } from "react-router-dom";

const LogoutButton = ({ responsiveClassNames }: any) => {
  const logoutHandler = () => {
    localStorage.clear();
  };
  return (
    <Link
      to="/"
      onClick={logoutHandler}
      className={`${responsiveClassNames} w-full text-sm sm:text-lg text-center p-1 mb-8 sm:px-4 sm:py-1 bg-red-500 rounded-lg text-black hover:brightness-75 duration-300`}
    >
      Logout
    </Link>
  );
};

export default LogoutButton;
