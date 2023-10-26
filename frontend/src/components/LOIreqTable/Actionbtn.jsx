import axios from "axios";
import Dropdown from "components/dropdown";
import { useState } from "react";
import { AiOutlineShop } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function CardMenu(props) {
  const { transparent, data, prop, setreload, selectedOption, setShow } = props;
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleApproved = () => {
    let family = 1;

    const filterData = data.filter((data) => data.reference === prop?.reference);
    if (filterData.length > 1) {
      family = filterData.length;
    }

    Swal.fire({
      title: "Are you sure to Approved?",
      text: `Name: ${prop?.guest_name}, Passport Number: ${prop?.pasport_number}, Family: ${family}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#422AFB",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approved It!",
      scrollbarPadding: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          document.body.style.overflow = "hidden";
          setIsLoading(true);
          await axios.post("/api/loi/approved-python", {
            id: prop.id,
          });

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully approved",
            showConfirmButton: false,
            timer: 1500,
            scrollbarPadding: false,
          });

          setreload((old) => old + 1);
        } catch (err) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Something went wrong!",
            showConfirmButton: false,
            timer: 1500,
            scrollbarPadding: false,
          });

          console.log(err);
        } finally {
          document.body.style.overflow = "unset";
          setIsLoading(false);
        }
      }
    });
  };

  const handleCancel = () => {
    const filterData = data.filter((data) => data.reference === prop.reference);

    Swal.fire({
      title: "Are you sure to cancel?",
      text: `Name: ${prop?.guest_name}, Passport Number: ${prop?.pasport_number}, Family: ${filterData.length}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#422AFB",
      cancelButtonColor: "#d33",
      cancelButtonText: "close",
      confirmButtonText: "Yes, Cancel It!",
      scrollbarPadding: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await toast.promise(axios.post("/api/loi/cancel", { reference: prop?.reference }), {
            pending: "Please wait",
            error: "Something went wrong",
            success: "Cancel Successfully",
          });

          setreload((old) => old + 1);
        } catch (err) {
          console.log(err.message);
        }
      }
    });
  };

  function handleDelete(ref) {
    const filterData = data.filter((data) => data.reference === prop.reference);

    Swal.fire({
      title: "Are you sure to delete?",
      text: `Name: ${prop?.guest_name}, Reference: ${prop.reference}, Family: ${filterData.length}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#422AFB",
      cancelButtonColor: "#d33",
      cancelButtonText: "close",
      confirmButtonText: "Yes, Delete It!",
      scrollbarPadding: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await toast.promise(
            axios.post("/api/loi/delete-after-cancel", {
              reference: prop?.reference,
            }),
            {
              pending: "Please wait",
              error: "Something went wrong",
              success: "Delete Successfully",
            }
          );

          setreload((old) => old + 1);
        } catch (err) {
          console.log(err.message);
        }
      }
    });
  }

  async function handleResendEmail() {
    const filterData = data.filter((data) => data.reference === prop?.reference);

    Swal.fire({
      title: "Are you sure to resend email?",
      text: `Name: ${prop?.guest_name}, Passport Number: ${prop?.pasport_number}, Family: ${filterData.length}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#422AFB",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Send",
      scrollbarPadding: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setShowDetails(false);
        try {
          document.body.style.overflow = "hidden";
          setIsLoading(true);

          await axios.post("/api/loi/resend-email-python", {
            id: prop.id,
          });

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Email Sended Successfully!",
            showConfirmButton: false,
            timer: 1500,
            scrollbarPadding: false,
          });

          setreload((old) => old + 1);
        } catch (err) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Something went wrong!",
            showConfirmButton: false,
            timer: 1500,
            scrollbarPadding: false,
          });

          console.log(err);
        } finally {
          document.body.style.overflow = "unset";
          setIsLoading(false);
        }
      }
    });
  }

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[2px]">
          <div className="flex flex-col items-center gap-2 rounded-sm bg-white px-14 py-10 text-center text-gray-900 shadow">
            <Spinner className="text-center text-4xl" />
            <p className="text-xl">Please wait</p>
          </div>
        </div>
      )}
      {showDetails && (
        <div className="bg-black/10 xsm:m-6 fixed inset-0 z-40 flex items-start justify-center overflow-auto py-10 backdrop-blur-sm">
          <div className="dark:bg- relative mx-2 w-[720px] space-y-6 rounded-lg bg-white p-4 shadow-md dark:!bg-navy-900 sm:p-8">
            <h3 className="mb-3 border-b-2 border-brand-200 pb-3 text-center text-3xl">Details</h3>
            <div className="text-gray-950 grid grid-cols-1 text-lg sm:grid-cols-2">
              <div>
                <p>Name: {prop.guest_name}</p>
                <p>Country: {prop.country}</p>
                <p>Passport no: {prop.pasport_number}</p>
                <p>Purpose: {prop.purpose}</p>
                <p>Hotel name: {prop.hotel_name}</p>
                <p>Travel date: {prop.travel_date.split("-").reverse().join("-")}</p>
                <p>
                  Submission date: {new Date(prop.createdAt).toLocaleDateString()} -{" "}
                  {new Date(prop.createdAt).toLocaleTimeString()}{" "}
                </p>
                <p>
                  Last Updated: {new Date(prop.updateAt).toLocaleDateString()} -{" "}
                  {new Date(prop.updateAt).toLocaleTimeString()}{" "}
                </p>

                <p>
                  Status: <span className={prop.status === "cancel" && "text-red-500"}>{prop.status}</span>
                </p>
                <div className={"mt-2 border-t-gray-800 pt-2"}>
                  <a
                    href={`/download/admin/loi/${prop.id}`}
                    target="_blank"
                    className="rounded-xl bg-brand-200 px-3 py-2 text-gray-800 hover:shadow-md"
                    rel="noreferrer"
                  >
                    Download LOI Files{" "}
                  </a>
                  {prop.country === "Singapore" && (
                    <button className="ml-3 rounded-xl bg-brand-200 px-3 py-2 text-gray-800 hover:shadow-md">
                      Download Family Undertaking{" "}
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                {/* TODO: complete url for pasport_copy */}
                <a
                  className="text-blue-500 underline"
                  target="_blank"
                  href={`/api/admin/get-file/${prop.pasport_copy}`}
                >
                  Pasport_copy
                </a>
                <a className="text-blue-500 underline" target="_blank" href={`/api/admin/get-file/${prop.visa_copy}`}>
                  Visa_copy
                </a>
                <a className="text-blue-500 underline" target="_blank" href={`/api/admin/get-file/${prop.tiket_copy}`}>
                  Tiket_copy
                </a>
                <a className="text-blue-500 underline" target="_blank" href={`/api/admin/get-file/${prop.hotel_copy}`}>
                  Hotel_copy
                </a>
              </div>
              <div className="relative col-span-2 mt-2 w-full border-t-2 border-brand-200 pt-2">
                <div className="w-full py-2 text-center text-2xl font-bold text-brand-500">Tour Ternary</div>
                <div className="flex flex-col">
                  <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                      <div className="overflow-hidden">
                        <table className="min-w-full">
                          <thead className="border-b bg-gray-200">
                            <tr>
                              <th scope="col" className="px-6 py-2 text-left text-sm font-medium text-gray-900">
                                Date
                              </th>
                              <th scope="col" className="px-6 py-2 text-left text-sm font-medium text-gray-900">
                                From
                              </th>
                              <th scope="col" className="px-6 py-2 text-left text-sm font-medium text-gray-900">
                                To
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {JSON.parse(prop.iternary).map((e, i) => {
                              return (
                                <tr
                                  key={i}
                                  className="border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100"
                                >
                                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                    {e.date.split("-").reverse().join("-")}
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                                    {e.from}
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                                    {e.to}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`flex ${prop.status === "approved" ? "justify-between" : "justify-end"} `}>
              {prop.status === "approved" && (
                <button
                  onClick={handleResendEmail}
                  className="rounded bg-green-500 px-6 py-2 font-bold text-white shadow-md hover:bg-green-600"
                >
                  Resend Email
                </button>
              )}

              <button
                onClick={() => setShowDetails(false)}
                className="rounded bg-red-500 px-6 py-2 font-bold text-white shadow-md hover:bg-red-600"
              >
                close
              </button>
            </div>
          </div>
        </div>
      )}
      <Dropdown
        button={
          <button
            onClick={() => setOpen(!open)}
            open={open}
            className={`flex items-center text-xl hover:cursor-pointer ${
              transparent
                ? "bg-none text-white hover:bg-none active:bg-none"
                : "bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
            } linear justify-center rounded-lg font-bold transition duration-200`}
          >
            <BsThreeDots className="h-6 w-6" />
          </button>
        }
        animation={"origin-top-right transition-all duration-300 ease-in-out"}
        classNames={`top-0 right-0 left-auto w-max`}
        children={
          <div className="z-50 flex w-max flex-col gap-2 rounded-xl bg-white px-4 py-3 text-sm shadow-xl  shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            {
              prop.status === "pending" ? (
                <>
                  <p
                    onClick={handleApproved}
                    className="hover:text-black flex cursor-pointer items-center gap-1 text-gray-600  hover:text-gray-900 dark:hover:text-gray-200 "
                  >
                    <div className="flex aspect-square w-[20px] items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        className="w-full"
                      >
                        <path
                          fill="currentColor"
                          d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4L9.55 18Z"
                        />
                      </svg>
                    </div>
                    Approved
                  </p>

                  <p
                    onClick={handleCancel}
                    className="hover:text-black  flex cursor-pointer items-center gap-1 pt-1 text-gray-600  hover:text-gray-900 dark:hover:text-gray-200 "
                  >
                    <div className="flex aspect-square w-[20px] items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.3em"
                        height="1.3em"
                        viewBox="0 0 24 24"
                        className="w-full"
                      >
                        <path
                          fill="currentColor"
                          d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275L12 13.4Z"
                        ></path>
                      </svg>
                    </div>
                    Cancel
                  </p>
                </>
              ) : null
              /* ( <p
                onClick={handleDelete}
                className="flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:text-gray-900 dark:hover:text-gray-200 "
              >
                <div className="flex aspect-square w-[20px] items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    className="w-full"
                  >
                    <path
                      fill="currentColor"
                      d="M16 1.75V3h5.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75Zm-6.5 0V3h5V1.75a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25ZM4.997 6.178a.75.75 0 1 0-1.493.144L4.916 20.92a1.75 1.75 0 0 0 1.742 1.58h10.684a1.75 1.75 0 0 0 1.742-1.581l1.413-14.597a.75.75 0 0 0-1.494-.144l-1.412 14.596a.25.25 0 0 1-.249.226H6.658a.25.25 0 0 1-.249-.226L4.997 6.178Z"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M9.206 7.501a.75.75 0 0 1 .793.705l.5 8.5A.75.75 0 1 1 9 16.794l-.5-8.5a.75.75 0 0 1 .705-.793Zm6.293.793A.75.75 0 1 0 14 8.206l-.5 8.5a.75.75 0 0 0 1.498.088l.5-8.5Z"
                    ></path>
                  </svg>
                </div>
                Delete
              </p> ) */
            }

            <p
              onClick={() => setShowDetails(true)}
              className="flex cursor-pointer items-center gap-1 pt-1 text-gray-600  hover:text-gray-900 dark:hover:text-gray-200 "
            >
              <div className="flex aspect-square w-[20px] items-center justify-center">
                <AiOutlineShop className="w-full" />
              </div>
              Details
            </p>
          </div>
        }
      />
    </>
  );
}

export default CardMenu;

export function Spinner(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        opacity=".25"
      ></path>
      <path
        fill="currentColor"
        d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"
      >
        <animateTransform
          attributeName="transform"
          dur="0.75s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        ></animateTransform>
      </path>
    </svg>
  );
}
