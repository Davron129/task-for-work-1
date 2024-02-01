import { FC, useId } from "react"
import { Control, Controller } from "react-hook-form";
import { IOption } from "../../../models/IOption";

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
                            props.label && <label htmlFor={id} className={props.labelClasses ?? "block mb-2 text-sm font-medium text-gray-900"}>{ props.label }</label>                
                        }
                        <select id={id} {...field} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
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