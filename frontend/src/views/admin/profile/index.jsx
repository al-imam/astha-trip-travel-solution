import { useEffect, useState } from "react";
import ChangePassword from "./components/ChangePassword";
import Storage from "./components/Storage";
import axios from "axios";
import { toast } from "react-toastify";

const ProfileOverview = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/admin/heading");
      setText((prev) => prev || data.text);
    })();
  }, []);

  async function updateHeading() {
    try {
      const { data } = await axios.put("/api/admin/heading", { text });
      setText(data.text);
      toast.success("Heading updated successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-3">
        {/* <div className="col-span-4 lg:!mb-0">
          <Banner />
        </div>

        <div className="z-0 col-span-5 lg:!mb-0">
          <Upload />
        </div> */}
        <div className="lg:!mb-0">
          <Storage />
        </div>
        <div className="col-span-2 h-full">
          <ChangePassword />
        </div>
      </div>
      <div className="relative flex flex-col gap-4 rounded-[20px] bg-white bg-clip-border p-4 text-gray-900 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none sm:flex-row">
        <textarea
          className="w-full rounded-md border border-gray-200 bg-[#E8F0FE] bg-white/0 p-3 text-base outline-none ring-brandLinear focus:ring dark:!border-white/10"
          placeholder="Bio"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={updateHeading}
          className="mt-auto rounded-md bg-brand-500 px-6 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          Update
        </button>
      </div>

      {/* all project & ... */}

      {/* <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <Project />
        </div>
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-7">
          <General />
        </div>
      </div> */}
    </div>
  );
};

export default ProfileOverview;
