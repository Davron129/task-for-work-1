import { FC } from 'react';
import { langs } from '../../utils';
import { IOption } from '../../models';
import { SelectFieldController, SelectFieldControllerProps } from './base';

interface Props extends Omit<SelectFieldControllerProps, "options"> {}

export const SelectLanguageFieldController: FC<Props> = (props) => {
    const options: IOption[] = langs.map((language) => ({
        label: language,
        value: language
    }));

    return (
        <SelectFieldController {...props} options={options} />
    )
}