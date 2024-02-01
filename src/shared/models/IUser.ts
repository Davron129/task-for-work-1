export interface IUser {
    id?: string,
    name: string,
    username: string,
    phones: string[],
    birthDate: string,
    isForeigner: boolean,
    country: string | null,
    language: string | null
}