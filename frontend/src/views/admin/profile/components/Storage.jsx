import axios from "axios";
import Card from "components/card";
import { useEffect, useState } from "react";
import { BsCloudCheck } from "react-icons/bs";
import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin();

const Storage = () => {
  const [storageInfo, setStorageInfo] = useState({});

  function clearCache() {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to recover caches!",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.post("/api/admin/clear-cache");
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your file has been deleted.",
              showConfirmButton: false,
              timer: 1500,
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
  }

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("astha-storage-info"));

    if (local && local.expire > Date.now()) {
      return setStorageInfo(local.data);
    }

    (async () => {
      try {
        const { data } = await axios.get("/api/admin/storage-info");
        localStorage.setItem(
          "astha-storage-info",
          JSON.stringify({
            expire: Date.now() + 24 * 60 * 60 * 1000,
            data,
          })
        );
        setStorageInfo(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Card extra={"w-full h-full p-4 gap-4"}>
      <div className="mb-auto flex flex-col items-center justify-center">
        <div className="mt-2 flex items-center justify-center rounded-full bg-lightPrimary p-[26px] text-5xl font-bold text-brand-500 dark:!bg-navy-700 dark:text-white">
          <BsCloudCheck />
        </div>
        <h4 className="mb-px mt-3 text-2xl font-bold text-navy-700 dark:text-white">Your storage</h4>
        <p className="px-5 text-center text-base font-normal text-gray-600 md:!px-0 xl:!px-8">
          Supervise your drive space in the easiest way
        </p>
      </div>

      <button
        onClick={clearCache}
        className="mb-auto rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
      >
        Clear Cache
      </button>

      <div className="flex flex-col">
        <div className="flex justify-between">
          <p className="text-sm font-medium text-gray-600">{storageInfo.usedStorageGB ?? 0} GB</p>
          <p className="text-sm font-medium text-gray-600">{storageInfo.totalStorageGB ?? 0} GB</p>
        </div>
        <div className="mt-2 flex h-3 w-full items-center rounded-full bg-lightPrimary dark:!bg-navy-700">
          <span
            style={{ width: `${storageInfo.usedStoragePercentage ?? 0}%` }}
            className="h-full rounded-full bg-brand-500 dark:!bg-white"
          />
        </div>
      </div>
    </Card>
  );
};

export default Storage;
