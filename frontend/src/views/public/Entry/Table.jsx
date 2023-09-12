import { twMerge } from "tailwind-merge";

export function Table({ head = [], body = [] }) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full  text-left text-sm text-gray-800">
        <thead className="bg-gray-50 text-sm uppercase text-gray-800 ">
          <tr className="">
            {head.map((value) => (
              <th
                className={twMerge("whitespace-nowrap py-4 pr-4 first:pl-4", value === "Hotel name" && "md-max:hidden")}
              >
                {value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((value) => (
            <tr className="border-b bg-gray-50 odd:bg-white">
              <td className="whitespace-nowrap py-4 pr-4 font-medium text-gray-800 first:pl-4">{value["name"]}</td>
              <td className="whitespace-nowrap py-4 pr-4 first:pl-4">{value["passport-number"]}</td>
              <td className="whitespace-nowrap py-4 pr-4 first:pl-4 ">{value["travel-date"]}</td>
              <td className="whitespace-nowrap py-4 pr-4 first:pl-4 md-max:hidden">{value["hotel-name"]}</td>
              <td className="whitespace-nowrap py-4 pr-4 first:pl-4 ">{<value.Action />}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
