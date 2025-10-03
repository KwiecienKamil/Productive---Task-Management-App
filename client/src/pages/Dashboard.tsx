import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Tasks from "../components/Tasks";
import Rewards from "../components/Rewards";

const Dashboard = () => {
  const [streak, setStreak] = useState(0);
  const [firstDoneDate, setFirstDoneDate] = useState<string | null>(null);

  const currentUser = localStorage.getItem("user");
  const currentUserValue = currentUser ? JSON.parse(currentUser) : {};
  const currentUserId = currentUserValue.id;

  const currentDoneDates = localStorage.getItem("doneDates");
  const currentDoneDatesValue = currentDoneDates
    ? JSON.parse(currentDoneDates)
    : [];

  const filteredDoneDates = currentDoneDatesValue.filter(
    (date: any) => date.User_id === currentUserId
  );

  useEffect(() => {
    const isDataLoading = localStorage.getItem("Loading");

    axios
      .post(`${import.meta.env.VITE_API_URL}/getStreakRewards`, {
        User_id: currentUserId,
      })
      .then((res) => {
        localStorage.setItem("streakRewards", JSON.stringify(res.data));
        if (isDataLoading === "true") {
          window.location.reload();
        }
      });

    axios
      .post(`${import.meta.env.VITE_API_URL}/getUsersTasks`, {
        User_id: currentUserId,
      })
      .then((res) => {
        localStorage.setItem("tasks", JSON.stringify(res.data));
        if (isDataLoading === "true") {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          localStorage.setItem("Loading", "false");
        }
      });
  }, [currentUserId]);

  useEffect(() => {
    calculateStreak(filteredDoneDates);
  }, []);

  const clearTime = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const calculateStreak = (
    doneDates: { Task_doneDate: string; Task_id: number }[]
  ) => {
    if (!doneDates.length) {
      setStreak(0);
      return;
    }

    const uniqueDays = Array.from(
      new Set(
        doneDates.map(
          (task) =>
            new Date(`20${task.Task_doneDate.split("-").reverse().join("-")}`)
              .toISOString()
              .split("T")[0]
        )
      )
    ).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    let currentStreak = 0;
    const today = clearTime(new Date());

    for (let i = 0; i < uniqueDays.length; i++) {
      const currentDay = clearTime(new Date(uniqueDays[i]));
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - currentStreak);

      if (currentDay.getTime() === expectedDate.getTime()) {
        currentStreak++;
      } else {
        break;
      }
    }

    setStreak(currentStreak);

    if (uniqueDays.length) {
      setFirstDoneDate(uniqueDays[uniqueDays.length - 1]);
    }
  };

  localStorage.setItem("streak", JSON.stringify(streak));
  localStorage.setItem("firstDoneDate", firstDoneDate || "");

  return (
    <div className="h-screen px-[2px] vsm:px-[2rem] flex justify-between pt-8 font-inter text-black bg-gradient-to-r from-[#FBAB7E] to-[#F7CE68] overflow-hidden">
      <div className="flex">
        <Navbar />
        <Tasks />
      </div>
      <Rewards />
    </div>
  );
};

export default Dashboard;
