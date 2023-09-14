import { useId } from "react";
import { twMerge } from "tailwind-merge";
import style from "./style.module.css";

export function Radio({ label, title = label, options, error, classNameLabel, register, checked, ...rest }) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1 ">
      <label
        title={title}
        htmlFor={id}
        className={twMerge("text-base font-medium text-gray-800 line-clamp-1", classNameLabel)}
      >
        {label}
      </label>

      <div
        className={twMerge(
          "flex gap-4 rounded border-none bg-gray-50 p-2 text-gray-800 ring-1 ring-brand-100 [--gray-900:rgb(27_37_89)]",
          error && "ring-red-500/50 focus:ring-red-500/50"
        )}
      >
        {options.map((v) => (
          <div className={twMerge(style.container, "[--dark:rgb(59,130,246)] ")}>
            <input
              value={v}
              type="radio"
              id={id + v.replace(/\s+/g, "")}
              className={style.radio}
              defaultChecked={v === checked}
              {...register}
              {...rest}
            />
            <label htmlFor={id + v.replace(/\s+/g, "")} className={style.label}>
              {v}
            </label>
          </div>
        ))}
      </div>
      {error && <p className="text-sm text-red-500/90 line-clamp-1">{error.message}</p>}
    </div>
  );
}
