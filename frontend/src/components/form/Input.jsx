import { useId } from "react";
import { twMerge } from "tailwind-merge";

export function Input({
  register,
  error,
  label,
  placeholder = label,
  className,
  classNameLabel,
  type = "text",
  ...rest
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1 text-sm">
      <label htmlFor={id} className={twMerge("text-base font-medium text-gray-800 line-clamp-1", classNameLabel)}>
        {label}
      </label>
      <input
        {...register}
        id={id}
        className={twMerge(
          "block w-full rounded border-none bg-gray-50 p-2.5 text-gray-900 outline-none ring-1 ring-brand-100  focus:ring-2 focus:ring-blue-500/50",
          error && "ring-red-500/50 focus:ring-red-500/50",
          className
        )}
        placeholder={placeholder}
        type={type}
        {...rest}
      />
      {error && <p className="text-red-500/90">{error.message}</p>}
    </div>
  );
}
