import { useEffect, useState } from "react";
import packageImg from "../../assets/package.svg";

import { CiCircleCheck } from "react-icons/ci";
import { toast } from "sonner";
import { useAppDispatch } from "../../services/state/store";
import { addDiamonds } from "../../services/state/features/diamondsSlice";
import axios from "axios";

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

  // Getting User_id for api call
  const currentUser = localStorage.getItem("user");
  const currentUserId = JSON.parse(currentUser!);

  // Getting User Diamonds for adding the streakReward value after
  const streakRewards = localStorage.getItem("streakRewards");
  const currentStreakRewards = JSON.parse(streakRewards!);
  const claimedStreakRewardsTitles = currentStreakRewards.map(
    (object: any) => object.streakReward_title
  );
  console.log(claimedStreakRewardsTitles);

  const dispatch = useAppDispatch();

  const handleClaimAward = () => {
    dispatch(addDiamonds({ User_id: currentUserId.id, awardValue }));
    axios
      .post(`${import.meta.env.VITE_API_URL}/addStreakReward`, {
        streakReward_title: day,
        streakReward_value: awardValue,
        User_id: currentUserId.id,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("streakRewards", JSON.stringify(res.data));
          setawardClaimed(true);
          toast.success(`Successfully added ${awardValue} diamonds!`);
        } else {
          toast.error("Something went wrong");
        }
      });
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
            onClick={handleClaimAward}
            className="bg-pri rounded px-3 py-1 mt-2 hover:bg-pri text-sm text-black"
          >
            Claim Reward
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
