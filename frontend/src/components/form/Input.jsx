import { useId } from "react";
import { twMerge } from "tailwind-merge";

export function Input({
  register,
  error,
  label,
  placeholder = label.replace(/ \*$/, ""),
  className,
  classNameLabel,
  type = "text",
  ...rest
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1">
      <label
        title={label}
        htmlFor={id}
        className={twMerge("text-base font-medium text-gray-800 sm:line-clamp-1", classNameLabel)}
      >
        {label}
      </label>
      <input
        {...register}
        id={id}
        className={twMerge(
          "block w-full rounded border-none bg-gray-50 p-2.5 text-sm text-gray-900 outline-none ring-1 ring-brand-100 focus:ring-2  focus:ring-blue-500/50 disabled:opacity-50 disabled:ring-brand-50",
          error && "ring-red-500/50 focus:ring-red-500/50",
          className
        )}
        placeholder={placeholder}
        type={type}
        {...rest}
      />
      {error && <p className="text-sm text-red-500/90 line-clamp-1">{error.message}</p>}
    </div>
  );
}
