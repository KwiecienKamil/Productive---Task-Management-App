const CurrentStreak = ({ streak }: any) => {
  return (
    <div className="p-1 flex items-center gap-2 text-[16px] sm:text-xl">
      <p className="text-gray-400">You're on</p>
      <p className="font-bold">
        <span>{streak}</span> day streak
      </p>
    </div>
  );
};

export default CurrentStreak;
