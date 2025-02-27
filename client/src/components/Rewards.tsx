import { SlPresent } from "react-icons/sl";
import { Link } from "react-router-dom";
import LogoutButton from "./ui/LogoutButton";

const Rewards = () => {
  return (
    <div>
      <div className="hidden sm:flex flex-col sm:items-normal items-center gap-2 pt-11 relative ">
        <div className="flex justify-end w-full">
          <LogoutButton responsiveClassNames="hidden sm:block" />
        </div>
        <SlPresent className="mt-[2px] text-yellow-600 text-2xl" />
        <div>
          <h3 className="font-semibold text-center text-[11px] xl:text-md xxl:text-lg">
            Take your reward
          </h3>
          <p className="text-[10px] sm:text-md xxl:max-w-[190px] text-center">
            Grow your day streak to get coins
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <Link
          to="/missions"
          className="hidden sm:block w-full text-sm sm:text-lg text-center mt-2 p-1 sm:px-4 sm:py-1 bg-green-500 rounded-lg text-black hover:brightness-95 duration-300"
        >
          Missions
        </Link>
      </div>
    </div>
  );
};

export default Rewards;
