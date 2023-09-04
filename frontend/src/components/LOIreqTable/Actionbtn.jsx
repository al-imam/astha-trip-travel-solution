import axios from "axios";
import Dropdown from "components/dropdown";
import React, { useState } from "react";
import { AiOutlineShop } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function CardMenu(props) {
  const { transparent, data, prop, setreload, selectedOption, setShow } = props;
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleApproved = () => {
    let family = 1;

    const filterData = data.filter(
      (data) => data.reference === prop?.reference
    );
    if (filterData.length > 1) {
      family = filterData.length;
    }

    Swal.fire({
      title: "Are you sure to Approved?",
      text: `Name: ${prop?.guest_name}, Passport Number: ${prop?.pasport_number}, Family: ${family}`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#422AFB",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approved It!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await toast.promise(
            axios.post("/api/loi/approved-python", {
              id: prop.id,
            }),
            {
              pending: "Please wait",
              error: "Something went wrong",
              success: "Approved Successfully",
            }
          );

          setreload((old) => old + 1);
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const handleCancel = () => {
    let family = 1;

    const filterData = data.filter(
      (data) => data.reference === prop?.reference
    );
    if (filterData.length > 1) {
      family = filterData.length;
    }

    Swal.fire({
      title: "Are you sure to cancel?",
      text: `Name: ${prop?.guest_name}, Passport Number: ${
        prop?.pasport_number
      }, Family: ${"family"}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#422AFB",
      cancelButtonColor: "#d33",
      cancelButtonText: "close",
      confirmButtonText: "Yes, Cancel It!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await toast.promise(
            axios.post("/api/loi/cancel", { reference: prop?.reference }),
            {
              pending: "Please wait",
              error: "Something went wrong",
              success: "Cancel Successfully",
            }
          );
          const filter = data.filter((d) => d.status === selectedOption);
          setShow(filter);
          setreload((old) => old + 1);
        } catch (err) {
          console.log(err.message);
        }
      }
    });
  };

  return (
    <>
      {showDetails && (
        <div className="bg-black/10 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="dark:bg- relative mx-6 w-[720px] space-y-6 rounded-lg bg-white p-8 shadow-md dark:!bg-navy-900 md:mx-0">
            <h3 className="text-center text-3xl">Details</h3>
            <div className="text-gray-950  grid grid-cols-1 text-lg sm:grid-cols-2">
              <div>
                <p>Name: {prop.guest_name}</p>
                <p>Country: {prop.country}</p>
                <p>Pasport no: {prop.pasport_number}</p>
                <p>Hotel name: {prop.hotel_name}</p>
                <p>Travel date: {prop.travel_date}</p>
                <p>
                  Status:{" "}
                  <span className={prop.status === "cancel" && "text-red-500"}>
                    {prop.status}
                  </span>
                </p>
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
                <a
                  className="text-blue-500 underline"
                  target="_blank"
                  href={`/api/admin/get-file/${prop.visa_copy}`}
                >
                  Visa_copy
                </a>
                <a
                  className="text-blue-500 underline"
                  target="_blank"
                  href={`/api/admin/get-file/${prop.tiket_copy}`}
                >
                  Tiket_copy
                </a>
                <a
                  className="text-blue-500 underline"
                  target="_blank"
                  href={`/api/admin/get-file/${prop.hotel_copy}`}
                >
                  Hotel_copy
                </a>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDetails(false)}
                className="rounded px-6 py-1 text-lg ring ring-brandLinear"
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
            {prop.status === "pending" && (
              <>
                <p
                  onClick={handleApproved}
                  className="hover:text-black flex cursor-pointer items-center gap-1 text-gray-600 hover:font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4L9.55 18Z"
                    />
                  </svg>
                  Approved
                </p>

                <p
                  onClick={handleCancel}
                  className="hover:text-black  flex cursor-pointer items-center gap-1 pt-1 text-gray-600 hover:font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M1 21h22L12 2L1 21zm3.47-2L12 5.99L19.53 19H4.47zM11 16h2v2h-2zm0-6h2v4h-2z"
                    />
                  </svg>
                  Cancel
                </p>
              </>
            )}
            <p
              onClick={() => setShowDetails(true)}
              className="hover:text-black flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium"
            >
              <span>
                <AiOutlineShop />
              </span>
              Details
            </p>
          </div>
        }
      />
    </>
  );
}

export default CardMenu;
