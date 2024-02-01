import { FC, useId } from "react"
import { Control, Controller } from "react-hook-form";

interface TextFieldControllerProps {
    control: Control<any>
    name: string;
    disabled?: boolean;
    label: string;
    type?: string;
    labelClasses?: string;
    error?: boolean;
    helperText?: any;
}

export const TextFieldController: FC<TextFieldControllerProps> = ({ control, name, ...props }) => {
    const id = useId();
    
    return (
        <>
            <Controller
                render={({ field, fieldState: { error } }) => (
                    <>
                        {
                            props.label && <label htmlFor={id} className={props.labelClasses ?? "text-lg text-slate-500"}>{ props.label }</label>                
                        }
                        <input id={id} {...field} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
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