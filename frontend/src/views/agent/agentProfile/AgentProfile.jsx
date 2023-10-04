import axios from "axios";
import { Button } from "components/form/Button";
import { Input } from "components/form/Input";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { DeleteIcon } from "views/public/Entry/MainEntry";
import { Spinner } from "views/public/Entry/Spinner";

const AgentProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPassOpen, setIsPassOpen] = useState(false);
  const [agent, setAgent] = useState({});
  const [invoices, setInvoices] = useState([]);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [pStatus, setPstatus] = useState();

  const { register, handleSubmit, reset } = useForm();
  const { register: passReg, handleSubmit: passHS, reset: passRe, getValues } = useForm();
  const photo = useForm();

  const selectedPhoto = photo.watch("photo");

  useEffect(() => {
    if (selectedPhoto && selectedPhoto[0]) {
      setImageURL(URL.createObjectURL(selectedPhoto[0]));
    }
  }, [selectedPhoto]);

  useEffect(() => {
    const getAuth = async () => {
      try {
        const { data: agentRes } = await axios.get("/api/agent/info");
        const { data: status } = await axios.get("/api/payment/status");
        setPstatus(status);
        setAgent(agentRes);
        const { data: invoiceRes } = await axios.get(`/api/agent/balance-invoice/${agentRes.id}`);
        setInvoices(invoiceRes);
      } catch (e) {
        console.log(e);
      }
    };

    getAuth();
  }, []);

  async function onSubmit(data) {
    data.amount = parseFloat(data.amount);
    try {
      await toast.promise(axios.post("/api/agent/add-balance", Object.assign(data, { agent_id: agent.id })), {
        pending: "Please wait loading..",
        success: "Balance request sent",
        error: "Something went wrong, try again!",
      });

      reset();
      setIsOpen(false);
    } catch (e) {
      console.log(e);
    }
  }

  function onInvalid(error) {
    toast.error("Enter valid information!");
  }

  async function onUploadSubmit(data) {
    const form = new FormData();
    form.append("photo", data.photo[0]);
    form.append("id", agent.id);
    const server = await axios.post("/api/agent/upload-profile-photo", form).catch(console.log);

    if (server && server.data && server.data.success) {
      setImageURL("");
      photo.setValue("photo", "");
      return setIsUploaderOpen(false);
    }

    toast.error("Something went wrong!");
  }

  async function onPassSubmit(data) {
    try {
      await toast.promise(axios.post("/api/agent/change-password", data), {
        pending: "Please wait loading..",
        success: "Password change successfully!",
        error: "Something went wrong, try again!",
      });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }

  async function onPassInvalid(error) {
    if (error.password && error.password.type === "validate") {
      return toast.error(error.password.message);
    }

    toast.error("Enter valid information!");
  }

  return (
    <>
      <div className="container mx-auto flex flex-col gap-5 md:flex-row">
        <div>
          <div className=" flex w-full items-center justify-center md:w-[300px]">
            <div className="relative overflow-hidden rounded-full">
              <img
                className="h-40 w-40 object-cover object-center"
                src={`/api/agent/avatar/${agent.photo}`}
                onError={(evt) => (evt.target.src = "/logoastha.png")}
                alt="img"
              />
              <button
                onClick={() => setIsUploaderOpen(true)}
                className="absolute -inset-1 rounded-full bg-gray-900/50 text-base font-medium text-white opacity-0  backdrop-blur-sm transition-opacity hover:opacity-100"
              >
                Upload photo
              </button>
            </div>
          </div>
          <div className="flex w-full flex-col justify-center lg:w-[500px]">
            <div className="flex flex-col items-center gap-y-[.5] md:items-start">
              <p className=" mb-2 rounded-lg py-1 text-2xl font-bold text-gray-800">{agent.name ?? ""}</p>

              <p className="rounded-lg font-bold text-gray-800">{agent.email ?? ""}</p>
              <p className=" rounded-lg font-bold text-gray-800">{agent.phone ?? ""}</p>
            </div>
            <div className="mt-5 w-full border-t-2 border-brand-300/30 p-3 pb-10">
              <h1 className="flex w-full items-center justify-start gap-3 font-poppins font-semibold text-brand-900">
                {" "}
                <span className="text-2xl text-brand-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 4.5A.5.5 0 0 1 .5 4V1A.5.5 0 0 1 1 .5h12a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5"></path>
                      <rect width="7" height="8" x="3.5" y="3" rx=".5"></rect>
                      <circle cx="7" cy="7" r="1.5"></circle>
                      <path d="M3.5 13.5h7"></path>
                    </g>
                  </svg>
                </span>
                Payment Status
              </h1>
              <dir className="relative grid w-full grid-cols-3 pl-0">
                <div className="w-full">
                  <h1 className="flex items-center text-lg text-green-600">
                    <span className="text-2xl text-green-700">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeWidth="32"
                          d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z"
                        ></path>
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="32"
                          d="M368 192L256.13 320l-47.95-48m-16.23 48L144 272m161.71-80l-51.55 59"
                        ></path>
                      </svg>
                    </span>
                    Paid
                  </h1>
                  <p className="flex items-center pl-2 text-xl">{pStatus?.totalPaid || "00"}</p>
                </div>
                <div className="w-full">
                  <h1 className="flex items-center text-lg text-red-600">
                    <span className="text-2xl text-red-700">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <g fill="none">
                          <path
                            d="M17.75 3A3.25 3.25 0 0 1 21 6.25v5.772a6.471 6.471 0 0 0-1.5-.709V8.5h-15v9.25c0 .966.784 1.75 1.75 1.75h5.063c.173.534.412 1.037.709 1.5H6.25A3.25 3.25 0 0 1 3 17.75V6.25A3.25 3.25 0 0 1 6.25 3h11.5zm0 1.5H6.25A1.75 1.75 0 0 0 4.5 6.25V7h15v-.75a1.75 1.75 0 0 0-1.75-1.75z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M23 17.5a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0zM17.5 14a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 1 0v-4a.5.5 0 0 0-.5-.5zm0 7.125a.625.625 0 1 0 0-1.25a.625.625 0 0 0 0 1.25z"
                            fill="currentColor"
                          ></path>
                        </g>
                      </svg>
                    </span>
                    Due
                  </h1>
                  <p className="flex items-center pl-2 text-xl">{pStatus?.duePayment || "00"}</p>
                </div>

                <div className="w-full">
                  <h1 className="flex items-center text-lg text-red-600">
                    <span className="text-2xl text-red-700">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12 10h5V8h-5v2Zm0 6h5v-2h-5v2Zm-3-5q.825 0 1.413-.588T11 9q0-.825-.588-1.413T9 7q-.825 0-1.413.588T7 9q0 .825.588 1.413T9 11Zm0 6q.825 0 1.413-.588T11 15q0-.825-.588-1.413T9 13q-.825 0-1.413.588T7 15q0 .825.588 1.413T9 17Zm-4 4q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21H5Zm0-2h14V5H5v14ZM5 5v14V5Z"
                        ></path>
                      </svg>
                    </span>
                    Total
                  </h1>
                  <p className="flex items-center pl-2 text-xl">{pStatus?.numberOfRequest || "00"}</p>
                </div>
              </dir>
            </div>
          </div>
        </div>
        <div className="my-10 w-full">
          <img className="h-[200px] w-full object-contain" src="/asthatripbaner.jpg" alt="img" />
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            setIsOpen(true);
            setIsPassOpen(false);
          }}
          className="inline-block rounded-lg border-2 border-brand-900/30 bg-white/10  p-3 text-xl font-bold text-brand-600 shadow-xl hover:scale-105 dark:border-brand-200 dark:text-brand-100"
        >
          Add Balance
        </button>
        <button
          onClick={() => {
            setIsPassOpen(true);
            setIsOpen(false);
          }}
          className="ml-4 inline-block rounded-lg border-2 border-brand-900/30 bg-white/10  p-3 text-xl font-bold text-brand-600 shadow-xl hover:scale-105 dark:border-brand-200 dark:text-brand-100"
        >
          Change Password
        </button>
      </div>

      {isUploaderOpen && (
        <div className="fixed inset-0 z-10 flex flex-col items-center justify-center sm-max:px-4">
          <div className="absolute inset-0 bg-gray-800 opacity-50 backdrop-blur-sm "></div>
          <div className="z-20 w-full rounded bg-white p-6 shadow-md  sm:max-w-xl lg:max-w-3xl">
            <h2 className="mb-4 text-center text-lg font-semibold">Upload photo</h2>
            <form onSubmit={photo.handleSubmit(onUploadSubmit)} className="flex w-full flex-col gap-4">
              <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-md  bg-gradient-to-b from-gray-700 to-gray-600">
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
                  onClick={() => setIsUploaderOpen(false)}
                  disabled={photo.formState.isSubmitting}
                >
                  Close
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-10 flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
          <div className="z-20 w-[80vw] rounded bg-white p-6 shadow-md lg:w-[35vw]">
            <div className="relative">
              <h2 className="mb-4 text-lg font-semibold">Add Amount</h2>
              <form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate>
                <div className="mb-3 ">
                  <label className="ml-1.5 text-sm font-medium text-navy-700 dark:text-white">Amount*</label>
                  <input
                    type="number"
                    placeholder="Enter your amount"
                    className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-[#E8F0FE] bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white"
                    {...register("amount", { required: true })}
                  />
                </div>
                <div className="mb-3 ">
                  <label className="ml-1.5 text-sm font-medium text-navy-700 dark:text-white">Transition ID*</label>
                  <input
                    type="text"
                    placeholder="Enter your transition ID"
                    className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-[#E8F0FE] bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white"
                    {...register("transition_id", { required: true })}
                  />
                </div>
                <div className="mb-3 ">
                  <label className="ml-1.5 text-sm font-medium text-navy-700 dark:text-white">Message</label>
                  <textarea
                    type="text"
                    placeholder="Enter your Message Here..."
                    className="mt-2 flex h-24 w-full items-center justify-center rounded-xl border border-gray-200 bg-[#E8F0FE] bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white"
                    {...register("message")}
                  />
                </div>
                <button
                  type="submit"
                  className="inline-block rounded-lg border-2 border-brand-900/30 bg-white/10  p-3 text-xl font-bold text-brand-600 shadow-xl hover:scale-105 dark:border-brand-200 dark:text-brand-100"
                >
                  Submit
                </button>
              </form>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute bottom-2 right-2 mt-4 rounded bg-gray-300 py-2 px-4 font-semibold text-gray-800 hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isPassOpen && (
        <div className="fixed inset-0 z-10 flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
          <div className="z-20 w-[80vw] rounded bg-white p-6 shadow-md lg:w-[35vw]">
            <div className="relative">
              <h2 className="mb-4 text-lg font-semibold">Change Password</h2>
              <form onSubmit={passHS(onPassSubmit, onPassInvalid)} noValidate>
                <div className="mb-3 ">
                  <label className="ml-1.5 text-sm font-medium text-navy-700 dark:text-white">Current Password*</label>
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-[#E8F0FE] bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white"
                    {...passReg("current-password", { required: true })}
                  />
                </div>
                <div className="mb-3 ">
                  <label className="ml-1.5 text-sm font-medium text-navy-700 dark:text-white">New Password*</label>
                  <input
                    type="password"
                    placeholder="New Password"
                    className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-[#E8F0FE] bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white"
                    {...passReg("new-password", { required: true })}
                  />
                </div>

                <div className="mb-3 ">
                  <label className="ml-1.5 text-sm font-medium text-navy-700 dark:text-white">Confirm Password*</label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-[#E8F0FE] bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white"
                    {...passReg("password", {
                      required: true,
                      validate: () => {
                        if (getValues("new-password") !== getValues("password")) {
                          return "password and confirm password not match!";
                        }
                      },
                    })}
                  />
                </div>

                <button
                  type="submit"
                  className="inline-block rounded-lg border-2 border-brand-900/30 bg-white/10  p-3 text-xl font-bold text-brand-600 shadow-xl hover:scale-105 dark:border-brand-200 dark:text-brand-100"
                >
                  Submit
                </button>
              </form>
              <button
                onClick={() => setIsPassOpen(false)}
                className="absolute bottom-2 right-2 mt-4 rounded bg-gray-300 py-2 px-4 font-semibold text-gray-800 hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-5 overflow-x-auto bg-white">
        <div className="!z-5 relative flex h-full w-full flex-col rounded-[20px] bg-white bg-clip-border px-6 py-5 pb-6 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none sm:overflow-x-auto">
          <table className="border-collapse">
            <thead className="rounded-xl text-[#A3AED0]">
              <tr className="rounded-md">
                <th className="py-3 px-4 text-left font-semibold">Invoice Number</th>
                <th className="py-3 px-4 text-left font-semibold">Amount</th>
                <th className="py-3 px-4 text-left font-semibold">Date</th>
                <th className="py-3 px-4 text-left font-semibold">Status</th>
                {/* <th className="py-3 px-4 text-left font-semibold">Action</th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 ">
              {invoices.map((invoice) => (
                <tr className="even:bg-[#F7F4FE] hover:bg-[#F7F4FE]">
                  <td className="py-3 px-4">{invoice.id}</td>
                  <td className="py-3 px-4">{invoice.amount}</td>
                  <td className="py-3 px-4">{new Date(invoice.createdAt).toLocaleString().replaceAll("/", "-")}</td>
                  <td className="py-3 px-4">{invoice.status === "submitted" ? "approved" : invoice.status}</td>
                  {/* <td className="py-3 px-4">
                    <button className="text-blue-500 hover:underline">
                      Details
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AgentProfile;
