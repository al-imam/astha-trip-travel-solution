import CreatableSelect from "react-select/creatable";
import NormalSelect from "react-select";

import { Controller } from "react-hook-form";
import { useEffect, useId, useState } from "react";
import { twMerge } from "tailwind-merge";
import { loadPassportNumbers } from "views/public/Entry/util";
import axios from "axios";
import { filteredArray } from "views/public/Entry/util";
import { removeDuplicated } from "views/public/Entry/util";

export function Select({ control, register, name, error, label, title = label, options, classNameLabel, ...rest }) {
  const id = useId();

  const identity = name + id.replaceAll(":", "");

  return (
    <div className="flex flex-col gap-1" id={identity}>
      <label
        htmlFor={id}
        title={title}
        className={twMerge("text-base font-medium text-gray-800 line-clamp-1", classNameLabel)}
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <CreatableSelect
            id={id}
            options={options}
            onMenuClose={() => document.querySelector(`#${identity} input:not([type="hidden"])`)?.blur()}
            name={name}
            menuPosition="fixed"
            styles={{
              control: (styles, state) => ({
                ...styles,
                margin: 0,
                padding: 2,
                backgroundColor: "rgb(248 249 250)",
                borderColor: error
                  ? "rgb(245 57 57 / 0.5)"
                  : state.isFocused
                  ? "rgb(59 130 246 / 0.5)"
                  : state.isDisabled
                  ? "rgb(233 227 255)"
                  : "rgb(192 184 254)",
                opacity: state.isDisabled ? "0.5" : 1,
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
              placeholder: (provided) => ({
                ...provided,
                whiteSpace: "nowrap",
                overflow: "hidden",
                fontSize: "0.875rem",
                color: "#adb5bd",
                letterSpacing: "0.3px",
                userSelect: "none",
              }),
              valueContainer: (styles) => ({
                ...styles,
                userSelect: "none",
                color: "rgb(27 37 89)",
                letterSpacing: "0.3px",
              }),
            }}
            {...register}
            {...field}
            {...rest}
          />
        )}
      />

      {error && <p className="text-sm text-red-500/90 line-clamp-1">{error.message}</p>}
    </div>
  );
}

export function SelectNotCreatable({
  control,
  register,
  name,
  error,
  label,
  title = label,
  options,
  classNameLabel,
  ...rest
}) {
  const id = useId();

  const identity = name + id.replaceAll(":", "");

  return (
    <div className="flex flex-col gap-1" id={identity}>
      <label
        htmlFor={id}
        title={title}
        className={twMerge("text-base font-medium text-gray-800 line-clamp-1", classNameLabel)}
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <NormalSelect
            id={id}
            options={options}
            name={name}
            menuPosition="fixed"
            onMenuClose={() => document.querySelector(`#${identity} input:not([type="hidden"])`)?.blur()}
            styles={{
              control: (styles, state) => ({
                ...styles,
                margin: 0,
                padding: 2,
                backgroundColor: "rgb(248 249 250)",
                borderColor: error
                  ? "rgb(245 57 57 / 0.5)"
                  : state.isFocused
                  ? "rgb(59 130 246 / 0.5)"
                  : state.isDisabled
                  ? "rgb(233 227 255)"
                  : "rgb(192 184 254)",
                borderWidth: 1.5,
                opacity: state.isDisabled ? "0.5" : 1,
                "&:hover": {
                  borderColor: "none",
                },
                boxShadow: state.isFocused
                  ? error
                    ? "0 0 0 1px rgb(245 57 57 / 0.5)"
                    : "0 0 0 1px rgb(59 130 246 / 0.5)"
                  : "none",
              }),
              placeholder: (styles) => ({
                ...styles,
                whiteSpace: "nowrap",
                fontSize: "0.875rem",
                overflow: "hidden",
                color: "#adb5bd",
                letterSpacing: "0.3px",
                userSelect: "none",
              }),
              valueContainer: (styles) => ({
                ...styles,
                userSelect: "none",
                color: "rgb(27 37 89)",
              }),
            }}
            {...register}
            {...field}
            {...rest}
          />
        )}
      />

      {error && <p className="text-sm text-red-500/90 line-clamp-1">{error.message}</p>}
    </div>
  );
}

export function AsyncSelect({ control, register, name, error, label, title = label, classNameLabel, ...rest }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const id = useId();

  useEffect(() => {
    (async () => {
      const serverRes = await axios.get("/api/visa-form/passport-numbers").catch(console.log);
      setLoading(false);

      if (serverRes && Array.isArray(serverRes.data))
        setOptions(
          removeDuplicated(serverRes.data, "passport-number").map((number) => ({
            label: number["passport-number"],
            value: number["passport-number"],
          }))
        );
    })();
  }, []);

  const identity = name + id.replaceAll(":", "");

  return (
    <div className="flex flex-col gap-1" id={identity}>
      <label
        htmlFor={id}
        title={title}
        className={twMerge("text-base font-medium text-gray-800 line-clamp-1", classNameLabel)}
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <CreatableSelect
            id={id}
            options={options}
            isLoading={loading}
            name={name}
            menuPosition="fixed"
            onMenuClose={() => document.querySelector(`#${identity} input:not([type="hidden"])`)?.blur()}
            styles={{
              control: (styles, state) => ({
                ...styles,
                margin: 0,
                padding: 2,
                backgroundColor: "rgb(248 249 250)",
                borderColor: error
                  ? "rgb(245 57 57 / 0.5)"
                  : state.isFocused
                  ? "rgb(59 130 246 / 0.5)"
                  : state.isDisabled
                  ? "rgb(233 227 255)"
                  : "rgb(192 184 254)",
                borderWidth: 1.5,
                opacity: state.isDisabled ? "0.5" : 1,
                "&:hover": {
                  borderColor: "none",
                },
                boxShadow: state.isFocused
                  ? error
                    ? "0 0 0 1px rgb(245 57 57 / 0.5)"
                    : "0 0 0 1px rgb(59 130 246 / 0.5)"
                  : "none",
              }),
              placeholder: (styles) => ({
                ...styles,
                whiteSpace: "nowrap",
                fontSize: "0.875rem",
                overflow: "hidden",
                color: "#adb5bd",
                letterSpacing: "0.3px",
                userSelect: "none",
              }),
              valueContainer: (styles) => ({
                ...styles,
                userSelect: "none",
                color: "rgb(27 37 89)",
              }),
            }}
            {...register}
            {...field}
            {...rest}
          />
        )}
      />

      {error && <p className="text-sm text-red-500/90 line-clamp-1">{error.message}</p>}
    </div>
  );
}
