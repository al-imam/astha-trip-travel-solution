import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function () {
  const { register, handleSubmit } = useForm();

  async function onSubmit(data) {
    try {
      await toast.promise(axios.post("/api/admin/change-password", data), {
        pending: "Please wait loading..",
        success: "Password change successfully!",
        error: {
          render(error) {
            if (error.data.response.data.code === "invalid-password") {
              return "Places enter correct password";
            }
            return "Something went wrong, try again!";
          },
        },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  function onInvalid(error) {
    toast.error("Password's mast have more then 6 character!");
  }

  return (
    <div className="h-full rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none ">
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="flex w-full flex-col gap-6 px-4 py-6"
      >
        <div className="flex flex-1 flex-col gap-2">
          <label className="text-sm font-medium text-navy-700 dark:text-white">
            Current Password*
          </label>
          <input
            type="password"
            placeholder="Current Password"
            className="rounded-md border border-gray-200 bg-[#E8F0FE] bg-white/0 p-3 text-sm outline-none ring-brandLinear focus:ring dark:!border-white/10 dark:text-white"
            {...register("current-password", { required: true, minLength: 6 })}
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <label className="text-sm font-medium text-navy-700 dark:text-white">
            New Password*
          </label>
          <input
            type="password"
            placeholder="New Password"
            className="rounded-md border border-gray-200 bg-[#E8F0FE] bg-white/0 p-3 text-sm outline-none ring-brandLinear focus:ring dark:!border-white/10 dark:text-white"
            {...register("password", { required: true, minLength: 6 })}
          />
        </div>
        <button className="mt-auto flex items-center justify-center rounded-md bg-brand-500 px-6 py-[10px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Save
        </button>
      </form>
    </div>
  );
}
