import { FC, useId } from "react"
import { Control, Controller } from "react-hook-form";
import { IOption } from "../../models/IOption";

export interface SelectFieldControllerProps {
    control: Control<any>
    options: IOption[]
    name: string;
    disabled?: boolean;
    label: string;
    type?: string;
    labelClasses?: string;
    error?: boolean;
    helperText?: any;
}

export const SelectFieldController: FC<SelectFieldControllerProps> = ({ control, name, options, ...props }) => {
    const id = useId();
    
    return (
        <>
            <Controller
                render={({ field, fieldState: { error } }) => (
                    <>
                        {
                            props.label && <label htmlFor={id} className={props.labelClasses ?? "text-lg text-slate-500"}>{ props.label }</label>                
                        }
                        <select id={id} {...field} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
                            <option>Tanlang</option>

                            {
                                Array.isArray(options) && options.map((item) => (
                                    <option key={item.value} value={item.value}>{ item.label }</option>
                                ))
                            }
                        </select>
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