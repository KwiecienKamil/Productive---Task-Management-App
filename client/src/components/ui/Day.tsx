import dayjs from "dayjs";

type DayProps = {
  day: dayjs.Dayjs;
  rowIdx: number;
  doneDates: (string | undefined)[];
};

const Day = ({ day, rowIdx, doneDates }: DayProps) => {
  const getCurrentDay = () => {
    if (doneDates?.length === 0) {
      return "notCurrentDay";
    } else {
      return doneDates?.find((date) => date === day.format("DD-MM-YY"))
        ? "currentDay"
        : "notCurrentDay";
    }
  };
  return (
    <div
      className="w-[50px] flex items-center justify-center flex-col"
      key={rowIdx}
    >
      {rowIdx === 0 && (
        <p className="text-[7px] vsm:text-[8px] sm:text-sm">
          {day.format("ddd").toUpperCase()}
        </p>
      )}
      <div
        className={
          getCurrentDay() === "currentDay"
            ? `h-2 w-1 sm:h-3 sm:w-2 md:h-4 md:w-4 m-2 bg-green-400 rounded-sm`
            : `h-2 w-1 sm:h-3 sm:w-2 md:h-4 md:w-4 m-2 bg-slate-300 rounded-sm`
        }
      ></div>
    </div>
  );
};

export default Day;
