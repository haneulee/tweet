import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps {
    label?: string;
    name?: string;
    register: UseFormRegisterReturn;
    [key: string]: any;
}

export default function TextArea({
    label,
    name,
    register,
    ...rest
}: TextAreaProps) {
    return (
        <div>
            {label ? (
                <label
                    htmlFor={name}
                    className="mb-1 block text-sm font-medium"
                >
                    {label}
                </label>
            ) : null}
            <textarea
                id={name}
                {...register}
                className="mt-1 w-full p-2 text-black rounded-md border-transparent shadow-sm focus:border-blue-500 focus:ring-blue-500 "
                rows={4}
                {...rest}
            />
        </div>
    );
}
