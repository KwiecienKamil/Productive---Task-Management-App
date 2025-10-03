import axios from "axios";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleTestUser = async (e: FormEvent) => {
    e.preventDefault();
    localStorage.clear();
    axios
      .get(`${import.meta.env.VITE_API_URL}/getDoneDates`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      })
      .then((res) => {
        localStorage.setItem("doneDates", JSON.stringify(res.data));
      })
      .catch(() => {
        toast.error("Something went wrong, try again please");
      });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          username: "Kamil",
          password: "12345",
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.message) {
        toast.error("Wrong Username/password");
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.data[0].User_id,
            Username: username,
          })
        );
        localStorage.setItem("Loading", "true");
        toast.success("Successfuly logged in!");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      }
    } catch (error) {
      console.error("There was an error with the login request:", error);
    }
    setUsername("");
    setPassword("");
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    localStorage.clear();
    axios
      .get(`${import.meta.env.VITE_API_URL}/getDoneDates`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      })
      .then((res) => {
        localStorage.setItem("doneDates", JSON.stringify(res.data));
      })
      .catch(() => {
        toast.error("Something went wrong, try again please");
      });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
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
      );
      if (response.data.message) {
        toast.error("Wrong Username/password");
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.data[0].User_id,
            Username: username,
          })
        );
        localStorage.setItem("Loading", "true");
        toast.success("Successfuly logged in!");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      }
    } catch (error) {
      console.error("There was an error with the login request:", error);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <form
      className="flex flex-col gap-2 w-[350px] sm:w-[450px] pt-2 rounded-xl "
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
        <p className="text-[#787878]">Dont't have account?</p>
        <a
          href="/register"
          className="hover:text-black text-black font-semibold"
        >
          Register
        </a>
      </div>
      <button
        className="btn bg-sec text-white hover:bg-[#23262b] mt-4"
        onClick={handleLogin}
      >
        Login
      </button>
        <button onClick={handleTestUser} className="btn bg-blue-700 hover:bg-blue-500 px-4 py-2 text-white">Test application</button>
    </form>
  );
};

export default LoginForm;
