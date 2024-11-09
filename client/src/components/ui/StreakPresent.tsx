import { useState } from "react";
import packageImg from "../../assets/package.svg";

import { CiCircleCheck } from "react-icons/ci";
import { toast } from "sonner";
import { useAppDispatch } from "../../services/state/store";
import { addDiamonds } from "../../services/state/features/diamondsSlice";

type StreakPresentProps = {
  day: string;
  awardValue: number;
  dayNumber: number;
  streak: any;
};

const StreakPresent = ({
  day,
  awardValue,
  streak,
  dayNumber,
}: StreakPresentProps) => {
  const [awardClaimed, setawardClaimed] = useState(false);

  const currentUser = localStorage.getItem("user");
  const currentUserId = JSON.parse(currentUser!);

  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    setawardClaimed(true);
    dispatch(addDiamonds({ User_id: currentUserId.id, awardValue }));
    toast.success("Success!");
  };

  return (
    <div className="flex items-center justify-center flex-col gap-2 pt-8">
      <img src={packageImg} alt="package" className="w-[30px] sm:w-[50px]" />
      <div className="flex items-center flex-col">
        <CiCircleCheck
          className={`text-xl sm:text-3xl ${
            streak > dayNumber ? "text-green-500" : "text-gray-400"
          }`}
        />
        <span className="text-sm sm:text-md">{day}</span>
        {streak > dayNumber && !awardClaimed && (
          <button
            onClick={handleButtonClick}
            className="bg-pri rounded px-3 py-1 mt-2 hover:bg-pri text-sm text-black"
          >
            Claim Award
          </button>
        )}
        {awardClaimed && (
          <span className="text-green-500 text-sm mt-2">Award Claimed!</span>
        )}
      </div>
    </div>
  );
};

export default StreakPresent;
