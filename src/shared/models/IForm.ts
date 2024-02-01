import { DefaultValues } from "react-hook-form";

export interface IForm<T> {
    defaultValues: DefaultValues<any>,
    isLoading: boolean,
    onValid: (values: T) => void
}