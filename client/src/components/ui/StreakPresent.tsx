import packageImg from "../../assets/package.svg";

import { toast } from "sonner";
import { useAppDispatch } from "../../services/state/store";
import { addDiamonds } from "../../services/state/features/diamondsSlice";
import axios from "axios";
import { TiInputChecked } from "react-icons/ti";

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
  const currentUser = localStorage.getItem("user");
  const currentUserId = JSON.parse(currentUser!);

  const streakRewards = localStorage.getItem("streakRewards");
  const currentStreakRewards = streakRewards
    ? (() => {
        try {
          const parsed = JSON.parse(streakRewards);
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      })()
    : [];

  const claimedStreakRewardsTitles = currentStreakRewards.map(
    (object: any) => object.streakReward_title
  );

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
          axios
            .post(`${import.meta.env.VITE_API_URL}/getStreakRewards`, {
              User_id: currentUserId.id,
            })
            .then((res) => {
              localStorage.setItem("streakRewards", JSON.stringify(res.data));
            });
          toast.success(`Successfully added ${awardValue} diamonds!`);
          window.location.reload();
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  return (
    <div className="flex items-center justify-center flex-col gap-2 pt-8">
      <img
        src={packageImg}
        alt="package"
        className="w-[25px] sm:w-[40px] md:w-[50px]"
      />
      <div className="flex items-center flex-col">
        <span className="text-[12px] vsm:text-[13px] sm:text-md md:text-md text-center">
          {day}
        </span>
        {streak > dayNumber &&
          !claimedStreakRewardsTitles.find((title: string) => title == day) && (
            <button
              onClick={handleClaimAward}
              className="bg-pri rounded px-3 py-1 mt-2 hover:bg-pri text-sm text-black"
            >
              Claim Reward
            </button>
          )}
        {claimedStreakRewardsTitles.find((title: string) => title == day) && (
          <span className="text-green-500 sm:text-xl lg:text-2xl mt-2 text-center">
            <TiInputChecked />
          </span>
        )}
      </div>
    </div>
  );
};

export default StreakPresent;
