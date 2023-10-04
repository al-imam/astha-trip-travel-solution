import { twMerge } from "tailwind-merge";
import { RadioNoLabel } from "./Radio";

export function Group({
  legend,
  title = legend,
  options,
  error,
  classNameContainer,
  classNameLegend,
  className,
  register,
  checked,
  children,
  isOpen = false,
  ...rest
}) {
  return (
    <div className={twMerge("flex flex-col gap-1", classNameContainer)}>
      <fieldset
        className={twMerge(
          "flex flex-col gap-4 rounded border border-brand-100 bg-gray-50 px-4 pb-2.5 text-gray-800 [--gray-900:rgb(27_37_89)] ",
          isOpen && "border-gray-300/90 bg-white pb-4",
          error && "border-red-500/50 focus:border-red-500/50"
        )}
      >
        <legend
          title={title}
          className={twMerge("w-auto text-base font-medium leading-5 text-gray-800", classNameLegend)}
        >
          {legend}
        </legend>

        <div className="mt-1 flex gap-4">
          <RadioNoLabel options={options} checked={checked} register={register} {...rest} />
        </div>

        {isOpen && <div className={twMerge("-mt-2", className)}>{children}</div>}
      </fieldset>
      {error && <p className="text-sm text-red-500/90 line-clamp-1">{error.message}</p>}
    </div>
  );
}

export function Join({ legend, title = legend, classNameContainer, classNameLegend, className, children }) {
  return (
    <div className={twMerge("flex flex-col gap-1", classNameContainer)}>
      <fieldset
        className={twMerge(
          "flex flex-col gap-4 rounded border border-gray-300/90 bg-white px-4 py-4 text-gray-800 [--gray-900:rgb(27_37_89)] "
        )}
      >
        <legend
          title={title}
          className={twMerge("w-auto text-base font-medium leading-5 text-gray-800", classNameLegend)}
        >
          {legend}
        </legend>

        <div className={twMerge("-mt-2", className)}>{children}</div>
      </fieldset>
    </div>
  );
}
