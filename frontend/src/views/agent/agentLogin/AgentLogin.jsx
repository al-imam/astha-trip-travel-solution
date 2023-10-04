import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Slider from "../Slider/Slider";
const AgentLogin = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      await toast.promise(axios.post("/api/agent/login", data), {
        pending: "Please wait loading...",
        error: {
          render({ data }) {
            if (data.response.data.code === "not-found") {
              return "User not found!";
            } else if (data.response.data.code === "not-match") {
              return "User and Password not match!";
            } else if (data.response.data.code === "blocked-agent") {
              return "You're suspended from astha trip";
            }
            return "Something went wrong!";
          },
        },
        success: "Login successful!",
      });
      reset();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }

  function onInvalid() {
    toast.error("Enter valid information!");
  }

  return (
    <div>
      <div className=" cbg mx-auto flex min-h-screen w-full flex-col items-center  justify-between px-5 md:h-screen">
        <div>
          <img src="/particalbg.png" alt="" className="b fixed left-0 bottom-0 z-0 h-full object-contain" />
        </div>
        <nav className="fixed top-0 left-0 z-30 mt-2 flex w-full justify-center px-4 backdrop-blur-md ">
          <ul className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
            <li className="mr-auto flex items-center gap-4 md:mr-0">
              <img className="h-24 rounded-full md:h-32" src="/logoastha.png" alt="img" />
              <div>
                <p className="text-2xl font-bold uppercase text-navy-700 dark:text-white sm:text-3xl md:text-5xl">
                  Astha Trip
                </p>
                <p className="font-bold uppercase ">join the privileged world</p>
              </div>
            </li>
            <li className="w-full md:w-auto">
              <Link
                to="/agent/registration"
                className="ml-auto inline-block rounded bg-brand-500 py-4 px-6 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 md:ml-0"
              >
                Create account
              </Link>
            </li>
          </ul>
        </nav>
        <div className="h-52 md:hidden "></div>

        <div className="grid w-full grid-cols-1 items-center md:grid-cols-2">
          <form
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            className=" sm:11/12 relative z-10 w-full max-w-full items-center rounded-md bg-white/50 p-10  shadow-md backdrop-blur-sm  md:w-10/12 lg:left-14 lg:ml-10"
          >
            <h4 className="mb-2.5 text-2xl font-bold text-navy-700 dark:text-white md:text-4xl">Login As Agent</h4>
            <p className="mb-9 ml-1 text-base text-gray-800">Enter your email and password to sign in!</p>
            <div className="mb-3">
              <label className="ml-1.5 text-sm font-medium text-navy-700 dark:text-white">Email*</label>
              <input
                type="text"
                placeholder="example@mail.com"
                className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-700 bg-white/0 p-3 text-sm outline-none placeholder:text-gray-700 dark:!border-white/10 dark:text-brand-700"
                {...register("email", { required: true })}
              />
            </div>
            <div className="mb-3">
              <label className="ml-1.5 text-sm font-medium text-navy-700 dark:text-white">Password*</label>
              <input
                type="password"
                placeholder="type password"
                className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-700 bg-white/0 p-3 text-sm outline-none placeholder:text-gray-700 dark:!border-white/10 dark:text-white"
                {...register("password", { required: true })}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            >
              Sign In
            </button>
            <div className="mt-4">
              <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">Not registered yet?</span>
              <Link
                to="/agent/registration"
                className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              >
                Create an account
              </Link>
            </div>
          </form>
          {/* slider */}
          <div className="relative mb-3 w-full overflow-hidden md:w-11/12 lg:w-9/12">
            <Slider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentLogin;
