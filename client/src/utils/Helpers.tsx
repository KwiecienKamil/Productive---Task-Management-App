import { FaHome } from "react-icons/fa";
import { RiTaskFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";

import dayjs from "dayjs";

export const NavButtons = [
  {
    id: 1,
    icon: <FaHome />,
    text: "Home",
    href: "/dashboard",
  },
  {
    id: 2,
    icon: <RiTaskFill />,
    text: "Missions",
    href: "/missions",
  },
  {
    id: 3,
    icon: <FaUserCircle />,
    text: "Profile",
    href: "/profile",
  },
];

export function getMonth(month = dayjs().month()) {
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysArray = new Array(5).fill("").map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysArray;
}

export const missions = [
  {
    id: 1,
    title: "Complete Task",
    value: 5,
    numberOfTasksToComplete: 1,
  },
  {
    id: 3,
    title: "Complete 3 Tasks",
    value: 10,
    numberOfTasksToComplete: 3,
  },
  {
    id: 4,
    title: "Complete 5 Tasks",
    value: 15,
    numberOfTasksToComplete: 5,
  },
];

export const streakPresents = [
  {
    day: "Day 1",
    awardValue: 5,
    dayNumber: 1,
  },
  {
    day: "Day 3",
    awardValue: 10,
    dayNumber: 3,
  },
  {
    day: "Day 5",
    awardValue: 15,
    dayNumber: 5,
  },
  {
    day: "Day 10",
    awardValue: 25,
    dayNumber: 10,
  },
];
