import { SelectHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> {
  name: string;
  label: string;
  options: Array<string>;
  autoComplete?: string;
  inputClassName?: string;
  labelclassName?: string;
  register: UseFormRegister<any>;
  errorMessage?: string;
}

export const Select = ({
  name,
  label,
  options,
  autoComplete = undefined,
  labelclassName = "block text-sm font-medium text-gray-700",
  inputClassName = "mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm",
  register,
  errorMessage,
  ...rest
}: SelectProps) => {
  return (
    <>
      <label htmlFor={name} className={labelclassName}>
        {label}
      </label>
      <select
        id={name}
        autoComplete={autoComplete}
        className={inputClassName}
        {...register(name)}
        {...rest}
      >
        {options.map((value, i) => (
          <option key={value + i} value={value}>
            {value}
          </option>
        ))}
      </select>
      <span role="alert" className="text-red-500 text-sm font-medium">
        {errorMessage}
      </span>
    </>
  );
};
