import axios from "axios";
import { Button } from "components/form/Button";
import { Input } from "components/form/Input";
import { useAuth } from "hook/useAuth";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { DeleteIcon } from "views/public/Entry/MainEntry";
import { Spinner } from "views/public/Entry/Spinner";
import ChangePassword from "./components/ChangePassword";
import Storage from "./components/Storage";

function ProfileOverview() {
  const [text, setText] = useState("");
  const [isUploadModelOpen, setIsUploadModelOpen] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const { admin } = useAuth();
  const photo = useForm();

  const selectedPhoto = photo.watch("photo");

  useEffect(() => {
    if (selectedPhoto && selectedPhoto[0]) {
      setImageURL(URL.createObjectURL(selectedPhoto[0]));
    }
  }, [selectedPhoto]);

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

  async function onUploadSubmit(data) {
    const form = new FormData();
    form.append("photo", data.photo[0]);
    form.append("id", admin.id);
    const server = await axios.post("/api/admin/ads/add-ads-photo", form).catch(console.log);

    if (server && server.data && server.data.success) {
      setImageURL("");
      photo.setValue("photo", "");
      return setIsUploadModelOpen(false);
    }

    toast.error("Something went wrong!");
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-3">
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
      <div className="relative flex flex-col gap-4 rounded-[20px] bg-white bg-clip-border p-4 text-gray-900 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none ">
        <p className="mx-auto py-10 text-3xl">No image</p>
        <button
          onClick={() => setIsUploadModelOpen(true)}
          className="mt-auto rounded-md bg-brand-500 px-6 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          Add ads image
        </button>
        {isUploadModelOpen && (
          <div className="fixed inset-0 z-10 flex flex-col items-center justify-center sm-max:px-4">
            <div className="absolute inset-0 bg-gray-800 opacity-50 backdrop-blur-sm "></div>
            <div className="z-20 w-full rounded bg-white p-6 shadow-md  sm:max-w-xl lg:max-w-3xl">
              <h2 className="mb-4 text-center text-lg font-semibold">Upload photo</h2>
              <form onSubmit={photo.handleSubmit(onUploadSubmit)} className="flex w-full flex-col gap-4">
                <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-md bg-white">
                  {imageURL && (
                    <Fragment>
                      <img className="h-full w-full object-cover object-center" src={imageURL} />
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900/10 opacity-0 backdrop-blur-sm transition-all  hover:opacity-100">
                        <button
                          onClick={() => photo.formState.isSubmitting || photo.setValue("photo", "") || setImageURL("")}
                          type="button"
                          className="text-xl text-red-500 shadow-sm hover:text-red-400"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </Fragment>
                  )}
                </div>
                <Input
                  type="file"
                  label="Profile photo"
                  accept=".png, .jpg, .jpeg"
                  disabled={photo.formState.isSubmitting}
                  register={photo.register("photo", { required: "Photo is required" })}
                  error={photo.formState.errors["photo"]}
                />
                <div className="flex justify-between">
                  <Button disabled={photo.formState.isSubmitting} className="relative">
                    <span className={photo.formState.isSubmitting ? "opacity-0" : ""}>Submit</span>
                    {photo.formState.isSubmitting && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Spinner />
                      </div>
                    )}
                  </Button>
                  <Button
                    type="button"
                    className="bg-red-500 hover:bg-red-600 focus:ring-red-500/50"
                    onClick={() => setIsUploadModelOpen(false) || setImageURL("") || photo.setValue("photo", "")}
                    disabled={photo.formState.isSubmitting}
                  >
                    Close
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileOverview;
