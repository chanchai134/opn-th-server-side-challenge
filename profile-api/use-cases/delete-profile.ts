import { database } from "../database"

export const deleteProfile = database.delete.bind(database)
