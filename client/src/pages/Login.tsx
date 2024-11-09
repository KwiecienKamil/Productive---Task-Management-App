import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div
      data-theme="emerald"
      className="h-screen w-full flex-col flex items-center justify-center bg-pri px-4 py-2"
    >
      <p className="text-2xl pb-2 text-center text-black">
        Welcome to <span className="font-semibold">Productive</span>
      </p>
      <p className="text-[#999898] pb-2 text-xl">Login</p>
      <LoginForm />
    </div>
  );
};

export default Login;
