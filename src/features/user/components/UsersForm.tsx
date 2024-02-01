import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { FieldErrors, useFieldArray, useForm, useWatch } from "react-hook-form";
import { UserSchema } from "..";
import { IUser } from "../../../shared/models";
import { SelectCountryFieldController, SelectLanguageFieldController, TextFieldController } from "../../../shared/components/inputs";

interface Props {
    defaultValues: any,
    onSuccess: (values: IUser) => void
}

export const UsersForm: FC<Props> = ({
    defaultValues,
    onSuccess
}) => {
    const { control, handleSubmit, setValue } = useForm({
        resolver: yupResolver(UserSchema),
        shouldFocusError: true,
        mode: "onBlur",
        defaultValues
    });
    const { fields, append } = useFieldArray({
        name: "phones",
        control
    });

    const handleAppend = () => {
        append(" ")
    }

    const handleCheckIsForeigner = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue("isForeigner", e.target.checked);
    }

    const isForeigner = useWatch({
        control,
        name: "isForeigner"
    })

    const onValid = (values: IUser) => {
        if(onSuccess) {
            onSuccess(values)
        }
    }


    const onInvalid = (errors: FieldErrors<any>) => {
        console.log('onInvalid', errors);
    };

    const onSubmit = handleSubmit(onValid, onInvalid);

    return (
        <form onSubmit={onSubmit} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                    <TextFieldController 
                        control={control}
                        name="name" 
                        label={"Name"}    
                        placeholder="Name"
                    />
                </div>
                <div className="col-span-2">
                    <TextFieldController 
                        control={control}
                        name="username" 
                        label={"Username"}    
                        placeholder="Username"
                    />
                </div>
                <div className="col-span-2">
                    <TextFieldController 
                        type="date"
                        control={control}
                        name="birthDate" 
                        label={"Birth Date"}    
                        placeholder="Birth Date"
                    />
                </div>
                <div className="col-span-2">
                    <div className="flex">
                        <button
                            type="button"
                            className="text-white mb-2 inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={handleAppend}
                        >
                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            Phone Number
                        </button>                    
                    </div>
                    {
                        fields.map((field, idx) => (
                            <TextFieldController 
                                key={field.id}
                                control={control}
                                name={`phones.${idx}`}
                                label={`Phone ${idx + 1}`}
                            />
                        ))
                    }

                </div>
                <div className="col-span-2">
                    <div className="flex items-center mb-4">
                        <input
                            id="checkbox-1"
                            type="checkbox"
                            value="" 
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " 
                            onChange={handleCheckIsForeigner}
                        />
                        <label htmlFor="checkbox-1" className="ms-2 text-sm font-medium text-gray-900">Is Foreigner</label>
                    </div>
                </div>
                {
                    isForeigner && (
                        <>
                            <div className="col-span-2">
                                <SelectCountryFieldController 
                                    control={control}
                                    name="country"
                                    label="Country"
                                />
                            </div>
                            <div className="col-span-2">
                                <SelectLanguageFieldController 
                                    control={control}
                                    name="language"
                                    label="Language"
                                />
                            </div>
                        </>
                    )
                }

                <div className="col-span-2">
                    <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    )
}