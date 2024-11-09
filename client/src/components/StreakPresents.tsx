import StreakPresent from "./ui/StreakPresent";
import { streakPresents } from "../utils/Helpers";

const StreakPresents = ({ streak }: any) => {
  return (
    <div className="flex items-center justify-between px-2">
      {streakPresents.map((item) => (
        <StreakPresent
          day={item.day}
          awardValue={item.awardValue}
          streak={streak}
          dayNumber={item.dayNumber}
        />
      ))}
    </div>
  );
};

export default StreakPresents;
