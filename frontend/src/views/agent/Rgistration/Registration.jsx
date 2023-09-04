import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Slider from "../Slider/Slider";

function Registration() {
  const { handleSubmit, register, reset } = useForm();
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      await axios.post("/api/agent/reg", data);
      navigate("/agent");
      toast.success("Login successfully done");
      reset();
    } catch (e) {
      console.log(e);
      if (e.response.data.code === "email-exist") return toast.error("Email already exist!");
      toast.error("Something went wrong!");
    }
  }

  function onInvalid() {
    return toast.error("Please fill all filed");
  }

  return (
    <div className="cbg relative min-h-screen w-full">
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
              to={"/agent/Login"}
              className="ml-auto rounded bg-brand-500 py-4 px-6 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 md:ml-0"
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>
      <div className="h-44 md:h-40"></div>
      <div className="relative w-full">
        <img src="/asthatripbaner.jpg" className="block w-full md:hidden" alt="" />
        <img src="/longsthabaner.jpg" className="hidden w-full md:block" alt="" />
      </div>
      <div className="relative mx-auto grid w-full max-w-[1300px] grid-cols-1 justify-center md:grid-cols-2 md:gap-2">
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="relative flex w-full flex-col items-center justify-center rounded-md bg-white/60 pb-8 backdrop-blur-md"
        >
          <div className="relative w-full rounded-sm bg-brand-100/50 p-3 text-center">
            <h1 className="text-2xl font-bold">Astha trip</h1>
            <p className="text-brand-700">Apply for Agent Account</p>
          </div>
          <div className="relative flex w-full flex-col p-2">
            <label className="text">Name</label>
            <input
              className="rounded-md border-2 border-brand-500 bg-white p-2 outline-none transition-all duration-300 focus:shadow-md"
              {...register("name", { required: true })}
              placeholder="type here"
              type="text"
            />
          </div>
          <div className="relative flex w-full flex-col p-2">
            <label className="text">NID (national ID number)</label>
            <input
              className="rounded-md border-2 border-brand-500 bg-white p-2 outline-none transition-all duration-300 focus:shadow-md"
              {...register("nid_no", { required: true })}
              placeholder="type here"
              type="text"
            />
          </div>
          <div className="relative flex w-full flex-col p-2">
            <label className="text">Email</label>
            <input
              className="rounded-md border-2 border-brand-500 bg-white p-2 outline-none transition-all duration-300 focus:shadow-md"
              {...register("email", { required: true })}
              placeholder="type here"
              type="text"
            />
          </div>
          <div className="relative flex w-full flex-col p-2">
            <label className="text">Phone</label>
            <input
              className="rounded-md border-2 border-brand-500 bg-white p-2 outline-none transition-all duration-300 focus:shadow-md"
              {...register("phone", { required: true })}
              placeholder="type here"
              type="text"
            />
          </div>
          <div>
            <button className="mx-3 rounded-md border-2 border-brand-700 bg-white px-4 py-2 transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95">
              Apply
            </button>
          </div>
          <div className="w-full p-2 text-sm font-light text-red-600">
            Contact an admin after applying. If they approve you, you will receive an email with your login credential
          </div>
        </form>
        <div className="relative w-full flex-1 md:block">
          <Slider />
        </div>
        <div className=""></div>
      </div>
      <div className="top-0 left-0 mx-auto h-full w-full max-w-[900px]">
        <img src="/longbaner.jpg" className="w-full" alt="" />
      </div>
    </div>
  );
}

export default Registration;
