import { FC } from 'react';
import { data } from '../../../shared/mock-data/country.json'
import { IOption } from '../../models';
import { SelectFieldController, SelectFieldControllerProps } from './base';

interface Props extends Omit<SelectFieldControllerProps, "options"> {}

export const SelectCountryFieldController: FC<Props> = (props) => {
    const options: IOption[] = data.map((country) => ({
        label: country,
        value: country
    }));

    return (
        <SelectFieldController {...props} options={options} />
    )
}