import { missions } from "../utils/Helpers";
import MissionComponent from "./ui/MissionComponent";

type FinishedMission = {
  missionName: string;
  missionValue: number;
};

type questsProps = {
  finishedMissions: FinishedMission[];
};

const Quests = ({ finishedMissions }: questsProps) => {
  return (
    <div className="card w-[95%] vsm:w-[60%] md:max-w-[40%] shadow-sm p-4 bg-sec text-white">
      <h1 className="font-bold text-sm lg:text-md">Quests</h1>
      <div className="pt-8 pb-2 flex flex-col gap-4">
        {missions.map((mission) => (
          <MissionComponent
            key={mission.id}
            title={mission.title}
            value={mission.value}
            id={mission.id}
            numberToComplete={mission.numberOfTasksToComplete}
            finishedMissions={finishedMissions}
          />
        ))}
      </div>
    </div>
  );
};

export default Quests;
