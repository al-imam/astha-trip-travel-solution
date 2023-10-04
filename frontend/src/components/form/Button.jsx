import { twMerge } from "tailwind-merge";

export function Button({ children, className, ...rest }) {
  return (
    <button
      className={twMerge(
        "inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-blue-500",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
