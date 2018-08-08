import MockRepository from "../mock/MockRepository"
import * as Areas from "./AdminAreas.js"

export const loadItens = (area) => {
    switch (area) {
        case Areas.SHOWS:
            return {
                shows: MockRepository().shows
            }
        case Areas.TRUPES:
            return {
                trupes: MockRepository().trupes
            }
        case Areas.USERS:
            return {
                users: MockRepository().users
            }    
        default:
            return {
                shows: MockRepository().shows
            }
    }
}
