import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type, id"> {
  name: string;
  label: string;
  spacePx?: number;
  autoComplete?: string;
  inputClassName?: string;
  labelclassName?: string;
  containerClassName?: string;
  register: UseFormRegister<any>;
  errorMessage?: string;
}

export const Checkbox = ({
  name,
  label,
  autoComplete = undefined,
  labelclassName = "ml-2 text-sm font-medium text-gray-900",
  inputClassName = "h-4 w-4 border-gray-300 rounded text-indigo-600 focus: sm:text-sm focus:border-indigo-500 focus:ring-indigo-500",
  containerClassName,
  register,
  errorMessage,
  ...rest
}: CheckboxProps) => {
  return (
    <>
      <div className={`flex items-center ${containerClassName}`}>
        <input
          type="checkbox"
          id={name}
          {...register(name)}
          className={inputClassName}
          {...rest}
        />
        <label htmlFor={name} className={labelclassName}>
          {label}
        </label>
      </div>
      <span role="alert" className="text-red-500 text-sm font-medium">
        {errorMessage}
      </span>
    </>
  );
};
