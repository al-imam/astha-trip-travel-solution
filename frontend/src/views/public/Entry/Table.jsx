import React from "react";
import { twMerge } from "tailwind-merge";

export function Table({ head = [], body = [], hide = [] }) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full  text-left text-sm text-gray-800">
        <thead className="bg-gray-50 text-sm uppercase text-gray-800 ">
          <tr className="">
            {head.map((value, index) => (
              <th
                key={value}
                className={twMerge("whitespace-nowrap py-4 pr-4 first:pl-4", hide.includes(index) && "md-max:hidden")}
              >
                {value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((value) => (
            <tr key={value[1]} className="border-b bg-gray-50 text-gray-800 odd:bg-white">
              {value.map((R, index) => {
                if (React.isValidElement(value))
                  return (
                    <td
                      key={index}
                      className={twMerge(
                        "whitespace-nowrap py-4 pr-4 first:pl-4",
                        index === 0 && "font-medium",
                        hide.includes(index) && "md-max:hidden"
                      )}
                    >
                      <R />
                    </td>
                  );
                return (
                  <td
                    key={R}
                    className={twMerge(
                      "whitespace-nowrap py-4 pr-4 first:pl-4",
                      index === 0 && "font-medium",
                      hide.includes(index) && "md-max:hidden"
                    )}
                  >
                    {R}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
