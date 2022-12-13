import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type, id"> {
  name: string;
  label: string;
  autoComplete?: string;
  inputClassName?: string;
  labelclassName?: string;
  register: UseFormRegister<any>;
  errorMessage?: string;
}

export const Input = ({
  name,
  label,
  autoComplete = undefined,
  labelclassName = "block text-sm font-medium text-gray-700",
  inputClassName = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
  register,
  errorMessage,
  ...rest
}: InputProps) => {
  return (
    <>
      <label htmlFor={name} className={labelclassName}>
        {label}
      </label>
      <input
        type="text"
        id={name}
        autoComplete={autoComplete}
        className={inputClassName}
        {...rest}
        {...register(name)}
      />
      {errorMessage && (
        <span
          role="alert"
          className="pl-[1px] text-red-500 text-sm font-medium"
        >
          {errorMessage}
        </span>
      )}
    </>
  );
};
