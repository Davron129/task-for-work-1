import { faker } from "@faker-js/faker"
import { IUser } from "../models"

const langs = [
    "English",
    "Russian",
    "Uzbek"
]

function getRandomInteger() {
    return Math.floor(Math.random() * 2); // Generates a random integer between 0 (inclusive) and 1 (inclusive)
}

export const createRandomUser = (): IUser => {
    const isForeigner = Math.random() < 0.5;

    return {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        phones: [String(faker.phone.number())],
        birthDate: faker.date.anytime().toISOString().split("T")[0],
        isForeigner: isForeigner,
        country: isForeigner ? faker.location.country() : null,
        language: isForeigner ? langs[getRandomInteger()] : null
    }
}