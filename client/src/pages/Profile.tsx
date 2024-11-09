import Navbar from "../components/Navbar";
import ProfileComponent from "../components/ProfileComponent";

const Profile = () => {
  return (
    <div className="h-screen px-[2px] vsm:px-[2rem] flex pt-8 font-inter text-black bg-gradient-to-r from-[#FBAB7E] to-[#F7CE68] overflow-hidden">
      <Navbar />
      <ProfileComponent />
    </div>
  );
};

export default Profile;
