import { FC, useId } from "react"
import { Control, Controller } from "react-hook-form";

interface TextFieldControllerProps {
    control: Control<any>
    name: string;
    disabled?: boolean;
    label: string;
    placeholder?: string;
    type?: string;
    labelClasses?: string;
    error?: boolean;
    helperText?: any;
}

export const TextFieldController: FC<TextFieldControllerProps> = ({ control, name, type = 'text', ...props }) => {
    const id = useId();
    
    return (
        <>
            <Controller
                render={({ field, fieldState: { error } }) => (
                    <>
                        {
                            props.label && <label htmlFor={id} className={props.labelClasses ?? "block mb-2 text-sm font-medium text-gray-900"}>{ props.label }</label>                
                        }
                        <input
                            id={id}
                            {...field}
                            type={type}
                            placeholder={props.placeholder}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                        />
                        {
                            !!error && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{ error.message }</p>
                            )
                        }
                    </>
                )}
                name={name}
                control={control}
                defaultValue=""
            />

        </>
    )
}