import CreatableSelect from "react-select/creatable";
import { Controller } from "react-hook-form";
import { useId } from "react";

export function Select({ control, name, error, label, options, rule, ...rest }) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="block text-base font-medium text-gray-900">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={[rule]}
        render={({ field }) => (
          <CreatableSelect
            id={id}
            options={options}
            name={name}
            styles={{
              control: (styles, state) => ({
                ...styles,
                margin: 0,
                padding: 2,
                borderColor: error ? "rgb(245 57 57 / 0.5)" : state.isFocused ? "rgb(59 130 246 / 0.5)" : "#C0B8FE",
                borderWidth: 1.5,
                "&:hover": {
                  borderColor: "none",
                },
                boxShadow: state.isFocused
                  ? error
                    ? "0 0 0 1px rgb(245 57 57 / 0.5)"
                    : "0 0 0 1px rgb(59 130 246 / 0.5)"
                  : "none",
              }),
            }}
            {...field}
            {...rest}
          />
        )}
      />

      {error && <p className="text-red-500/90">{error.message}</p>}
    </div>
  );
}
