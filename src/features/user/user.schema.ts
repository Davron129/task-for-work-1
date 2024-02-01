import * as yup from 'yup';

export const UserSchema = yup.object().shape({
    name: yup.string().nullable().required(),
    username: yup.string().nullable().required(),
    phones: yup.array().of(yup.string().required()).min(1),
    birthDate: yup.string().required(),
    isForeigner: yup.boolean().default(false),
    country: yup
        .string()  
        .when("isForeigner", {
            is: true,
            then: (schema) => schema.required()
        }),
    language: yup
        .string()  
        .when("isForeigner", {
            is: true,
            then: (schema) => schema.required()
        }),
})