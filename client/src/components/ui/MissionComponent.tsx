import { FC } from "react";
import { useAppSelector } from "../../services/state/store";
import Diamonds from "./Diamonds";

type FinishedMission = {
  missionName: string;
  missionValue: number;
};

type MissionComponentProps = {
  id: number;
  title: string;
  value: number;
  numberToComplete: number;
  finishedMissions: FinishedMission[];
};

const MissionComponent: FC<MissionComponentProps> = ({
  title,
  value,
  id,
  numberToComplete,
  finishedMissions,
}) => {
  const tasksState = useAppSelector((state) => state.task.tasks);
  const state = useAppSelector((state) => state.doneDate.doneDates);
  const numberOfTasksDone = tasksState.length;

  const finishedMissionsValues = Array.isArray(finishedMissions)
    ? finishedMissions.map((item) => item.missionValue)
    : [];

  return (
    <div className="flex flex-col gap-1" key={id}>
      <p className="text-sm md:text-[15px] lg:text-xl">{title}</p>
      <div className="flex items-center justify-between">
        <div
          className={
            finishedMissionsValues.find((number) => number === value) ||
            (numberOfTasksDone >= numberToComplete && state.length > 0)
              ? "w-[80%] p-2 mt-1 bg-green-400 rounded-full overflow-hidden"
              : "w-[80%] p-2 mt-1 bg-[#DCDCDC] rounded-full overflow-hidden"
          }
        ></div>
        <Diamonds
          value={value}
          numberToComplete={numberToComplete}
          missionId={id}
          finishedMissions={finishedMissions}
        />
      </div>
    </div>
  );
};

export default MissionComponent;
