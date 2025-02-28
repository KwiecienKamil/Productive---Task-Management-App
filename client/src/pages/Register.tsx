import { FormEvent, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (username.length > 4 && password.length > 4) {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/register`,
          {
            username: username,
            password: password,
          },
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success("Successfully Registered!");
            localStorage.setItem("Loading", "true");
            setTimeout(() => {
              window.location.href = "/";
            }, 3000);
          } else {
            toast.error("There was a problem, try again later");
          }
        })
        .catch((error) => {
          if (error.code === "ERR_BAD_REQUEST") {
            toast.error("There was a problem, try again later");
          }
        });
    } else {
      toast.error("Username and password must be at least 5 characters");
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div className="h-screen w-full flex-col flex items-center justify-center bg-pri ">
      <p className="text-2xl pb-2 text-center text-black">
        Welcome to <span className="font-semibold">Productive</span>
      </p>
      <p className="text-[#787878] pb-2 text-xl">Register</p>
      <form
        className="flex flex-col gap-2 pt-2 rounded-xl w-[350px] sm:w-[450px]"
        method="post"
      >
        <label
          htmlFor="username"
          className="input input-bordered flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-5 h-5 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            name="username"
            id="username"
          />
        </label>
        <label
          htmlFor="password"
          className="input input-bordered flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-5 h-5 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            id="password"
          />
        </label>
        <div className=" flex items-center justify-end gap-2">
          <p className="text-[#787878]">Already have account?</p>
          <Link to="/" className="hover:text-black text-black font-semibold">
            Login
          </Link>
        </div>
        <button
          type="submit"
          className="btn bg-sec text-white hover:bg-[#23262b] mt-4"
          onClick={handleSubmit}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
