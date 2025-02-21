import React, { useState, useEffect } from "react";
import defaultUserPicture from "../assets/defaultUserPicture.png";
import { IoDiamondSharp } from "react-icons/io5";

const ProfileComponent = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const pictureRef = React.useRef<HTMLInputElement>(null);

  const currentUserName = localStorage.getItem("user");
  const currentUserNameValue = currentUserName
    ? JSON.parse(currentUserName)
    : [];

  const currentstreakValue = localStorage.getItem("streak");
  const streak = currentstreakValue ? JSON.parse(currentstreakValue) : [];

  const currentTasks = localStorage.getItem("tasks");
  const currentTasksvalue = currentTasks ? JSON.parse(currentTasks) : [];

  const firstDoneDate = localStorage.getItem("firstDoneDate");

  const userDiamondsInString = localStorage.getItem("User Diamonds");
  const userDiamonds = JSON.parse(userDiamondsInString!);

  useEffect(() => {
    const savedProfileImage = localStorage.getItem("profileImage");
    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
    }
  }, []);

  const convertToBase64 = (file: File) => {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageClick = () => {
    pictureRef.current?.click();
  };

  const handleChangeImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const base64Image = (await convertToBase64(file)) as string;
      setProfileImage(base64Image);
      localStorage.setItem("profileImage", base64Image);
    }
  };

  const getTimeSinceFirstDoneDate = (firstDoneDate: string) => {
    const now = new Date();
    const firstDate = new Date(firstDoneDate);

    const diffInMilliseconds = now.getTime() - firstDate.getTime();
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInMonths / 12);

    const remainingMonths = diffInMonths % 12;
    const remainingDays = diffInDays % 30;

    if (diffInYears === 0 && remainingMonths === 0) {
      return `${remainingDays} days`;
    }

    if (diffInYears === 0) {
      return `${remainingMonths} months, ${remainingDays} days`;
    }

    return `${diffInYears} years, ${remainingMonths} months, ${remainingDays} days`;
  };

  return (
    <div className="shadow-sm p-1 sm:p-4 pt-10">
      <div className="card shadow-sm p-1 sm:p-4 bg-sec text-white">
        <div className="p-4 sm:p-8 flex gap-6">
          <div
            className="flex flex-col sm:justify-center text-[20px] md:min-w-[150px]"
            onClick={handleImageClick}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="User picture"
                className="rounded-full w-[100px] h-[100px]"
              />
            ) : (
              <img
                src={defaultUserPicture}
                alt="User picture"
                className="rounded-full w-[100px] h-[100px]"
              />
            )}
            <input
              type="file"
              ref={pictureRef}
              className="mt-4 hidden"
              onChange={handleChangeImage}
            />
            <p className="flex items-center gap-2 mt-2 text-sm md:text-xl ">
              Hi,
              <span className="font-bold flex items-center">
                {currentUserNameValue.Username}👋
              </span>
            </p>
            <div className="flex items-center text-sm md:text-xl">
              <span>{userDiamonds}</span>
              <IoDiamondSharp className="text-blue-500 " />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
              <div className="flex items-center justify-between gap-2 sm:gap-4">
                <div className="flex items-center justify-center flex-col border-[2px] border-pri p-[6px] sm:p-3 rounded-full text-sm sm:text-xl">
                  <span>Tasks</span>
                  <span>{currentTasksvalue.length}</span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 sm:gap-4">
                <div className="flex items-center justify-center flex-col border-[2px] border-pri p-[6px] sm:p-3 rounded-full text-sm sm:text-xl">
                  <span>Streak</span>
                  <span>{streak}</span>
                </div>
              </div>
            </div>
            <div className="text-[10px] md:text-sm pt-4 w-full">
              <p>You are with us for</p>
              <p className="font-semibold text-pri text-[12px] md:text-lg">
                {firstDoneDate
                  ? getTimeSinceFirstDoneDate(firstDoneDate)
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
