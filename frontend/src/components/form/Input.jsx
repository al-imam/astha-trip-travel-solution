import { useId } from "react";

export function Input({ register, error, label, ...rest }) {
  const id = useId();
  return (
    <div className="space-y-1 text-sm">
      <label htmlFor={id} className="block text-base font-medium text-gray-900">
        {label}
      </label>
      <input
        {...register}
        id={id}
        className={`block w-full rounded border-none bg-gray-50 p-2.5 text-gray-900 outline-none ring-1 focus:ring-2 ${
          error ? "ring-red-500/50  focus:ring-red-500/50" : "ring-brand-100 focus:ring-blue-500/50"
        }`}
        placeholder={label}
        {...rest}
      />
      {error && <p className="text-red-500/90">{error.message}</p>}
    </div>
  );
}
